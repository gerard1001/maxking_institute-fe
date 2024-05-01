import { IModule } from "./module.interface";
import { ITag } from "./tag.interface";
import { User } from "./user.interface";

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
  tags: ITag[];
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
