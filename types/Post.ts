import { PortableTextBlock } from "sanity";

export type Post = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: string;
  author: string;
  mainImage: string;
  alt: string;
  categories: string[];
  body: PortableTextBlock[];
};
