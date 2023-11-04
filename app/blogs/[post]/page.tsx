import { getPost } from "@/sanity/utils";
import React from "react";

type Props = {
  params: { post: string };
};

const Blog = async ({ params }: Props) => {
  const slug = params.post;
  console.log(slug);
  const project = await getPost(slug);
  return <div>{project.title}</div>;
};

export default Blog;
