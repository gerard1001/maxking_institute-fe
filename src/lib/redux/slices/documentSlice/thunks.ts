import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const createDocument = createAppAsyncThunk(
  "document/createDocument",
  async (data: any, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.post(`/document`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDocuments = createAppAsyncThunk(
  "document/fetchDocuments",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get("/document");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleDocument = createAppAsyncThunk(
  "document/fetchSingleDocument",
  async (documentId: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/document/${documentId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDocument = createAppAsyncThunk(
  "document/deleteDocument",
  async (documentId: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.delete(`/document/${documentId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
