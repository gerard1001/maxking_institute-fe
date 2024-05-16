import { User } from "./user.interface";

export interface ITestimonial {
  id: string;
  text: string;
  isPinned: boolean;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestimonialSliceState {
  allTestimonials: ITestimonial[];
  testimonial: ITestimonial;
  loading: boolean;
  error: any;
}
