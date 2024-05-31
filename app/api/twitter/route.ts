import { NextRequest } from "next/server";
import { getTweet } from "react-tweet/api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (typeof id !== "string") {
    console.error("bad tweet");
    return;
  }
  const tweet = await getTweet(id);

  if (!tweet) {
    console.error("No tweet found with tweetId: ", id);
    return new Response(JSON.stringify({ data: null }));
  }

  return new Response(JSON.stringify({ data: tweet }));
}
