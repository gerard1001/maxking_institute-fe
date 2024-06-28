import { createSlice } from "@reduxjs/toolkit";
import {
  createProgram,
  deleteProgram,
  editProgram,
  fetchProgramByShort,
  fetchPrograms,
  fetchSingleProgram,
} from "./thunks";
import { Program, ProgramSliceState } from "@/lib/interfaces/program.interface";

const initialState: ProgramSliceState = {
  programs: [],
  singleProgram: {} as Program,
  loading: false,
  error: {},
};

export const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProgram = action.payload;
      })
      .addCase(createProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(editProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProgram.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchPrograms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.programs = action.payload.data;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchSingleProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProgram = action.payload.data;
      })
      .addCase(fetchSingleProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchProgramByShort.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProgramByShort.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProgram = action.payload.data;
      })
      .addCase(fetchProgramByShort.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProgram.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
