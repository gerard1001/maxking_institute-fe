import { IModule } from "./module.interface";

export interface IChapter {
  id: string;
  chapterNumber: number;
  title: string;
  description: string;
  content: string;
  module: IModule;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChapterSliceState {
  allChapters: IChapter[];
  chapter: IChapter;
  loading: boolean;
  error: any;
}
