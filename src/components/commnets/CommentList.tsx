import { StackDivider, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { MeQuery } from "../../generated/graphql";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: any[];
  user?: MeQuery;
  username?: string;
}

const CommentList: FC<CommentListProps> = ({ comments, user, username }) => {
  return (
    <VStack
      mt={7}
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      {comments.map((comment) => (
        <CommentItem
          key={String(Math.random())}
          comment={comment}
          username={username ? username : user?.me?.username}
        ></CommentItem>
      ))}
    </VStack>
  );
};

export default CommentList;
