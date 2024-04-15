import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const fetchRoles = createAppAsyncThunk(
  "role/fetchRoles",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/role`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
