import { VStack, StackDivider, Flex, Button } from "@chakra-ui/react";
import { FC, MouseEventHandler } from "react";
import { UserPost } from "../../types/userPost";
import Card from "../UI/Card";
import Wrapper from "../UI/Wrapper";
import PostItem from "./PostItem";

interface PostListProps {
  posts: UserPost[];
  onClick: MouseEventHandler<HTMLButtonElement>;
  loadMore: boolean;
}

const PostList: FC<PostListProps> = ({ posts, onClick, loadMore }) => {
  return (
    <Wrapper type="medium">
      <VStack
        mt={8}
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {posts && posts.map((post) => <PostItem post={post} />)}
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
