import { Button, Flex, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { FC } from "react";
import { useCommentPostMutation } from "../../generated/graphql";
import FormInput from "../FormInput";

interface CommentFormProps {
  postId: number;
  isOpen: boolean;
  setIsOpen: Function;
}
export const CommentForm: FC<CommentFormProps> = ({
  postId,
  isOpen,
  setIsOpen,
}) => {
  const [, addComment] = useCommentPostMutation();
  const toast = useToast();
  return (
    <Formik
      initialValues={{ text: "" }}
      onSubmit={async (values, { setErrors }) => {
        if (values.text === "") {
          setErrors({
            text: "This field must not be empty",
          });
          return;
        }

        const resp = await addComment({
          comment: values.text,
          post: postId,
        });
        if (resp.error || resp.data?.addComment.error) {
          if (resp.data?.addComment.error?.field === "comment") {
            toast({
              title: "Info",
              description: "You have already commented on this post!",
              duration: 5000,
              isClosable: true,
              position: "bottom-left",
              variant: "solid",
              status: "info",
            });
          }
          toast({
            title: "Error",
            description: "Oops, Could not comment on post!",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
            variant: "solid",
            status: "error",
          });
        } else {
          toast({
            title: "Success",
            description: "Created Comment Successfully!",
            duration: 5000,
            isClosable: true,
            position: "bottom",
            variant: "solid",
            status: "success",
          });
        }

        setIsOpen(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormInput
            type="text"
            inputType="textarea"
            label="Text"
            name="text"
            color="black"
          ></FormInput>
          <Flex justifyContent="flex-end">
            <Button
              mt={6}
              colorScheme="blue"
              type="submit"
              variant="solid"
              isLoading={isSubmitting}
            >
              Comment
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
