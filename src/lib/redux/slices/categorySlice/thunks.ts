import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const createCategory = createAppAsyncThunk(
  "category/createCategory",
  async (data: any, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.post(`/category`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllCategories = createAppAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/category`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAOneCategory = createAppAsyncThunk(
  "category/fetchCategory",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/category/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAppAsyncThunk(
  "category/updateCategory",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.patch(`/category/${id}`, data);
      console.log(res, "&&");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAppAsyncThunk(
  "category/deleteCategory",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.delete(`/category/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
