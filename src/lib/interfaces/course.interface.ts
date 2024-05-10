import { IModule } from "./module.interface";
import { IQuestion } from "./question.interface";
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
  subjectId: string;
  estimatedDuration: string;
  users: User[];
  modules: IModule[];
  questions: IQuestion[];
  tags: ITag[];
  user_course: IUserCourse;
  createdAt: Date;
  updatedAt: Date;
}

// export interface ICreateCourse {
//   name: string;
//   image: string;
// }

export interface CourseSliceState {
  allCourses: ICourse[];
  course: ICourse;
  loading: boolean;
  error: any;
}
