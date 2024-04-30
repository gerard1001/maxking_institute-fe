import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const createSubject = createAppAsyncThunk(
  "subject/createSubject",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.post(`/subject/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllSubjects = createAppAsyncThunk(
  "subject/fetchSubjects",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/subject`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOneSubject = createAppAsyncThunk(
  "subject/fetchSubject",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/subject/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSubjectsByCategoryId = createAppAsyncThunk(
  "subject/fetchSubjectsByCategoryId",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/subject/category/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSubject = createAppAsyncThunk(
  "subject/updateSubject",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.patch(`/subject/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSubject = createAppAsyncThunk(
  "subject/deleteSubject",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.delete(`/subject/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
