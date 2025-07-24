export interface ICosting {
    _id: string;
    partnerName: string;
    amount: number;
    costingDate: string;
    costingCategory: string;
    note: string;
    attachment?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export type CreateCostingPayload = Omit<ICosting, "_id" | "createdAt" | "updatedAt">;
  