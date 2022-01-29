import { Box, Button, Flex, StackDivider, VStack } from "@chakra-ui/react";
import { FC, MouseEventHandler } from "react";
import { Post } from "../../generated/graphql";
import Wrapper from "../UI/Wrapper";
import PostItem from "./postItem";

interface PostListProps {
  posts: Post[];
  onClick: MouseEventHandler<HTMLButtonElement>;
  loadMore: boolean;
}

const PostList: FC<PostListProps> = ({ onClick, posts, loadMore }) => {
  return (
    <Wrapper type="medium">
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {posts &&
          posts.map((post) => (
            <PostItem
              id={post.id}
              title={post.title}
              content={post.contentSnip}
              creator={post.creator.username}
              uploadedAt={new Date(+post.createdAt)}
              key={post.id}
              hits={post.numberOfHits}
              hitStatus={post.hitStatus as number}
              numberOfComments={post.numberOfComments}
              creatorId={post.creatorId}
            ></PostItem>
          ))}
      </VStack>
      {
        <Flex mt={5} justifyContent={"center"} mb={10}>
          {loadMore && (
            <Button colorScheme="linkedin" onClick={onClick}>
              Load More
            </Button>
          )}
        </Flex>
      }
    </Wrapper>
  );
};

export default PostList;
