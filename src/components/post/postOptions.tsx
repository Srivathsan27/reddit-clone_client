import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  createStandaloneToast,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { FC } from "react";
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../../generated/graphql";
import FocusLock from "react-focus-lock";
import { CreatePostForm } from "../../pages/create-post";
import { title } from "process";
interface PostOptionsProps {
  postId?: number;
  title?: string;
  content?: string;
}

const PostOptions: FC<PostOptionsProps> = ({ postId, title, content }) => {
  const [, deletePost] = useDeletePostMutation();
  const router = useRouter();

  const toast = createStandaloneToast();
  const toastOptions = {
    duration: 5000,
    isClosable: true,
    variant: "subtle",
  } as const;

  const { onOpen, onClose, isOpen } = useDisclosure();

  const deletePostHandler = async () => {
    const { data, error } = await deletePost({
      id: postId as number,
    });

    if (error) {
      console.log(error);
      toast({
        ...toastOptions,
        title: "Could not delete post",
        description: "There was an error in deleting the post.",
        status: "error",
      });
    } else if (data?.delete.errors) {
      console.log(data.delete.errors);
      toast({
        ...toastOptions,
        title: "Could not delete post",
        description: data.delete.errors[0].message,
        status: "error",
      });
    } else {
      toast({
        ...toastOptions,
        title: "Post Deleted",
        description: "Post was deleted successfully",
        status: "info",
      });
      router.replace("/");
    }
  };
  return (
    <Flex mt="auto" mb={5} ml="auto" pr={8} justify="flex-end">
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
          <CreatePostForm
            isUpdate={true}
            postId={postId}
            title={title}
            content={content}
          />
        </PopoverContent>
      </Popover>
      <IconButton
        size="lg"
        aria-label="delete-post"
        icon={<DeleteIcon />}
        onClick={deletePostHandler}
      />
    </Flex>
  );
};

export default PostOptions;
