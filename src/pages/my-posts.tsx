import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { FC, useState } from "react";
import { createURQLClient } from "../cache/client";
import PostList from "../components/post/postList";
import { Post, useMyPostsQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { isServer } from "../utils/isServer";

const MyPosts: FC = () => {
  if (!isServer()) {
    useIsAuth("/");
  }

  const [variables, setvariables] = useState({
    limit: 10,
    cursor: undefined as undefined | string,
  });
  const [{ data: postsData, fetching: loadingPosts }] = useMyPostsQuery({
    variables: variables,
  });

  let body: JSX.Element = <div>Hello World</div>;

  if (loadingPosts) {
    body = (
      <Flex alignSelf="center">
        <Spinner size="xl" />
      </Flex>
    );
  } else if (!loadingPosts && !postsData?.myPosts.posts) {
    body = <Text>Oops, Something went Wrong!</Text>;
  } else {
    const posts = postsData?.myPosts.posts as Post[];

    body = (
      <Flex pt="5%" direction="column" gap={12} minH="85vh">
        <Heading size="lg" color="white" textAlign="center">
          My Posts
        </Heading>
        <PostList
          posts={posts}
          onClick={() => {
            setvariables({
              ...variables,
              cursor: posts[posts.length - 1].createdAt,
            });
          }}
          loadMore={postsData?.myPosts.hasMorePosts as boolean}
        />
      </Flex>
    );
  }

  return (
    <>
      <Head>
        <title>Bubble. | My Posts</title>
      </Head>
      {body}
    </>
  );
};

export default withUrqlClient(createURQLClient, { ssr: true })(MyPosts);
