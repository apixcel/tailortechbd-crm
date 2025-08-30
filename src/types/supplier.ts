export interface ISupplier {
  _id: string;
  name: string;
  supplierId: string;
  phoneNumber: string;
  email: string;
  contactPerson?: string;
  suppliedProductsCategories: string[];
  address: string;
  preferredPaymentMethod: string;
  notes?: string;
  docuemnt?: string; // url
  createdAt: string;
  updatedAt: string;
}
