import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserByToken,
  googleLogin,
  loginUser,
  registerUser,
  verifyUser,
} from "./thunks";

const initialState = {
  allUsers: [],
  user: {},
  loggedInUser: {},
  loading: false,
  error: {},
};

export const userSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.loggedInUser = action.payload;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchUserByToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserByToken.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(fetchUserByToken.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = action.error;
      });
  },
});
