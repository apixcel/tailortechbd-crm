export interface IDeposit {
  _id: string;
  partnerName: string;
  depositAmount: number;
  source: string;
  depositDate: string;
  type: string;
  note: string;
  attachment: string;
  createdAt?: string;
  updatedAt?: string;
}
