import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const createService = createAppAsyncThunk(
  "service/createService",
  async (data: any, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.post(`/service`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editService = createAppAsyncThunk(
  "service/editService",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.patch(`/service/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchServices = createAppAsyncThunk(
  "service/fetchServices",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get("/service");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleService = createAppAsyncThunk(
  "service/fetchSingleService",
  async (serviceId: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/service/${serviceId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteService = createAppAsyncThunk(
  "service/deleteService",
  async (serviceId: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.delete(`/service/${serviceId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
