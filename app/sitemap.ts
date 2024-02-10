import { ROUTES } from "@/routes";
import { sanityFetch } from "@/sanity/lib/client";
import { getPosts } from "@/sanity/utils";
import { Post } from "@/types/Post";
import { MetadataRoute } from "next";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: Post[] = await sanityFetch({
    query: getPosts,
    tags: ["post"],
  });
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://www.trustcatcher.com/blog/${post.slug}`,
    lastModified: `${post.publishedAt}`,
    // lastModified: `2024-01-11T21:39:28.031Z`,
  }));

  return [
    {
      url: `https://www.trustcatcher.com`,
    },
    {
      url: `https://www.trustcatcher.com${ROUTES.contact}`,
    },
    ...postEntries,
  ];
}
