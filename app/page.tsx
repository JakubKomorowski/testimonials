import { getPosts } from "@/sanity/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();
  return <main className=""></main>;
}
