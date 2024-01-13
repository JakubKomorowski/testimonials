import { groq } from "next-sanity";
import { client } from "./lib/client";
import { Post } from "@/types/Post";
import { Category } from "@/types/Category";

// export const getPosts = async (): Promise<Post[]> => {
//   return client.fetch(
//     groq`*[_type == "post"]{
//           _id,
//           _createdAt,
//           title,
//           "slug": slug.current,
//           "mainImage": mainImage.asset->url,
//           "alt": mainImage.alt,
//           body,
//           categories,
//           publishedAt
//       }`,
//     { next: { revalidate: 3600 } }
//   );
// };

export const getPost = groq`*[_type == "post" && slug.current == $slug][0]{
              _id,
              _createdAt,
              title,
              "slug": slug.current,
              "mainImage": mainImage.asset->url,
              "alt": mainImage.alt,
              body,
              categories,
              customTable,
              showImage,
              "headings": body[length(style) == 2 && string::startsWith(style, "h")],
              metaTitle,
              metaDescription,
              publishedAt
     } `;

export const getPosts = groq`*[_type == "post"]{
          _id,
          _createdAt,
          title,
          "slug": slug.current,
          "mainImage": mainImage.asset->url,
          "alt": mainImage.alt,
          body,
          categories,
          publishedAt
      }`;

export const getCategories = async (): Promise<Category[]> => {
  return client.fetch(
    groq`*[_type == "category"]{
          _id,
          title,
          description
      }`,
    { next: { revalidate: 3600 } }
  );
};

export const getPage = async (slug: string): Promise<Post> => {
  return client.fetch(
    groq`*[_type == "page" && slug.current == $slug][0]{
              _id,
              _createdAt,
              title,
              "slug": slug.current,
              body,
              metaTitle,
              metaDescription
     } `,
    { slug }
  );
};
