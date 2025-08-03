export interface ICapital {
  _id: string;
  date: string;
  type: "credit" | "debit";
  description: string;
  amount: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}
