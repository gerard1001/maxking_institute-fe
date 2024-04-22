import { articleSlice, counterSlice, roleSlice, userSlice } from "./slices";
import { tagSlice } from "./slices/tagSlice";

export const reducer = {
  counter: counterSlice.reducer,
  article: articleSlice.reducer,
  user: userSlice.reducer,
  role: roleSlice.reducer,
  tag: tagSlice.reducer,
};
