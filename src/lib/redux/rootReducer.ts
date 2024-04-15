import { articleSlice, counterSlice, roleSlice, userSlice } from "./slices";

export const reducer = {
  counter: counterSlice.reducer,
  article: articleSlice.reducer,
  user: userSlice.reducer,
  role: roleSlice.reducer,
};
