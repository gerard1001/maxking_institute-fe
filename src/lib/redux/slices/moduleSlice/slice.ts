import { createSlice } from "@reduxjs/toolkit";
import {
  createModule,
  deleteModule,
  fetchOneModule,
  fetchAllModules,
  updateModule,
  fetchModulesBySubjectId,
} from "./thunks";
import { IModule, ModuleSliceState } from "@/lib/interfaces/module.interface";

const initialState: ModuleSliceState = {
  allModules: [],
  module: {} as IModule,
  loading: false,
  error: {},
};

export const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createModule.pending, (state) => {
        state.loading = true;
      })
      .addCase(createModule.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchAllModules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllModules.fulfilled, (state, action) => {
        state.loading = false;
        state.allModules = action.payload.data;
      })
      .addCase(fetchAllModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchOneModule.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOneModule.fulfilled, (state, action) => {
        state.loading = false;
        state.module = action.payload.data;
      })
      .addCase(fetchOneModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchModulesBySubjectId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchModulesBySubjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.allModules = action.payload.data;
      })
      .addCase(fetchModulesBySubjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteModule.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteModule.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(updateModule.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateModule.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
