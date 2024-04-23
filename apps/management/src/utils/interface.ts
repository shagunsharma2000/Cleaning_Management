import Role from "./enums/indexEnums";

export interface AdminData {
    id?: number;
    name?: string;
    phonenumber: string;
    email: string;
    password: string;
    Role?: Role.Admin;
  }
  