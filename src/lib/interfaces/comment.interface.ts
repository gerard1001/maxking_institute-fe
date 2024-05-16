import { Article, ILike } from "./article.interface";
import { User } from "./user.interface";

export interface CommentSliceState {
  comments: IComment[];
  articleComments: IComment[];
  comment: IComment;
  loading: boolean;
  error: any;
}

export interface IComment {
  id: string;
  text: string;
  userId: string;
  articleId: string;
  writer: User;
  article: Article;
  likes: ILike[];
  createdAt: Date;
  updatedAt: Date;
}
