import { groq } from "next-sanity";
import { client } from "./lib/client";
import { Post } from "@/types/Post";
import { Category } from "@/types/Category";

export const getPosts = async (): Promise<Post[]> => {
  return client.fetch(
    groq`*[_type == "post"]{
          _id,
          _createdAt,
          title,
          "slug": slug.current,
          "mainImage": mainImage.asset->url,
          "alt": mainImage.asset->alt,
          body,
          categories
      }`
  );
};

export const getPost = async (slug: string): Promise<Post> => {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
              _id,
              _createdAt,
              title,
              "slug": slug.current,
              "mainImage": mainImage.asset->url,
              "alt": mainImage.asset->alt,
              body,
              categories
     } `,
    { slug }
  );
};

export const getCategories = async (): Promise<Category[]> => {
  return client.fetch(
    groq`*[_type == "category"]{
          _id,
          title,
          description
      }`
  );
};
