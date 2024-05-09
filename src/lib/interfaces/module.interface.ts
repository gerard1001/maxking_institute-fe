import { IChapter } from "./chapter.interface";
import { ICourse } from "./course.interface";
import { IUserModule } from "./user_course.interface";

export interface IModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  courseId: string;
  course?: ICourse;
  chapters: IChapter[];
  user_module: IUserModule;
  createdAt: Date;
  updatedAt: Date;
}

export interface ModuleSliceState {
  allModules: IModule[];
  module: IModule;
  loading: boolean;
  error: any;
}
