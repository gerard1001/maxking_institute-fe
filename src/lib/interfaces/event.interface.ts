export interface IEvent {
  id: string;
  coverImage: string;
  title: string;
  about: string;
  venue: string;
  type: string;
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
  requirements: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventSliceState {
  allEvents: IEvent[];
  event: IEvent;
  loading: boolean;
  error: any;
}
