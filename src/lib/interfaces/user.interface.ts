import { ICourse } from "./course.interface";
import { IModule } from "./module.interface";
import { IUserCourse } from "./user_course.interface";

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
  courses?: ICourse[];
  modules?: IModule[];
  isVerified: boolean;
  publicDisplay: boolean;
  user_course: IUserCourse;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: string;
  userId: string;
  phoneNumber: string;
  gender: string;
  specialty: string;
  birthDate: string;
  picture: string;
  country: string;
  city: string;
  addressLine: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: string;
  type: ENUM_ROLE_TYPE;
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

export enum ENUM_ROLE_TYPE {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  MENTOR = "MENTOR",
  CLIENT = "CLIENT",
}
