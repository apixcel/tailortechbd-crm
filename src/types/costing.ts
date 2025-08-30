export interface ICosting {
  _id: string;
  costingAmount: number;
  costingDate: string;
  preparedByName: string;
  preparedByDesignation: string;
  costingCategory: string;
  costingRemark: string;
  note: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICostingReport {
  totalCostingQuantity: number;
  totalCostingAmount: number;
  chartData: {
    totalCosting: number;
    totalCostingAmount: number;
    time: string;
  }[];
}
