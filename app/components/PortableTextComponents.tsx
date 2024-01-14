import { PortableTextComponents } from "@portabletext/react";
import ImageComponent from "./ui/sanity/PortableTextImage";
import { convertToSlug } from "@/lib/utils";
import Table from "./ui/sanity/PortableTextTable";
import Box from "./ui/sanity/PortableTextBox";
import { Post } from "@/types/Post";
import { Page } from "@/types/Page";

export const components = (post: Post | Page) => {
  const components: PortableTextComponents = {
    types: {
      image: ImageComponent,
      youtube: (props) => (
        <div className="mx-[-30px] md:mx-[-40px] my-10 max-w-[780px]  relative aspect-video">
          <iframe width="100%" height="100%" src={props.value.url}></iframe>
        </div>
      ),
      table: (props) => <Table value={props.value} />,
    },
    block: {
      //customizing common block types
      h1: (props) => <h1 className="text-5xl">{props.children}</h1>,
      h2: ({ children }) => (
        <h2
          id={convertToSlug(children!.toString())}
          className="pt-10 pb-2 text-4xl font-bold"
        >
          {children}
        </h2>
      ),

      h3: ({ children }) => (
        <h3
          id={convertToSlug(children!.toString())}
          className="pt-8 pb-2 text-3xl font-bold"
        >
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4
          id={convertToSlug(children!.toString())}
          className="pt-6 pb-1 text-2xl font-bold"
        >
          {children}
        </h4>
      ),
      normal: ({ children }) => (
        <p className="pt-2 pb-2 text-lg text-gray-900">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-2 border-purple-500">
          {children}
        </blockquote>
      ),
      //rendering custom styles
      highlightBox: ({ children }) => <Box>{children}</Box>,
    },
    list: {
      // Ex. 1: customizing common list types
      bullet: ({ children }) => (
        <ul className="list-disc  pl-10 text-gray-800">{children}</ul>
      ),
      number: ({ children }) => <ol className="mt-lg">{children}</ol>,

      // Ex. 2: rendering custom lists
      checkmarks: ({ children }) => (
        <ol className="m-auto text-lg">{children}</ol>
      ),
    },
    listItem: {
      // Ex. 1: customizing common list types
      bullet: ({ children }) => <li className="pt-2 pb-2 ">{children}</li>,

      // Ex. 2: rendering custom list items
      checkmarks: ({ children }) => <li>✅ {children}</li>,
    },
    marks: {
      // Ex. 1: custom renderer for the em / italics decorator
      em: ({ children }) => (
        <em className="text-gray-600 font-semibold">{children}</em>
      ),

      // Ex. 2: rendering a custom `link` annotation
      link: ({ value, children }) => {
        const target = (value?.href || "").startsWith("http")
          ? "_blank"
          : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            rel={target === "_blank" ? "noindex nofollow" : ""}
            className="underline"
          >
            {children}
          </a>
        );
      },
    },
  };
  return components;
};
