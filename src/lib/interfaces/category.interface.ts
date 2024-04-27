export interface ICategory {
  id: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCategory {
  name: string;
  image: string;
}

export interface CategorySliceState {
  allCategories: ICategory[];
  category: ICategory;
  loading: boolean;
  error: any;
}
