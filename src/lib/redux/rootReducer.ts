import {
  articleSlice,
  counterSlice,
  roleSlice,
  userSlice,
  tagSlice,
  categorySlice,
  subjectSlice,
  courseSlice,
  moduleSlice,
  chapterSlice,
  questionSlice,
  commentSlice,
} from "./slices";
import { testimonialSlice } from "./slices/testimonialSlice";

export const reducer = {
  counter: counterSlice.reducer,
  article: articleSlice.reducer,
  user: userSlice.reducer,
  role: roleSlice.reducer,
  tag: tagSlice.reducer,
  category: categorySlice.reducer,
  subject: subjectSlice.reducer,
  course: courseSlice.reducer,
  module: moduleSlice.reducer,
  chapter: chapterSlice.reducer,
  question: questionSlice.reducer,
  comment: commentSlice.reducer,
  tesimonial: testimonialSlice.reducer,
};
