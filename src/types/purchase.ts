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
  category?: string | ICategory;
  colors?: IColor[];
  images: string[];
  quantity?: number;
  brand?: string;
  model?: string;
  sn?: string;
}

export interface IPurchase {
  _id: string;
  purchaseTitle: string;
  purchaseType: string;
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

export type SupplierRef = string | Pick<ISupplier, "name" | "address" | "phoneNumber" | "email">;

export interface ProductWrite {
  productName: string;
  price: number;
  category?: string;
  images?: string[];
  quantity?: number;
  brand?: string;
  model?: string;
  sn?: string;
  colors?: {
    color: string;
    sizes: { size: string; quantity: number }[];
  }[];
}

export interface IPurchaseWrite {
  purchaseTitle: string;
  purchaseType: string;
  supplier: SupplierRef;
  products: ProductWrite[];
}

export interface IPurchase {
  _id: string;
  purchaseTitle: string;
  purchaseType: string;
  invoiceNumber: string;
  supplier: ISupplier;
  productName: string;
  brand: string;
  model: string;
  sn: string;
  quantity: number;
  price: number;
  createdAt?: string;
  updatedAt?: string;
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
