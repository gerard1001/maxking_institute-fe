import { createSlice } from "@reduxjs/toolkit";
import {
  createSubject,
  deleteSubject,
  fetchOneSubject,
  fetchAllSubjects,
  updateSubject,
  fetchSubjectsByCategoryId,
} from "./thunks";
import {
  ISubject,
  SubjectSliceState,
} from "@/lib/interfaces/subject.interface";

const initialState: SubjectSliceState = {
  allSubjects: [],
  subject: {} as ISubject,
  loading: false,
  error: {},
};

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchAllSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.allSubjects = action.payload.data;
      })
      .addCase(fetchAllSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchOneSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOneSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subject = action.payload.data;
      })
      .addCase(fetchOneSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchSubjectsByCategoryId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjectsByCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.allSubjects = action.payload.data;
      })
      .addCase(fetchSubjectsByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
