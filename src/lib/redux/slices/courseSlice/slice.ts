import { createSlice } from "@reduxjs/toolkit";
import {
  createCourse,
  deleteCourse,
  fetchOneCourse,
  fetchAllCourses,
  updateCourse,
  fetchCoursesBySubjectId,
} from "./thunks";
import { ICourse, CourseSliceState } from "@/lib/interfaces/course.interface";

const initialState: CourseSliceState = {
  allCourses: [],
  course: {} as ICourse,
  loading: false,
  error: {},
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.allCourses = action.payload.data;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchOneCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOneCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload.data;
      })
      .addCase(fetchOneCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchCoursesBySubjectId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoursesBySubjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.allCourses = action.payload.data;
      })
      .addCase(fetchCoursesBySubjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
