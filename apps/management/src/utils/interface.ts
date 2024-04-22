import Role from "./enums/indexEnums";


export interface AdminAttributes {
    id?: number;
    firstname: string;
    lastname: string;
    phonenumber: number;
    username: string;
    email: string;
    password: string;
    Role: Role.Admin;
}

