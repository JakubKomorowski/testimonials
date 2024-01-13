import PostCard from "@/app/components/ui/PostCard";
import { sanityFetch } from "@/sanity/lib/client";
import { getPosts } from "@/sanity/utils";
import { Post } from "@/types/Post";
import React from "react";

export const dynamicParams = true;
const Blog = async () => {
  const posts: Post[] = await sanityFetch({
    query: getPosts,
    tags: ["post"],
  });

  return (
    <>
      <header className="bg-bg h-[280px] flex items-center justify-center ">
        <h1 className="text-white">Blog</h1>
      </header>
      <section className=" my-[100px]  max-w-[1250px] mx-auto px-4">
        <div className="grid grid-cols-fluid gap-4 gap-y-8">
          {posts.map((post, i) => {
            return <PostCard key={i} post={post} />;
          })}
        </div>
      </section>
    </>
  );
};

export default Blog;
