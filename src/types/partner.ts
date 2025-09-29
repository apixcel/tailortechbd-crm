export interface IPartner {
  _id: string;
  partnerId: string;
  partnerName: string;
  nomineeCount?: number;
  partnerDesignation: string;
  sharePercentage: number;
  phoneNumber: string;
  email: string;
  address: string;
  bankDetails: string;
  activeStatus: boolean;
  remarks: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPartnerNominee {
  _id: string;
  nomineeId: string;
  partner: string | IPartner;
  fullName: string;
  relationWithPartner: string;
  phoneNumber: string;
  email: string;
  address: string;
  sharePercentage: number;
  attachment: string;
  createdAt: Date;
  updatedAt: Date;
}
