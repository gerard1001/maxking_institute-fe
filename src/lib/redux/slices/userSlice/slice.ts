import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  deleteUser,
  fetchAllUserWithMembers,
  fetchAllUsers,
  fetchPublicUsers,
  fetchUserById,
  fetchUserByToken,
  googleLogin,
  loginUser,
  registerUser,
  requestMembership,
  updateProfile,
  updatePublicDisplay,
  updateUser,
  verifyUser,
} from "./thunks";
import { User, UserSliceState } from "@/lib/interfaces/user.interface";

const initialState: UserSliceState = {
  allUsers: [],
  publicUsers: [],
  user: {} as User,
  loggedInUser: {} as User,
  loading: false,
  error: {},
};

export const userSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(requestMembership.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestMembership.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(requestMembership.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchUserByToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserByToken.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload.data;
      })
      .addCase(fetchUserByToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload.data;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchAllUserWithMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUserWithMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload.data;
      })
      .addCase(fetchAllUserWithMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchPublicUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.publicUsers = action.payload.data;
      })
      .addCase(fetchPublicUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(updatePublicDisplay.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePublicDisplay.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updatePublicDisplay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
