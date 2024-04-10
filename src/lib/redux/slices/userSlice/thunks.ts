import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { ICreateUser, ILoginUser } from "@/lib/interfaces/user.interface";

export const registerUser = createAppAsyncThunk(
  "user/registerUser",
  async (userData: ICreateUser, { rejectWithValue }): Promise<any> => {
    try {
      const { firstName, lastName, email, password } = userData;
      const res = await axios.post(`/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      });
      console.log(res);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAppAsyncThunk(
  "user/loginUser",
  async (userData: ILoginUser, { rejectWithValue }): Promise<any> => {
    try {
      const { email, password } = userData;
      const res = await axios.post(`/auth/login`, {
        email,
        password,
      });
      console.log(res);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleLogin = createAppAsyncThunk(
  "user/googleLogin",
  async (): Promise<any> => {
    try {
      const res = await axios.get(`/auth/google`);
      console.log(res);
      return res.data;
    } catch (error: any) {
      // return rejectWithValue(error.response.data);
      throw new Error(error);
    }
  }
);

export const verifyUser = createAppAsyncThunk(
  "user/verifyUser",
  async (token: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/auth/verify/${token}`);
      console.log(res);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserByToken = createAppAsyncThunk(
  "user/fetchUserByToken",
  async (token: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/user/token/${token}`);
      console.log(res);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
