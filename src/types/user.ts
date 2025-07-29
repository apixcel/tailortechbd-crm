export interface IUser {
  _id: string;
  fullName: string;
  avatar?: string;
  email: string;
  password: string;
  phoneNumber: string;
  isVerified: boolean;
  isActive: boolean;
  token?: string;
  createdAt: string;
  updatedAt: string;
  geo_profile: {
    country: string;
    phone_code: string;
  };
  role: string;
}
