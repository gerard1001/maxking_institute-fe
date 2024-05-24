import { createSlice } from "@reduxjs/toolkit";
import {
  createDocument,
  deleteDocument,
  fetchDocuments,
  fetchSingleDocument,
} from "./thunks";
import {
  DocumentSliceState,
  IDocument,
} from "@/lib/interfaces/document.interface";

const initialState: DocumentSliceState = {
  allDocuments: [],
  document: {} as IDocument,
  loading: false,
  error: {},
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.allDocuments = action.payload.data;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchSingleDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.document = action.payload.data;
      })
      .addCase(fetchSingleDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
