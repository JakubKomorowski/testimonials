import { PortableTextComponents } from "@portabletext/react";
import ImageComponent from "./ui/sanity/PortableTextImage";
import { convertToSlug } from "@/lib/utils";
import Table from "./ui/sanity/PortableTextTable";
import Box from "./ui/sanity/PortableTextBox";
import { Post } from "@/types/Post";

export const components = (post: Post) => {
  const components: PortableTextComponents = {
    types: {
      image: ImageComponent,
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
      customTable: ({ children }) => <Table post={post} children={children} />,
      highlightBox: ({ children }) => <Box children={children} />,
    },
    list: {
      // Ex. 1: customizing common list types
      bullet: ({ children }) => (
        <ul className="list-disc  pl-5 text-gray-800">{children}</ul>
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
  };
  return components;
};
