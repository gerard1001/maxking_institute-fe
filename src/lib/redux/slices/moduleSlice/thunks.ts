import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const createModule = createAppAsyncThunk(
  "module/createModule",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.post(`/module/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllModules = createAppAsyncThunk(
  "module/fetchModules",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/module`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOneModule = createAppAsyncThunk(
  "module/fetchModule",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/module/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchModulesBySubjectId = createAppAsyncThunk(
  "module/fetchModulesBySubjectId",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/module/subject/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateModule = createAppAsyncThunk(
  "module/updateModule",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.patch(`/module/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteModule = createAppAsyncThunk(
  "module/deleteModule",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.delete(`/module/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
