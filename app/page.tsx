import { getPosts } from "@/sanity/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const posts = await getPosts();
  const session = await getServerSession(authOptions);

  console.log(session?.user);

  return (
    <main className="">
      {session?.user?.email ? (
        <>
          <div>{session?.user.email}</div>
        </>
      ) : (
        <>
          <div>not logged in</div>
        </>
      )}
    </main>
  );
}
