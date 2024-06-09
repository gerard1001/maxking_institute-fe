import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const createCollaborator = createAppAsyncThunk(
  "collaborator/createCollaborator",
  async (data: any, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.post(`/collaborator`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllCollaborators = createAppAsyncThunk(
  "collaborator/fetchCollaborators",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/collaborator`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAOneCollaborator = createAppAsyncThunk(
  "collaborator/fetchCollaborator",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/collaborator/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCollaborator = createAppAsyncThunk(
  "collaborator/updateCollaborator",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.patch(`/collaborator/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCollaborator = createAppAsyncThunk(
  "collaborator/deleteCollaborator",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.delete(`/collaborator/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
