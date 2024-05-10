import { createSlice } from "@reduxjs/toolkit";
import {
  addQuestion,
  deleteQuestion,
  fetchOneQuestion,
  fetchAllQuestions,
  updateQuestion,
  findByModuleOrCourseId,
} from "./thunks";
import {
  IQuestion,
  QuestionSliceState,
} from "@/lib/interfaces/question.interface";

const initialState: QuestionSliceState = {
  allQuestions: [],
  question: {} as IQuestion,
  loading: false,
  error: {},
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchAllQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuestions = action.payload.data;
      })
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(findByModuleOrCourseId.pending, (state) => {
        state.loading = true;
      })
      .addCase(findByModuleOrCourseId.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuestions = action.payload.data;
      })
      .addCase(findByModuleOrCourseId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchOneQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOneQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.question = action.payload.data;
      })
      .addCase(fetchOneQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(updateQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
