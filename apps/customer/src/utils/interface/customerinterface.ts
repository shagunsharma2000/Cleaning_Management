export interface CustomerData {
    id?: number;
    name?: string;
    phonenumber: string;
    email: string;
    password: string;
    address: string;
    isDeleted?: boolean;
    deletedBy?: string;
    deletedAt?: Date
}
