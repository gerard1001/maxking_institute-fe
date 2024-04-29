export interface ICourse {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  previewVideo: string;
  previewText: string;
  subjectId: string;
  estimatedDuration: string;
  tutor: string;
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
