import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Comment, MeQuery } from "../../generated/graphql";
import { CommentItemType } from "../../types/comment";
import CommentOptions from "./CommentOptions";

interface CommentItemProps {
  comment: Comment;
  username?: string;
}

const CommentItem: FC<CommentItemProps> = ({ comment, username }) => {
  return (
    <Flex direction="column" align="flex-start" justify="center" p={4} gap={3}>
      {comment.postTitle ? (
        <Box>
          <Heading size="md">{comment.postTitle}</Heading>
        </Box>
      ) : null}

      <Box flex="0.8">
        <Text fontSize="lg">{comment.text}</Text>
      </Box>

      <Flex pt={5} justify="space-between" align="flex-end" flex="0.2" w="100%">
        <Box flex="0.7">
          <Text fontSize="sm">
            Comment by {username ? username : comment.user.username}
          </Text>
          <Text fontSize="sm">
            Commented at {new Date(+comment.createdAt).toDateString()}
          </Text>
        </Box>
        <Box flex={0.3}>
          {comment.isOwnComment && (
            <CommentOptions postId={comment.postId} text={comment.text} />
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default CommentItem;
