import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const createTestimonial = createAppAsyncThunk(
  "testimonial/createTestimonial",
  async (data: any, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.post(`/testimonial`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTestimonials = createAppAsyncThunk(
  "testimonial/fetchTestimonials",
  async (): Promise<any> => {
    try {
      const res = await axios.get("/testimonial");
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const fetchSingleTestimonial = createAppAsyncThunk(
  "testimonial/fetchSingleTestimonial",
  async (testimonialId: string): Promise<any> => {
    try {
      const res = await axios.get(`/testimonial/${testimonialId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const togglePinTestimonial = createAppAsyncThunk(
  "testimonial/togglePinTestimonial",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/testimonial/toggle-pin/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editTestimonial = createAppAsyncThunk(
  "testimonial/editTestimonial",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.patch(`/testimonial/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTestimonial = createAppAsyncThunk(
  "testimonial/deleteTestimonial",
  async (testimonialId: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.delete(`/testimonial/${testimonialId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
