// interfaces/UserData.ts
import Role from "../enums/indexEnums";

export interface UserData {
    id?: number;
    name?: string;
    phonenumber: string;
    email: string;
    password: string;
    address: string;
    role?: Role;
}
