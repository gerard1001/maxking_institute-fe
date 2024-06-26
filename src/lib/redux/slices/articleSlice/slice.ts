import { createSlice } from "@reduxjs/toolkit";
import {
  createArticle,
  deleteArticle,
  editArticle,
  featureArticle,
  fetchArticles,
  fetchFeaturedArticles,
  fetchRelatedArticles,
  fetchSingleArticle,
  fetchUserSavedArticles,
  findByRelatedCourse,
  likePost,
  saveUserArticle,
} from "./thunks";
import { Article, ArticleSliceState } from "@/lib/interfaces/article.interface";

const initialState: ArticleSliceState = {
  articles: [],
  featuredArticles: [],
  relatedArticles: [],
  savedArticles: [],
  singleArticle: {} as Article,
  loading: false,
  error: {},
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.singleArticle = action.payload;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(editArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(saveUserArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveUserArticle.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(saveUserArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(featureArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(featureArticle.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(featureArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.data;
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
        state.featuredArticles = action.payload.data;
      })
      .addCase(fetchFeaturedArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchUserSavedArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserSavedArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.savedArticles = action.payload.data;
      })
      .addCase(fetchUserSavedArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchSingleArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.singleArticle = action.payload.data;
      })
      .addCase(fetchSingleArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchRelatedArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRelatedArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedArticles = action.payload;
      })
      .addCase(fetchRelatedArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(findByRelatedCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(findByRelatedCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedArticles = action.payload;
      })
      .addCase(findByRelatedCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(likePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
