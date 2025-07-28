export interface ICosting {
  _id: string;
  partnerName: string;
  costingAmount: number;
  costingDate: string;
  costingType: string;
  note: string;
  fileUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
