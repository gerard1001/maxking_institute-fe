import { createSlice } from "@reduxjs/toolkit";
import { Article, ArticleSliceState } from "@/lib/interfaces/article.interface";
import { registerUser } from "./thunks";

const initialState = {
  allUsers: [],
  user: {},
  loggedInUser: {},
  loading: false,
  error: {},
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
