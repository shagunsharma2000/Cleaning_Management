export interface IEquipements {
  id?: string;
  toolName: string;
  description: string;
  slug: string;
  isDeleted?: boolean;
  deletedBy?: string;
  deletedAt?: Date;
}
