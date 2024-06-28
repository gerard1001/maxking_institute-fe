import { createSlice } from "@reduxjs/toolkit";
import {
  createService,
  deleteService,
  editService,
  fetchServices,
  fetchSingleService,
} from "./thunks";
import { Service, ServiceSliceState } from "@/lib/interfaces/service.interface";

const initialState: ServiceSliceState = {
  services: [],
  singleService: {} as Service,
  loading: false,
  error: {},
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createService.pending, (state) => {
        state.loading = true;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.singleService = action.payload;
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(editService.pending, (state) => {
        state.loading = true;
      })
      .addCase(editService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchSingleService.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleService.fulfilled, (state, action) => {
        state.loading = false;
        state.singleService = action.payload.data;
      })
      .addCase(fetchSingleService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
