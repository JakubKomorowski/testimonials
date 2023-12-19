import TableOfContents from "@/app/components/TableOfContents";
import { convertDateFormat, parseOutline } from "@/lib/utils";
import { getCategories, getPost } from "@/sanity/utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { components } from "@/app/components/PortableTextComponents";
import { Metadata } from "next";

type Props = {
  params: { post: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const slug = params.post;
  const post = await getPost(slug);
  return {
    title: post.metaTitle ?? `${post.title} - Testi Crafter`,
    description: post.metaDescription ?? "",
  };
};

const Post = async ({ params }: Props) => {
  const slug = params.post;
  const post = await getPost(slug);
  const categories = await getCategories();
  const categoryObject = categories.find(
    (el) => el?._id === post?.categories?.[0]._ref
  );
  const createdDate = convertDateFormat(post._createdAt);
  const outline = parseOutline(post.headings);

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
      <article className="pb-24">
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

        <div className="flex flex-col xl:flex-row items-center xl:items-start xl:justify-center xl:gap-16 container md:mt-20 mt-12  ">
          <Accordion
            type="single"
            collapsible
            className=" xl:hidden min-w-[300px]"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Table of Contents</AccordionTrigger>
              <AccordionContent>
                <TableOfContents outline={outline} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div
            id="toc_container"
            className="border border-gray-300 p-2 rounded-lg h-fit flex-shrink-0 hidden xl:block "
          >
            <p className="font-medium">Table of Contents</p>
            <TableOfContents outline={outline} />
          </div>
          <div className="max-w-[800px]  md:px-12">
            <PortableText value={post.body} components={components(post)} />
          </div>
        </div>
      </article>
    </main>
  );
};

export default Post;
