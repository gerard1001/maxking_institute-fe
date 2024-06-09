import { createSlice } from "@reduxjs/toolkit";
import {
  createCollaborator,
  deleteCollaborator,
  fetchAOneCollaborator,
  fetchAllCollaborators,
  updateCollaborator,
} from "./thunks";
import {
  CollaboratorSliceState,
  ICollaborator,
} from "@/lib/interfaces/collaborator.interface";

const initialState: CollaboratorSliceState = {
  allCollaborators: [],
  collaborator: {} as ICollaborator,
  loading: false,
  error: {},
};

export const collaboratorSlice = createSlice({
  name: "collaborator",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCollaborator.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCollaborator.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createCollaborator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchAllCollaborators.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCollaborators.fulfilled, (state, action) => {
        state.loading = false;
        state.allCollaborators = action.payload.data;
      })
      .addCase(fetchAllCollaborators.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchAOneCollaborator.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAOneCollaborator.fulfilled, (state, action) => {
        state.loading = false;
        state.collaborator = action.payload.data;
      })
      .addCase(fetchAOneCollaborator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteCollaborator.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCollaborator.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteCollaborator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(updateCollaborator.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCollaborator.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCollaborator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
