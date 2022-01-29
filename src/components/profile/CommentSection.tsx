import { Skeleton, toast, useToast } from "@chakra-ui/react";
import { FC } from "react";
import { MeQuery, useGetCommentsQuery } from "../../generated/graphql";
import CommentList from "../commnets/CommentList";

interface CommentSectionProps {
  userId: number;
  username: string;
}

const CommentSection: FC<CommentSectionProps> = ({ userId, username }) => {
  const toast = useToast();
  const [{ data, fetching, error }] = useGetCommentsQuery({
    variables: {
      id: userId,
    },
  });

  if (error) {
    toast({
      description: "Could not fetch comments",
      title: "Error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
      status: "error",
      variant: "solid",
    });
  }

  const comments = data?.userComments ? data?.userComments : [];
  return (
    <Skeleton minH="20 vh" w="40vw" isLoaded={!fetching}>
      <CommentList comments={comments} username={username} />
    </Skeleton>
  );
};

export default CommentSection;
