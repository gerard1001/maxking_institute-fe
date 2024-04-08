import { articleSlice, counterSlice, userSlice } from "./slices";

export const reducer = {
  counter: counterSlice.reducer,
  article: articleSlice.reducer,
  user: userSlice.reducer,
};
