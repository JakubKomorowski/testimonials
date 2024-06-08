import { Timestamp } from "firebase-admin/firestore";
import { IPhoto } from "./Form";

interface Testimonial {
  testimonial: string;
  name: string;
  website?: string;
  socialLink?: string;
  photo?: IPhoto;
  rating?: number;
  id: string;
  createdAt: Timestamp;
}

export interface Widget {
  testimonials: Testimonial[];
  userId: string;
  card: string;
  createdAt: Date | Timestamp;
  name: string;
}
