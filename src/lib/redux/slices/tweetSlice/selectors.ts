import { ReduxState } from "../../store";

export const selectTweets = (state: ReduxState) => state.tweet;
