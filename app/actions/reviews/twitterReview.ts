"use server";
import { getTweet } from "react-tweet/api";
export async function twitterReview(id: string) {
  if (typeof id !== "string") {
    console.error("bad tweet");
    return;
  }
  const tweet = await getTweet(id);

  if (!tweet) {
    console.error("No tweet found with tweetId: ", id);
    return null;
  }

  return tweet;
}
