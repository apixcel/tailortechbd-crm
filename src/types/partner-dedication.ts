export interface IPartnerDedication {
  _id: string;
  partnerName: string;
  workType: string;
  time: number;
  date: string;
  comment: string;
  attachment: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreatePartnerDedicationPayload = Omit<
  IPartnerDedication,
  "_id" | "createdAt" | "updatedAt"
>;
