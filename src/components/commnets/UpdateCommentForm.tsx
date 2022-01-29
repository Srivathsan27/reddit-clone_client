import { useToast, Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { FC } from "react";
import { useUpdateCommentMutation } from "../../generated/graphql";
import FormInput from "../FormInput";

interface UpdateCommentFormProps {
  postId: number;
  text: string;
}

const UpdateCommentForm: FC<UpdateCommentFormProps> = ({ postId, text }) => {
  const [, updateComment] = useUpdateCommentMutation();

  const toast = useToast();
  return (
    <Formik
      initialValues={{ text }}
      onSubmit={async (values, { setErrors }) => {
        if (values.text === "") {
          setErrors({
            text: "This field must not be empty",
          });
          return;
        }
        console.log("postid: ", postId);
        const resp = await updateComment({
          text: values.text,
          post: postId,
        });
        console.log("resp : ", resp);
        if (
          resp.error ||
          (resp.data?.updateComment &&
            resp.data.updateComment.includes("an error occurred!"))
        ) {
          console.log(resp.error);
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
            title: "Success",
            description: "Updated Post Successfully!",
            duration: 5000,
            isClosable: true,
            position: "bottom",
            variant: "solid",
            status: "success",
          });
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormInput
            type="text"
            inputType="textarea"
            label="Text"
            name="text"
            color="white"
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

export default UpdateCommentForm;
