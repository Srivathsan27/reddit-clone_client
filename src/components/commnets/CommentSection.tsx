import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { MeQuery } from "../../generated/graphql";
import Card from "../UI/Card";
import Wrapper from "../UI/Wrapper";
import { CommentForm } from "./CommentForm";
import CommentList from "./CommentList";

interface CommentSectionProps {
  comments: any[] | undefined;
  postId: number;
  user?: MeQuery;
}

const CommentSection: FC<CommentSectionProps> = ({
  comments,
  postId,
  user,
}) => {
  const [isFormOpen, setisFormOpen] = useState<boolean>(false);

  return (
    <Wrapper type="medium">
      <Card>
        <Flex justify="space-between" align="center" mt={5}>
          <Heading size="lg" pl={5}>
            Comments
          </Heading>

          <IconButton
            aria-label="add-comment"
            icon={isFormOpen ? <MinusIcon /> : <AddIcon />}
            mr={2}
            mt={1}
            onClick={() => setisFormOpen((state) => !state)}
          />
        </Flex>

        {isFormOpen && (
          <Flex mt={5} p={5} direction="column" gap={7}>
            <Text fontSize="xl">Add Comment</Text>
            <CommentForm
              postId={postId}
              setIsOpen={setisFormOpen}
              isOpen={isFormOpen}
            />
          </Flex>
        )}
        {comments && <CommentList comments={comments} user={user} />}
      </Card>
    </Wrapper>
  );
};

export default CommentSection;
