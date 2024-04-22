export interface ITag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateTag {
  name: string;
}

export interface TagSliceState {
  allTags: ITag[];
  tag: ITag;
  loading: boolean;
  error: any;
}
