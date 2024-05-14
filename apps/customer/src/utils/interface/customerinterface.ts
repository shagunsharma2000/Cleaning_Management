// export interface CustomerData {
//   id?: number;
//   name?: string;
//   phonenumber: string;
//   email: string;
//   password: string;
//   address: string;
//   location: string;
//   isDeleted?: boolean;
//   deletedBy?: string;
//   deletedAt?: Date;
// }
export interface CustomerData {
  id?: number;
  name?: string;
  phonenumber: string;
  email: string;
  password: string;
  address: string;
  latitude: number;
  longitude: number;
  isDeleted?: boolean;
  deletedBy?: string;
  deletedAt?: Date;
}
