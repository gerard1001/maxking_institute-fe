import { createSlice } from "@reduxjs/toolkit";
import {
  createCourse,
  deleteCourse,
  fetchOneCourse,
  fetchAllCourses,
  updateCourse,
  fetchCoursesBySubjectId,
  createUserCourse,
  createUserModule,
  updateCurrentChapter,
  updateUserCourse,
  findByUserAndModuleId,
  findByUserAndCourseId,
  deleteByUserAndModuleId,
  togglePublishCourse,
  userPayCourse,
  deleteUserCourse,
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

    builder
      .addCase(togglePublishCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(togglePublishCourse.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(togglePublishCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(createUserCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserCourse.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createUserCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(createUserModule.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserModule.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createUserModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(updateCurrentChapter.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCurrentChapter.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCurrentChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(updateUserCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserCourse.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateUserCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(findByUserAndModuleId.pending, (state) => {
        state.loading = true;
      })
      .addCase(findByUserAndModuleId.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(findByUserAndModuleId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(findByUserAndCourseId.pending, (state) => {
        state.loading = true;
      })
      .addCase(findByUserAndCourseId.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(findByUserAndCourseId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteByUserAndModuleId.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteByUserAndModuleId.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteByUserAndModuleId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(userPayCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(userPayCourse.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(userPayCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteUserCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserCourse.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteUserCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
