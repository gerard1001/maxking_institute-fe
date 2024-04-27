import { createSlice } from "@reduxjs/toolkit";
import { createTag, fetchAllTags } from "./thunks";
import { ITag, TagSliceState } from "@/lib/interfaces/tag.interface";

const initialState: TagSliceState = {
  allTags: [],
  tag: {} as ITag,
  loading: false,
  error: {},
};

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tag = action.payload.data;
      })
      .addCase(createTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchAllTags.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTags.fulfilled, (state, action) => {
        state.loading = false;
        state.allTags = action.payload.data;
      })
      .addCase(fetchAllTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
