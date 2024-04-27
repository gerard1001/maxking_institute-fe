import {
  articleSlice,
  counterSlice,
  roleSlice,
  userSlice,
  tagSlice,
  categorySlice,
  subjectSlice,
} from "./slices";

export const reducer = {
  counter: counterSlice.reducer,
  article: articleSlice.reducer,
  user: userSlice.reducer,
  role: roleSlice.reducer,
  tag: tagSlice.reducer,
  category: categorySlice.reducer,
  subject: subjectSlice.reducer,
};
