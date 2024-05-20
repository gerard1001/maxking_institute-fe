import { User } from "./user.interface";

export interface ITweet {
  id: string;
  tweetId: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TweetSliceState {
  allTweets: ITweet[];
  tweet: ITweet;
  loading: boolean;
  error: any;
}
