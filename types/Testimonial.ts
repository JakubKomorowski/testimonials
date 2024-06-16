import { Timestamp } from "firebase-admin/firestore";
import { FileWithPath } from "react-dropzone";
import { IPhoto } from "./Form";

interface ITimestamp {
  seconds: number;
  nanoseconds: number;
}
export interface Testimonial {
  testimonial: string;
  name: string;
  email?: string;
  website?: string;
  socialLink?: string;
  photo?: IPhoto;
  rating?: number;
  createdAt?: Timestamp | ITimestamp;
  formId?: string;
  id: string;
  userId?: string;
  source?: string;
  date?: ITimestamp;
}
