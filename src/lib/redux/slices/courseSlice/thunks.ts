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

/* USER COURSE SECTION */
export const createUserCourse = createAppAsyncThunk(
  "userCourse/createUserCourse",
  async (data: any, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.post(`/user-course`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const findByUserAndCourseId = createAppAsyncThunk(
  "userCourse/findByUserAndCourseId",
  async (
    { userId, courseId }: { userId: string; courseId: string },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.get(
        `/user-course/user/${userId}/course/${courseId}`
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userPayCourse = createAppAsyncThunk(
  "userCourse/userPayCourse",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/user-course/pay-course/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUserModule = createAppAsyncThunk(
  "userModule/createUserModule",
  async (data: any, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.post(`/user-module`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const findByUserAndModuleId = createAppAsyncThunk(
  "userModule/findByUserAndModuleId",
  async (
    { userId, moduleId }: { userId: string; moduleId: string },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.get(
        `/user-module/user/${userId}/module/${moduleId}`
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserCourse = createAppAsyncThunk(
  "userModule/updateUserCourse",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.patch(`/user-course/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const togglePublishCourse = createAppAsyncThunk(
  "course/togglePublishCourse",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/course/toggle-publish/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCurrentChapter = createAppAsyncThunk(
  "userChapter/updateCurrentChapter",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.patch(`/user-module/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteByUserAndModuleId = createAppAsyncThunk(
  "userModule/deleteByUserAndModuleId",
  async (
    { userId, moduleId }: { userId: string; moduleId: string },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.delete(
        `/user-module/user/${userId}/module/${moduleId}`
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
