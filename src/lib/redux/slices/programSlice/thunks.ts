import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const createProgram = createAppAsyncThunk(
  "program/createProgram",
  async (data: any, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.post(`/program`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editProgram = createAppAsyncThunk(
  "program/editProgram",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.patch(`/program/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPrograms = createAppAsyncThunk(
  "program/fetchPrograms",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get("/program");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleProgram = createAppAsyncThunk(
  "program/fetchSingleProgram",
  async (programId: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/program/${programId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProgramByShort = createAppAsyncThunk(
  "program/fetchProgramByShort",
  async (short: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/program/short/${short}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProgram = createAppAsyncThunk(
  "program/deleteProgram",
  async (programId: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.delete(`/program/${programId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
