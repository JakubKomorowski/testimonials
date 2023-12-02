import Box from "@/app/components/PortableTextBox";
import ImageComponent from "@/app/components/PortableTextImage";
import Table from "@/app/components/PortableTextTable";
import { getCategories, getPost } from "@/sanity/utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

type Props = {
  params: { post: string };
};

const Post = async ({ params }: Props) => {
  const slug = params.post;
  const post = await getPost(slug);
  const categories = await getCategories();
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  } as const;
  const categoryObject = categories.find(
    (el) => el?._id === post?.categories?.[0]._ref
  );
  const createdDate = new Date(post._createdAt).toLocaleDateString(
    "en-US",
    options
  );

  return (
    <main>
      <header className="bg-primary-foreground py-12 md:py-16 flex items-center justify-center ">
        <div className="max-w-[1100px] flex-1 mx-4 md:mx-16">
          <div className="flex mb-6">
            <div className="border-white border rounded-tl-sm rounded-bl-sm px-3 py-1 w-fit text-white text-sm">
              {categoryObject?.title}
            </div>
            <div className="border-white border rounded-tr-sm rounded-br-sm px-3 py-1 w-fit bg-white text-sm">
              {createdDate}
            </div>
          </div>
          <h1 className="text-white leading-[1.15]">{post.title}</h1>
        </div>
      </header>
      <article className="">
        {post.showImage && (
          <div className="md:h-[700px] h-[300px] max-w-[1300px] mx-auto  relative">
            <Image
              src={post.mainImage}
              alt={post.alt || " "}
              loading="lazy"
              fill={true}
              style={{
                objectFit: "cover",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            />
          </div>
        )}

        <div className="mx-auto  max-w-[800px] md:mt-20 mt-12 container px-8 md:px-12 ">
          <PortableText
            value={post.body}
            components={{
              types: {
                image: ImageComponent,
              },
              block: {
                //customizing common block types
                h1: ({ children }) => <h1 className="text-5xl">{children}</h1>,
                h2: ({ children }) => (
                  <h2 className="py-4 text-4xl">{children}</h2>
                ),
                normal: ({ children }) => (
                  <p className="py-4 text-lg">{children}</p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-purple-500">
                    {children}
                  </blockquote>
                ),
                //rendering custom styles
                customTable: ({ children }) => (
                  <Table post={post} children={children} />
                ),
                highlightBox: ({ children }) => <Box children={children} />,
              },
            }}
          />
        </div>
      </article>
    </main>
  );
};

export default Post;
