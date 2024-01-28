import { getPage } from "@/sanity/utils";
import { PortableText } from "@portabletext/react";
import React from "react";
import { components } from "@/app/components/PortableTextComponents";
import { sanityFetch } from "@/sanity/lib/client";
import { Page } from "@/types/Page";

const PrivacyPolicy = async () => {
  const page: Page = await sanityFetch({
    query: getPage,
    tags: ["page"],
    qParams: { slug: "privacy-policy" },
  });
  return (
    <main>
      <header className="bg-bg py-12 md:py-16 flex items-center justify-center mb-16">
        <div className="max-w-[1100px] flex-1 mx-4 md:mx-16">
          <div className="flex mb-6"></div>
          <h1 className="text-white leading-[1.15]">{page.title}</h1>
        </div>
      </header>
      <article className="container">
        <PortableText value={page.body} components={components(page)} />
      </article>
    </main>
  );
};

export default PrivacyPolicy;
