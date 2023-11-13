import { getPosts } from "@/sanity/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const posts = await getPosts();
  const session = await getServerSession(authOptions);

  return (
    <main className="">
      {session?.user?.name ? (
        <>
          <div>{session.user.name}</div>
        </>
      ) : (
        <>
          <div>not logged in</div>
        </>
      )}
    </main>
  );
}
