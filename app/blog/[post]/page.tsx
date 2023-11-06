import { getPost } from "@/sanity/utils";
import { PortableText } from "@portabletext/react";

type Props = {
  params: { post: string };
};

const Blog = async ({ params }: Props) => {
  const slug = params.post;
  const post = await getPost(slug);
  return (
    <div>
      {post.title}
      <div>
        <PortableText value={post.body} />
      </div>
    </div>
  );
};

export default Blog;
