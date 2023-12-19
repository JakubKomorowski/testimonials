import { getCategories, getPosts } from "@/sanity/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Blog = async () => {
  const posts = await getPosts();
  const categories = await getCategories();
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  } as const;

  return (
    <>
      <header className="bg-primary-foreground h-[280px] flex items-center justify-center ">
        <h1 className="text-white">Blog</h1>
      </header>
      <section className=" mt-[100px]  max-w-[1250px] mx-auto px-4">
        <div className="grid grid-cols-fluid gap-4">
          {posts.map((post) => {
            const categoryObject = categories.find(
              (el) => el?._id === post?.categories?.[0]._ref
            );
            const createdDate = new Date(post._createdAt).toLocaleDateString(
              "en-US",
              options
            );
            return (
              <div
                key={post._id}
                className="shadow-[0px_1px_6px_1px_rgba(96,97,112,0.16)] rounded-xl w-[270px] justify-self-center  p-2"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="h-full flex flex-col"
                >
                  <div className="h-[180px] overflow-hidden object-cover relative rounded-xl">
                    {categoryObject?.title && (
                      <div className="absolute z-20 top-3 right-3 bg-primary-foreground px-3 py-1 text-white text-sm rounded-[10px]">
                        {categoryObject?.title}
                      </div>
                    )}

                    <Image
                      src={post.mainImage}
                      alt={post?.alt}
                      width={0}
                      height={0}
                      sizes="100%"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }} // optional
                    />
                  </div>
                  <div className="flex justify-between flex-col grow">
                    <div className="py-4 px-2  text-lg ">{post.title}</div>
                    <div className="bg-muted w-full h-6 rounded-[10px] text-sm text-slate-400 flex justify-end items-center px-2">
                      {createdDate}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Blog;
