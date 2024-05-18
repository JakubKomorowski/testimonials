import { Timestamp } from "firebase-admin/firestore";
import { FileWithPath } from "react-dropzone";
import { IPhoto } from "./Form";

export interface Testimonial {
  testimonial: string;
  name: string;
  email?: string;
  website?: string;
  socialLink?: string;
  photo?: IPhoto;
  rating?: number;
  createdAt: Timestamp;
  formId?: string;
  id: string;
  userId?: string;
}
