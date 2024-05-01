import { ICourse } from "./course.interface";
import { ITag } from "./tag.interface";
import { User } from "./user.interface";

export interface IModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  content: string;
  course: ICourse;
  createdAt: Date;
  updatedAt: Date;
}

export interface ModuleSliceState {
  allModules: IModule[];
  module: IModule;
  loading: boolean;
  error: any;
}
