import { Ticket } from "@/types";
import { Upload } from "tus-js-client";

const TUS_API_URL =  process.env.NEXT_PUBLIC_TUSKY_API_URL || "https://api.tusky.io";
const TUS_API_KEY = process.env.NEXT_PUBLIC_TUSKY_API_KEY;  
const DEFAULT_VAULT = process.env.NEXT_PUBLIC_TUSKY_DEFAULT_VAULT;
const DEFAULT_PARENT_ID = process.env.NEXT_PUBLIC_TUSKY_DEFAULT_PARENT_ID;
const DEFAULT_FOLDER_ID = process.env.NEXT_PUBLIC_TUSKY_DEFAULT_FOLDER_ID;

// Upload file to folder
export async function uploadTickets(
  jsonObject: JSON,
  folderName: string,
  onLoad: (percentage: number) => void,
  onSuccess: (upload: Upload) => void,
  onError: () => void
) {
  console.log("~Uploading file... iner ", jsonObject);
  if (!TUS_API_URL || !TUS_API_KEY || !DEFAULT_VAULT) {
    console.log("tuskyURL or tuskyAPIKey is not set");
    throw new Error("tuskyURL or tuskyAPIKey is not set");
  }
  
  const jsonBlob = new Blob([JSON.stringify(jsonObject)], {
    type: "application/json",
  });

  console.log("Uploading file...");
  const upload = new Upload(jsonBlob, {
    endpoint: `${TUS_API_URL}/uploads`,
    retryDelays: [0, 3000, 5000, 10000, 20000],
    headers: {
      "Api-Key": TUS_API_KEY,
    },
    metadata: {
      filename: `${folderName}.json`,
      filetype: "application/json",
      vaultId: DEFAULT_VAULT, // ID of the vault where the file will be stored
      parentId: DEFAULT_FOLDER_ID || "", // ID of the folder where the file will be stored
    },
    uploadSize: jsonBlob.size,
    onError: (error) => {
      onError();
      console.error("Upload failed:", error.message);
    },
    onProgress: (bytesUploaded, bytesTotal) => {
      const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
      onLoad(Number(percentage));
      console.log(`Upload progress: ${percentage}%`);
    },
    onSuccess: () => {
      onSuccess(upload);
    },
  });

  await upload.start();
}

// get all files
export async function getFiles() {
  if (!TUS_API_KEY) {
    throw new Error("TUSKY_API_KEY is not set");
  }

  const response = await fetch(`${TUS_API_URL}/files?parentId=${DEFAULT_FOLDER_ID}`, {
    headers: {
      "Api-Key": TUS_API_KEY,
    },
  })
  const data = await response.json()
  return data
}

export const TuskyApi = {
  uploadTickets,
  getFiles,
};