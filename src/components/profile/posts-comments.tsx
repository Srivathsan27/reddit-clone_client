import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { FC } from "react";
import Wrapper from "../UI/Wrapper";
import CommentSection from "./CommentSection";
import PostsSection from "./PostsSection";
import TagSection from "./TagSection";

interface PostsCommentsProps {
  userId: number;
  username: string;
}

const PostsComments: FC<PostsCommentsProps> = ({ userId, username }) => {
  return (
    <Wrapper>
      <Tabs colorScheme="blue" color="white" isLazy>
        <TabList>
          <Tab fontSize="lg">Posts</Tab>
          <Tab fontSize="lg">Comments</Tab>
          <Tab fontSize="lg">Tags</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PostsSection userId={userId} />
          </TabPanel>

          <TabPanel>
            <CommentSection username={username} userId={userId} />
          </TabPanel>
          <TabPanel>
            <TagSection userId={userId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Wrapper>
  );
};

export default PostsComments;
