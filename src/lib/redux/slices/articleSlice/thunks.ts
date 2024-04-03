import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const fetchArticles = createAppAsyncThunk(
  "article/fetchArticles",
  async (): Promise<any> => {
    try {
      const res = await axios.get("/article");
      return res.data.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
);

export const fetchFeaturedArticles = createAppAsyncThunk(
  "article/fetchFeaturedArticles",
  async (): Promise<any> => {
    try {
      const res = await axios.get("/article/featured");
      return res.data.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
);
