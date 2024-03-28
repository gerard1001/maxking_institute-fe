import { createSlice } from "@reduxjs/toolkit";
import { fetchArticles } from "./thunks";
import { ArticleSliceState } from "@/lib/interfaces/article.interface";

const initialState: ArticleSliceState = {
  articles: [],
  loading: false,
  error: {},
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
