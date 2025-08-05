import { ICategory } from "./category";
import { ISupplier } from "./supplier";

export interface ISize {
  size: string;
  quantity: number;
  _id?: string;
}

export interface IColor {
  color: string;
  sizes: ISize[];
  _id?: string;
}

export interface IProduct {
  productName: string;
  price: number;
  category: string | ICategory;
  colors: IColor[];
  images: string[];
}

export interface IPurchase {
  _id: string;
  purchaseTitle: string;
  supplier: ISupplier;
  invoiceNumber: string;
  products: IProduct[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IPurchaseStatisticsChartItem {
  time: string;
  "Total Purchase": number;
  "Purchase Amount": number;
}

export interface IPurchaseStatistics {
  totalPurchaseQuantity: number;
  totalPurchaseAmount: number;
  chartData: IPurchaseStatisticsChartItem[];
}

export interface IPurchaseStatisticsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IPurchaseStatistics;
}
