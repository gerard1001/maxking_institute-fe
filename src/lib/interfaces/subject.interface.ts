export interface ISubject {
  id: string;
  name: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateSubject {
  name: string;
  categoryId: string;
}

export interface SubjectSliceState {
  allCSubjects: ISubject[];
  subject: ISubject;
  loading: boolean;
  error: any;
}
