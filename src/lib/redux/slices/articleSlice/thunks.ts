import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const createArticle = createAppAsyncThunk(
  "article/createArticle",
  async (data: any, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.post(`/article`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editArticle = createAppAsyncThunk(
  "article/editArticle",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.patch(`/article/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchArticles = createAppAsyncThunk(
  "article/fetchArticles",
  async (): Promise<any> => {
    try {
      const res = await axios.get("/article");
      return res.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const fetchFeaturedArticles = createAppAsyncThunk(
  "article/fetchFeaturedArticles",
  async (): Promise<any> => {
    try {
      const res = await axios.get("/article/featured");
      return res.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const fetchSingleArticle = createAppAsyncThunk(
  "article/fetchSingleArticle",
  async (articleId: string): Promise<any> => {
    try {
      const res = await axios.get(`/article/${articleId}`);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const fetchRelatedArticles = createAppAsyncThunk(
  "article/fetchRelatedArticles",
  async (articleId: string): Promise<any> => {
    try {
      const res = await axios.get(`/article/${articleId}/related`);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
