import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { ICreateTag } from "@/lib/interfaces/tag.interface";

export const createTag = createAppAsyncThunk(
  "tag/createTag",
  async (data: ICreateTag, { rejectWithValue }): Promise<any> => {
    try {
      const { name } = data;
      const res = await axios.post(`/tag`, {
        name,
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllTags = createAppAsyncThunk(
  "tag/fetchTags",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/tag`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
