export interface IDocument {
  id: string;
  authorName: string;
  title: string;
  summary: string;
  type: string;
  file: string;
  price?: number;
  currency?: number;
  publishedOn?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentSliceState {
  allDocuments: IDocument[];
  document: IDocument;
  loading: boolean;
  error: any;
}
