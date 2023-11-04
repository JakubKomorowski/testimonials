import { groq } from "next-sanity";
import { client } from "./lib/client";
import { Post } from "@/types/Post";

export const getPosts = async (): Promise<Post[]> => {
  return client.fetch(
    groq`*[_type == "post"]{
          _id,
          _createdAt,
          title,
          "slug": slug.current,
          "mainImage": mainImage.asset->url,
          "alt": mainImage.asset->alt,
          body
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
              body
     } `,
    { slug }
  );
};
