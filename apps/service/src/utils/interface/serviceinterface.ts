export interface serviceData {
  id?: number;
  // customerid?:number;
  // serviceid?:number;
  name?: string;
  description?: string;
  price?: number;
  status?: string;
  address: string;
  dateTime?: Date;
  duration?: string;
  isDeleted?: boolean;
  deletedBy?: string;
  deletedAt?: Date;
}
