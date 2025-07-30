export interface IInvestment {
  _id: string;
  partnerName: string;
  investmentAmount: number;
  investmentDate: string;
  type: string;
  note: string;
  attachment: string;
  createdAt?: string;
  updatedAt?: string;
}
