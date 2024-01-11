import { ROUTES } from "@/routes";
import { getPosts } from "@/sanity/utils";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://www.trustcatcher.com/blog/${post.slug}/`,
    // lastModified
  }));

  return [
    {
      url: `https://www.trustcatcher.com/`,
    },
    {
      url: `https://www.trustcatcher.com/blog/${ROUTES.contact}/`,
    },
    ...postEntries,
  ];
}
