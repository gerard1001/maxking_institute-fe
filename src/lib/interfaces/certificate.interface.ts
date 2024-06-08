import { ICourse } from "./course.interface";
import { User } from "./user.interface";

export interface ICertificate {
  id: string;
  courseId: string;
  issuers: string;
  course?: ICourse;
  user_certificate: IUserCertificate;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCertificate {
  id: string;
  userId: string;
  certificateId: string;
  userCertificateId: string;
  user?: User;
  certificate?: ICertificate;
  createdAt: Date;
  updatedAt: Date;
}

export interface CertificateSliceState {
  allCertificates: ICertificate[];
  certificate: ICertificate;
  userCertificate: IUserCertificate;
  loading: boolean;
  error: any;
}
