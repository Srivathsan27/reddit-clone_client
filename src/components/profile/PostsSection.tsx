import { Skeleton, useToast } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useGetUserPostsQuery, useMyPostsQuery } from "../../generated/graphql";
import Card from "../UI/Card";
import PostList from "./PostList";

interface PostsSectionProps {
  userId: number;
}

const PostsSection: FC<PostsSectionProps> = ({ userId }) => {
  const toast = useToast();
  const [variables, setvariables] = useState({
    id: userId,
    limit: 10,
    cursor: undefined as undefined | string,
  });
  const [{ data: postsData, fetching: loadingPosts, error }] =
    useGetUserPostsQuery({
      variables: variables,
    });
  if (error) {
    toast({
      description: "Could not fetch posts",
      duration: 3000,
      isClosable: true,
      position: "bottom-left",
      status: "error",
      title: "Error",
      variant: "solid",
    });
    return <></>;
  }
  const posts = postsData?.userPosts.posts ? postsData?.userPosts.posts : [];
  return (
    <Skeleton minH="20vh" minW="30vw" isLoaded={!loadingPosts}>
      {!loadingPosts && (
        <PostList
          posts={posts}
          onClick={() => {
            setvariables({
              ...variables,
              cursor: posts[posts.length - 1].createdAt,
            });
          }}
          loadMore={postsData?.userPosts.hasMorePosts as boolean}
        />
      )}
    </Skeleton>
  );
};

export default PostsSection;
