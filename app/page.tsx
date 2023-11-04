import { getPosts } from "@/sanity/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="">
      {posts.map((post) => (
        <>
          <Link href={`/blogs/${post.slug}`} key={post._id}>
            {" "}
            {post.title}
          </Link>
          <Image src={post.mainImage} alt={post.alt} width={250} height={200} />
        </>
      ))}
    </main>
  );
}
