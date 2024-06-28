export interface ServiceSliceState {
  services: Service[];
  singleService: Service;
  loading: boolean;
  error: any;
}

export interface Service {
  id: string;
  coverImage: string;
  title: string;
  description: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
