export interface IPurchaseItem {
  product: string;
  quantity: number;
  price: number;
  total: number;
}

export interface IPurchase {
  _id: string;
  name: string;
  purchaseFrom: {
    companyName: string;
    companyAddress: string;
    contact: string;
    companyInvoiceNo: string;
    email: string;
  };
  purchaseItems: IPurchaseItem[];
  totalAmount: number;
  createdAt?: string;
}
