import { createSlice } from "@reduxjs/toolkit";
import {
  createCertificate,
  createUserCertificate,
  fetchAllCertificates,
  findByUserIdAndCertificateId,
} from "./thunks";
import {
  CertificateSliceState,
  ICertificate,
  IUserCertificate,
} from "@/lib/interfaces/certificate.interface";

const initialState: CertificateSliceState = {
  allCertificates: [],
  certificate: {} as ICertificate,
  userCertificate: {} as IUserCertificate,
  loading: false,
  error: {},
};

export const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCertificate.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCertificate.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchAllCertificates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.allCertificates = action.payload.data;
      })
      .addCase(fetchAllCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(createUserCertificate.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserCertificate.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createUserCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(findByUserIdAndCertificateId.pending, (state) => {
        state.loading = true;
      })
      .addCase(findByUserIdAndCertificateId.fulfilled, (state, action) => {
        state.loading = false;
        state.userCertificate = action.payload.data;
      })
      .addCase(findByUserIdAndCertificateId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
