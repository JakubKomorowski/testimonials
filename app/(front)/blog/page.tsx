import PostCard from "@/app/components/ui/PostCard";
import Loading from "@/app/loading";
import { sanityFetch } from "@/sanity/lib/client";
import { getPosts } from "@/sanity/utils";
import { Post } from "@/types/Post";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Trust Catcher - Blog",
  description: "Collect, customize and publish testimonials",
  openGraph: {
    images: "/logo.png",
  },
};

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
      {/* <Suspense fallback={<Loading />}> */}
      <section className=" my-[100px]  max-w-[1250px] mx-auto px-4">
        <div className="grid grid-cols-fluid gap-4 gap-y-8">
          {posts.map((post, i) => {
            return <PostCard key={i} post={post} />;
          })}
        </div>
      </section>
      {/* </Suspense> */}
    </>
  );
};

export default Blog;
