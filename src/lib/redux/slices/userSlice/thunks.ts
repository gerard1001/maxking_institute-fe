import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import {
  IUserSignUp,
  ILoginUser,
  ICreateUser,
} from "@/lib/interfaces/user.interface";

export const registerUser = createAppAsyncThunk(
  "user/registerUser",
  async (userData: IUserSignUp, { rejectWithValue }): Promise<any> => {
    try {
      const { firstName, lastName, email, password } = userData;
      const res = await axios.post(`/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAppAsyncThunk(
  "user/createUser",
  async (userData: ICreateUser, { rejectWithValue }): Promise<any> => {
    try {
      const { firstName, lastName, email, roleId } = userData;
      const res = await axios.post(`/auth/create-user`, {
        firstName,
        lastName,
        email,
        roleId,
      });
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
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserById = createAppAsyncThunk(
  "user/fetchUserById",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/user/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllUsers = createAppAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.get(`/user`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAppAsyncThunk(
  "user/deletUser",
  async (id: string, { rejectWithValue }): Promise<any> => {
    try {
      const res = await axios.delete(`/user/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAppAsyncThunk(
  "user/updateUser",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const res = await axios.patch(`/user/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAppAsyncThunk(
  "user/updateProfile",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      console.log(data, "0000");
      const res = await axios.patch(`/profile/${id}`, data);
      console.log(res, "0000");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
