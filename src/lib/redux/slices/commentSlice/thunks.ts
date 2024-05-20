import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const createComment = createAppAsyncThunk(
  "comment/createComment",
  async (
    { articleId, data }: { articleId: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.post(`/comment/${articleId}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editComment = createAppAsyncThunk(
  "comment/editComment",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.patch(`/comment/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const saveUserComment = createAppAsyncThunk(
//   "comment/saveUserComment",
//   async (id: string, { rejectWithValue }): Promise<any> => {
//     try {
//       const res = await axios.get(`/user-comment/${id}`);
//       return res.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const fetchUserSavedComments = createAppAsyncThunk(
//   "comment/fetchUserSavedComments",
//   async (_, { rejectWithValue }): Promise<any> => {
//     try {
//       const res = await axios.get(`/comment/saved`);
//       return res.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const fetchComments = createAppAsyncThunk(
  "comment/fetchComments",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get("/comment");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCommentsByArticleId = createAppAsyncThunk(
  "comment/fetchCommentsByArticleId",
  async (articleId: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/comment/article/${articleId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleComment = createAppAsyncThunk(
  "comment/fetchSingleComment",
  async (commentId: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/comment/${commentId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAppAsyncThunk(
  "comment/deleteComment",
  async (commentId: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.delete(`/comment/${commentId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
