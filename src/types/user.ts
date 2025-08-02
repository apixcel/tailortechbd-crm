export interface IRoleAction {
  _id: string;
  label: string;
  value: string;
}

export interface IRole {
  _id: string;
  name: string;
  actions: string[] | IRoleAction[];
}
export interface IUser {
  _id: string;
  fullName: string;
  avatar?: string;
  email: string;
  password: string;
  phoneNumber: string;
  isActive: boolean;
  role: IRole;
  token?: string;
  createdAt: string;
  updatedAt: string;
}
