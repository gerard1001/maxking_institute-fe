import { createSlice } from "@reduxjs/toolkit";
import {
  createTweet,
  deleteTweet,
  fetchTweets,
  fetchSingleTweet,
  togglePinTweet,
  findPinnedTweet,
} from "./thunks";
import { ITweet, TweetSliceState } from "@/lib/interfaces/tweet.interface";

const initialState: TweetSliceState = {
  allTweets: [],
  tweet: {} as ITweet,
  loading: false,
  error: {},
};

export const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchTweets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.allTweets = action.payload.data;
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchSingleTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweet = action.payload.data;
      })
      .addCase(fetchSingleTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(findPinnedTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(findPinnedTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweet = action.payload.data;
      })
      .addCase(findPinnedTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(togglePinTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(togglePinTweet.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(togglePinTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder
      .addCase(deleteTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
