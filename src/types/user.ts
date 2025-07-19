export type TRoles = "user" | "admin";
export type TGender = "male" | "female";
export interface IUser {
  _id: string;
  fullName: string;
  avatar?: string;
  email: string;
  password: string;
  phoneNumber: string;
  isVerified: boolean;
  isActive: boolean;
  gender?: TGender;
  token?: string;
  createdAt: string;
  updatedAt: string;
  geo_profile: {
    country: string;
    phone_code: string;
  };
  role: TRoles;
}
