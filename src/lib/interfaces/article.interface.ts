export interface ArticleSliceState {
  articles: Article[];
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
  createdAt: Date;
  updatedAt: Date;
  tags: ArticleTag;
  author: User;
}

export interface ArticleTag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: Profile;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: string;
  userId: string;
  phoneNumber: string;
  gender: string;
  birthDate: string;
  picture: string;
  country: string;
  city: string;
  address1: string;
  address2: string;
  createdAt: Date;
  updatedAt: Date;
}
