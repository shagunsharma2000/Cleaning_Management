import role from "../enums/indexEnums";

export interface UserData {
    id?: number;
    name?: string;
    phonenumber: string;
    available : boolean;
    email: string;
    password: string;
    address: string;
    role?: role;
    isDeleted?: boolean;
    deletedBy?: string;
    deletedAt?: Date
}
