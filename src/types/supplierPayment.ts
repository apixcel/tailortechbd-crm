import { ISupplier } from "./supplier";

export interface ISupplierPayment {
  _id: string;
  date: string;
  supplier: string | ISupplier; // reference to Supplier
  invoiceNo: string;
  invoiceBillAmount: number;
  advancedAmount: number;
  paymentMethod: string;
  paymentAttachment?: string;
  moneyReceipt?: string;
  duesAmount: number;
  createdAt: string;
  updatedAt: string;
}
