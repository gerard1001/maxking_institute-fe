import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const createCourse = createAppAsyncThunk(
  "course/createCourse",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.post(`/course/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllCourses = createAppAsyncThunk(
  "course/fetchCourses",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/course`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOneCourse = createAppAsyncThunk(
  "course/fetchCourse",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/course/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCoursesBySubjectId = createAppAsyncThunk(
  "course/fetchCoursesBySubjectId",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/course/subject/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCourse = createAppAsyncThunk(
  "course/updateCourse",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.patch(`/course/${id}`, data);
      console.log(res, "&&");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCourse = createAppAsyncThunk(
  "course/deleteCourse",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.delete(`/course/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
