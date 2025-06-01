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