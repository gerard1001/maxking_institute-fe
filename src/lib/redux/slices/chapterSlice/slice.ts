import { createSlice } from "@reduxjs/toolkit";
import {
  createChapter,
  deleteChapter,
  fetchOneChapter,
  fetchAllChapters,
  updateChapter,
  fetchChaptersBySubjectId,
} from "./thunks";
import {
  IChapter,
  ChapterSliceState,
} from "@/lib/interfaces/chapter.interface";

const initialState: ChapterSliceState = {
  allChapters: [],
  chapter: {} as IChapter,
  loading: false,
  error: {},
};

export const chapterSlice = createSlice({
  name: "chapter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChapter.pending, (state) => {
        state.loading = true;
      })
      .addCase(createChapter.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchAllChapters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllChapters.fulfilled, (state, action) => {
        state.loading = false;
        state.allChapters = action.payload.data;
      })
      .addCase(fetchAllChapters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchOneChapter.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOneChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.chapter = action.payload.data;
      })
      .addCase(fetchOneChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchChaptersBySubjectId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChaptersBySubjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.allChapters = action.payload.data;
      })
      .addCase(fetchChaptersBySubjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteChapter.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteChapter.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(updateChapter.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateChapter.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
