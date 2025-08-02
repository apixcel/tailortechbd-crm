export interface ISupplier {
  _id: string;
  name: string;
  address: string;
  phoneNumber: string;
  invoiceNumber?: string;
  email: string;
  logoUrl: string;
  createdAt?: string;
  updatedAt?: string;
}
