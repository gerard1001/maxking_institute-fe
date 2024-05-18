import { createSlice } from "@reduxjs/toolkit";
import {
  createTestimonial,
  deleteTestimonial,
  editTestimonial,
  fetchTestimonials,
  fetchSingleTestimonial,
  togglePinTestimonial,
} from "./thunks";
import {
  ITestimonial,
  TestimonialSliceState,
} from "@/lib/interfaces/testimonial.interface";

const initialState: TestimonialSliceState = {
  allTestimonials: [],
  testimonial: {} as ITestimonial,
  loading: false,
  error: {},
};

export const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTestimonial.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(editTestimonial.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTestimonial.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.allTestimonials = action.payload.data;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchSingleTestimonial.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonial = action.payload.data;
      })
      .addCase(fetchSingleTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(togglePinTestimonial.pending, (state) => {
        state.loading = true;
      })
      .addCase(togglePinTestimonial.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(togglePinTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteTestimonial.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
