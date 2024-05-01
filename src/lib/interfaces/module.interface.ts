import { IChapter } from "./chapter.interface";
import { ICourse } from "./course.interface";

export interface IModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  course: ICourse;
  chapters: IChapter[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ModuleSliceState {
  allModules: IModule[];
  module: IModule;
  loading: boolean;
  error: any;
}
