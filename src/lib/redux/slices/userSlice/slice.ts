import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./thunks";

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
  },
});
