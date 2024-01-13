import { groq } from "next-sanity";

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

export const getCategories = groq`*[_type == "category"]{
          _id,
          title,
          description
      }`;

export const getPage = groq`*[_type == "page" && slug.current == $slug][0]{
              _id,
              _createdAt,
              title,
              "slug": slug.current,
              body,
              metaTitle,
              metaDescription
     } `;
