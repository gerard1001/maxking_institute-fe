import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const addQuestion = createAppAsyncThunk(
  "question/addQuestion",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.post(`/question/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllQuestions = createAppAsyncThunk(
  "question/fetchQuestions",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/question`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOneQuestion = createAppAsyncThunk(
  "question/fetchQuestion",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/question/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const findByModuleOrCourseId = createAppAsyncThunk(
  "question/findByModuleOrCourseId",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/question/course/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateQuestion = createAppAsyncThunk(
  "question/updateQuestion",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.patch(`/question/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteQuestion = createAppAsyncThunk(
  "question/deleteQuestion",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.delete(`/question/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
