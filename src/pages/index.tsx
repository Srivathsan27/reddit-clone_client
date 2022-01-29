import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useState } from "react";
import { createURQLClient } from "../cache/client";
import PostList from "../components/post/postList";
import { Post, usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [variables, setvariables] = useState({
    limit: 10,
    cursor: undefined as undefined | string,
  });
  const [{ data: postsData, fetching: loadingPosts }] = usePostsQuery({
    variables: variables,
  });

  let body: JSX.Element = <div>Hello World</div>;

  if (loadingPosts) {
    body = (
      <Flex alignSelf="center" minH="85vh" w="100%">
        <Spinner size="xl" />
      </Flex>
    );
  } else if (!loadingPosts && !postsData?.posts.posts) {
    body = (
      <Box minH="85vh">
        <Text>Oops, Something went Wrong!</Text>
      </Box>
    );
  } else {
    const posts = postsData?.posts.posts as Post[];

    body = (
      <Flex pt="5%" minH="85vh">
        <PostList
          posts={posts}
          onClick={() => {
            setvariables({
              ...variables,
              cursor: posts[posts.length - 1].createdAt,
            });
          }}
          loadMore={postsData?.posts.hasMorePosts as boolean}
        />
      </Flex>
    );
  }

  return (
    <>
      <Head>
        <title>Bubble. | Home</title>
      </Head>
      {body}
    </>
  );
};

export default withUrqlClient(createURQLClient, { ssr: true })(Index);
