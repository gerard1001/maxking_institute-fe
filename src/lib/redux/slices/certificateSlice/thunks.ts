import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const createCertificate = createAppAsyncThunk(
  "certificate/createCertificate",
  async (
    { courseId, data }: { courseId: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.post(`/certificate/${courseId}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllCertificates = createAppAsyncThunk(
  "certificate/fetchCertificates",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/certificate`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUserCertificate = createAppAsyncThunk(
  "certificate/createUserCertificate",
  async (certificateId: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/user-certificate/${certificateId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const findByUserIdAndCertificateId = createAppAsyncThunk(
  "certificate/findByUserIdAndCertificateId",
  async (
    { userId, certificateId }: { userId: string; certificateId: string },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.get(
        `/user-certificate/user/${userId}/certificate/${certificateId}`
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
