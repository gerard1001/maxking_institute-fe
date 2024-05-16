import { createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  deleteComment,
  editComment,
  fetchComments,
  fetchCommentsByArticleId,
  fetchSingleComment,
} from "./thunks";
import {
  IComment,
  CommentSliceState,
} from "@/lib/interfaces/comment.interface";

const initialState: CommentSliceState = {
  comments: [],
  articleComments: [],
  comment: {} as IComment,
  loading: false,
  error: {},
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(editComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchSingleComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action.payload.data;
      })
      .addCase(fetchSingleComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommentsByArticleId.fulfilled, (state, action) => {
        state.loading = false;
        state.articleComments = action.payload.data;
      })
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
