import { createSlice } from "@reduxjs/toolkit";
import { fetchArticles, fetchFeaturedArticles } from "./thunks";
import { ArticleSliceState } from "@/lib/interfaces/article.interface";

const initialState: ArticleSliceState = {
  articles: [],
  featuredArticles: [],
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

    builder
      .addCase(fetchFeaturedArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredArticles = action.payload;
      })
      .addCase(fetchFeaturedArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
