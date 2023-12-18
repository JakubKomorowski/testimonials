import { PortableTextBlock } from "sanity";

export type Post = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: string;
  author: string;
  mainImage: string;
  alt: string;
  categories: Category[];
  body: PortableTextBlock[];
  customTable: any;
  showImage: boolean;
  headings: any;
  metaTitle: string;
  metaDescription: string;
};

interface Category {
  _ref: string;
  _type: string;
  _key: string;
}
