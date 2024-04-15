import { Role, RoleSliceState } from "@/lib/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";
import { fetchRoles } from "./thunks";

const initialState: RoleSliceState = {
  role: {} as Role,
  roles: [],
  loading: false,
  error: {},
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload.data;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
