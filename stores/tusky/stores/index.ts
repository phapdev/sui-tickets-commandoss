// zustend store to store the files

import { create } from "zustand";
import { FileResponse } from "../types";

export const useTuskyStore = create<TuskyStore>((set) => ({
  files: [],
  setFiles: (files) => set({ files }),

  contentFile: [],
  setContentFile: (contentFile) => set({ contentFile }),
}));

interface TuskyStore {
  files: FileResponse[];
  setFiles: (files: FileResponse[]) => void;
}