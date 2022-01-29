import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  createStandaloneToast,
} from "@chakra-ui/react";
import { title } from "process";
import { FC } from "react";
import { useDeleteCommentMutation } from "../../generated/graphql";
import { CreatePostForm } from "../../pages/create-post";
import UpdateCommentForm from "./UpdateCommentForm";

interface CommentOptionsProps {
  postId: number;
  text: string;
}

const CommentOptions: FC<CommentOptionsProps> = ({ postId, text }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const [, deleteComment] = useDeleteCommentMutation();
  const toast = createStandaloneToast();
  const deleteCommentHander = async () => {
    const res = await deleteComment({
      post: postId,
    });
    if (res.data?.deleteComment === false) {
      toast({
        title: "Error",
        description: "Oops, Could not update the comment!",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
        variant: "solid",
        status: "error",
      });
    } else {
      toast({
        title: "Info",
        description: "Deleted Comment succesfully!",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
        variant: "solid",
        status: "info",
      });
    }
  };

  return (
    <Flex mt="auto" ml="auto" justify="flex-end">
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="left"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton size="lg" aria-label="edit" icon={<EditIcon />} />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <UpdateCommentForm postId={postId} text={text} />
        </PopoverContent>
      </Popover>
      <IconButton
        size="lg"
        aria-label="delete-post"
        icon={<DeleteIcon />}
        onClick={deleteCommentHander}
      />
    </Flex>
  );
};

export default CommentOptions;
