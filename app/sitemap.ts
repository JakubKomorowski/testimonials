import { ROUTES } from "@/routes";
import { getPosts } from "@/sanity/utils";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://www.trustcatcher.com/blog/${post.slug}/`,
    lastModified: `${post.publishedAt}`,
    // lastModified: `2024-01-11T21:39:28.031Z`,
  }));

  return [
    {
      url: `https://www.trustcatcher.com/`,
    },
    {
      url: `https://www.trustcatcher.com/${ROUTES.contact}/`,
    },
    ...postEntries,
  ];
}
