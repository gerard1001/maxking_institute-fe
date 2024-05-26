export interface IEvent {
  id: string;
  coverImage: string;
  title: string;
  about: string;
  venue: string;
  type: string;
  date: Date;
  requirements: string | string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EventSliceState {
  allEvents: IEvent[];
  event: IEvent;
  loading: boolean;
  error: any;
}
