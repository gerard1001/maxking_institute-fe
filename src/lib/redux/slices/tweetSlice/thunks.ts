import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const createTweet = createAppAsyncThunk(
  "tweet/createTweet",
  async (data: any, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.post(`/tweet`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTweets = createAppAsyncThunk(
  "tweet/fetchTweets",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get("/tweet");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleTweet = createAppAsyncThunk(
  "tweet/fetchSingleTweet",
  async (tweetId: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/tweet/${tweetId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const findPinnedTweet = createAppAsyncThunk(
  "tweet/findPinnedTweet",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/tweet/pinned`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const togglePinTweet = createAppAsyncThunk(
  "tweet/togglePinTweet",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/tweet/toggle-pin/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTweet = createAppAsyncThunk(
  "tweet/deleteTweet",
  async (tweetId: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.delete(`/tweet/${tweetId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
