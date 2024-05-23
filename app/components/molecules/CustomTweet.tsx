import type { Tweet } from "react-tweet/api";
import Image from "next/image";
import {
  type TwitterComponents,
  TweetContainer,
  TweetHeader,
  TweetInReplyTo,
  TweetBody,
  TweetMedia,
  TweetInfo,
  TweetActions,
  QuotedTweet,
  enrichTweet,
} from "react-tweet";

type Props = {
  tweet: Tweet;
  components?: TwitterComponents;
};

export const components: TwitterComponents = {
  AvatarImg: (props) => <Image {...props} />,
  MediaImg: (props) => <Image {...props} fill unoptimized />,
};

export const CustomTweet = ({ tweet: t }: Props) => {
  const tweet = enrichTweet(t);
  console.log(tweet);
  return (
    <TweetContainer>
      <TweetHeader tweet={tweet} components={components} />
      {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
      <TweetBody tweet={tweet} />
      {tweet.mediaDetails?.length ? (
        <TweetMedia tweet={tweet} components={components} />
      ) : null}
      {tweet.quoted_tweet && <QuotedTweet tweet={tweet.quoted_tweet} />}
      {/* <TweetInfo tweet={tweet} />
      <TweetActions tweet={tweet} /> */}
      {/* We're not including the `TweetReplies` component that adds the reply button */}
    </TweetContainer>
  );
};
