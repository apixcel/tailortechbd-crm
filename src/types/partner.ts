export interface IPartner {
  _id: string;
  partnerName: string;
  nomineeCount?: number;
  partnerDesignation: string;
  joiningDate: string;
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
