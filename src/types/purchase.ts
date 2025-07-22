export interface ISizeEntry {
  size: string;
  quantity: number;
}

export interface IColorVariant {
  color: string;
  sizes: ISizeEntry[];
}

export interface IPurchaseItem {
  name: string;
  price: number;
  category: string;
  images: string[];
  colors: IColorVariant[];
}

export interface ISupplier {
  _id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  logo: string;
}

export interface IPurchase {
  _id: string;
  purchaseTitle: string;
  supplier: ISupplier & { invoiceNumber: string };
  purchasedProducts: IPurchaseItem[];
  createdAt?: string;
}

export type CreatePurchasePayload = Omit<IPurchase, "_id" | "createdAt">;

export type CreateSupplierPayload = Omit<ISupplier, "_id">;
