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
  isDeleted?: boolean;
  deletedBy?: string;
  deletedAt?: Date;
}

//Interface for location
export interface ILocationData {
  id?: number;
  serviceproviderId: string;
  start: string;
  end: string;
  distance :number;
  isDeleted?: boolean;
  deletedBy?: string;
  deletedAt?: Date;
}
