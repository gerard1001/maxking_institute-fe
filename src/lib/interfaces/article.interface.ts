import { ITag } from "./tag.interface";
import { User } from "./user.interface";

export interface ArticleSliceState {
  articles: Article[];
  featuredArticles: Article[];
  relatedArticles: Article[];
  singleArticle: Article;
  loading: boolean;
  error: any;
}

export interface Article {
  id: string;
  coverImage: string;
  title: string;
  description: string;
  body: string | any;
  authorId: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: ITag[];
  author: User;
}

export interface ArticleTag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
