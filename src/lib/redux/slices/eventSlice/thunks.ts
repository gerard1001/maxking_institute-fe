import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const createEvent = createAppAsyncThunk(
  "event/createEvent",
  async (data: any, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.post(`/event`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchEvents = createAppAsyncThunk(
  "event/fetchEvents",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get("/event");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleEvent = createAppAsyncThunk(
  "event/fetchSingleEvent",
  async (eventId: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/event/${eventId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEvent = createAppAsyncThunk(
  "event/deleteEvent",
  async (eventId: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.delete(`/event/${eventId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
