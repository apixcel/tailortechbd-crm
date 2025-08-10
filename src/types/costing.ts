import { IPartner } from "./partner";

export interface ICosting {
  _id: string;
  costingAmount: number;
  costingDate: string;
  costingType: "";
  fileUrl?: string;
  note: string;
  partner: string | IPartner;
  createdAt?: string;
  updatedAt?: string;
}
