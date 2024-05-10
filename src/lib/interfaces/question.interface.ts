import { ICourse } from "./course.interface";

export interface IQuestion {
  id: string;
  question: string;
  trueAnswer: string;
  choices: string;
  courseId: string;
  course?: ICourse;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionSliceState {
  allQuestions: IQuestion[];
  question: IQuestion;
  loading: boolean;
  error: any;
}

export interface Choice {
  choice: string;
  index: number;
}
