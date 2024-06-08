import { ICertificate } from "./certificate.interface";
import { IModule } from "./module.interface";
import { IQuestion } from "./question.interface";
import { ISubject } from "./subject.interface";
import { ITag } from "./tag.interface";
import { User } from "./user.interface";
import { IUserCourse } from "./user_course.interface";

export interface ICourse {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  previewVideo: string;
  previewText: string;
  price: number;
  subjectId: string;
  estimatedDuration: string;
  isPublished: boolean;
  isFree: boolean;
  discount: number;
  currency: number;
  users: User[];
  modules: IModule[];
  questions: IQuestion[];
  subject: ISubject;
  certificate: ICertificate;
  tags: ITag[];
  user_course: IUserCourse;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseSliceState {
  allCourses: ICourse[];
  course: ICourse;
  loading: boolean;
  error: any;
}
