import axios from "@/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { ICreateUser } from "@/lib/interfaces/user.interface";

export const registerUser = createAppAsyncThunk(
  "user/registerUser",
  async (userData: ICreateUser): Promise<any> => {
    try {
      const res = await axios.post(`/auth/register`, {
        data: userData,
      });
      console.log(res);
      return res.data.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
);
