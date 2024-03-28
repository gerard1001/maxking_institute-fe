/* Instruments */
import { articleSlice, counterSlice } from "./slices";

export const reducer = {
  counter: counterSlice.reducer,
  article: articleSlice.reducer,
};
