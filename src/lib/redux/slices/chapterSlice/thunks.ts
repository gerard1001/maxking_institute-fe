import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const createChapter = createAppAsyncThunk(
  "chapter/createChapter",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.post(`/chapter/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllChapters = createAppAsyncThunk(
  "chapter/fetchChapters",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/chapter`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOneChapter = createAppAsyncThunk(
  "chapter/fetchChapter",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/chapter/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchChaptersBySubjectId = createAppAsyncThunk(
  "chapter/fetchChaptersBySubjectId",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/chapter/subject/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateChapter = createAppAsyncThunk(
  "chapter/updateChapter",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.patch(`/chapter/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteChapter = createAppAsyncThunk(
  "chapter/deleteChapter",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.delete(`/chapter/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
