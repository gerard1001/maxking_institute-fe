export interface IUserCourse {
  id: string;
  userId: string;
  courseId: string;
  userType: string;
  currentModule: number;
  rank?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModule {
  id: string;
  userId: string;
  moduleId: string;
  currentChapter: number;
  rank?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
