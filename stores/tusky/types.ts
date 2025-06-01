export interface VaultResponse {
    createdAt: string;
    description: string | null;
    encrypted: boolean;
    id: string;
    name: string;
    owner: string;
    size: number;
    status: string;
    tags: string[] | null;
    trash: undefined;
    updatedAt: string;
    __keys__: undefined;
}

export interface FileResponse {
    blobId: string;
    blobObjectId: string | null;
    certifiedEpoch: string | null;
    chunkSize: number;
    createdAt: string;
    encodedAt: string;
    encryptedAesKey: string | null;
    endEpoch: string | null;
    erasureCodeType: string | null;
    expiresAt: string | null;
    id: string;
    mimeType: string;
    name: string;
    network: string | null;
    numberOfChunks: number;
    owner: string;
    parentId: string;
    partition: string | null;
    ref: string | null;
    size: number;
    status: string;
    storedAt: string | null;
    storedEpoch: string | null;
    updatedAt: string;
    uploadId: string;
    vaultId: string;
    __encrypted__: boolean;
}
