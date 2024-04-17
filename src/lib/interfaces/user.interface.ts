export interface IUserSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  isVerified: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: Profile;
  roles: Role[];
  isVerified: boolean;
  publicDisplay: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: string;
  userId: string;
  phoneNumber: string;
  gender: string;
  birthDate: string;
  picture: string;
  country: string;
  city: string;
  address1: string;
  address2: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSliceState {
  allUsers: User[];
  user: User;
  loggedInUser: User;
  loading: boolean;
  error: any;
}

export interface RoleSliceState {
  roles: Role[];
  role: Role;
  loading: boolean;
  error: any;
}
