import { Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
import { createURQLClient } from "../cache/client";
import FormInput from "../components/FormInput";
import SingleFormPage from "../components/general/SingleFormPage";
import {
  useCreateNewPostMutation,
  useUpdatePostMutation,
} from "../generated/graphql";
import { useIsAuth } from "../utils/hooks/useIsAuth";

interface CreatePostFormProps {
  title?: string;
  content?: string;
  isUpdate?: boolean;
  postId?: number;
}

export const CreatePostForm: FC<CreatePostFormProps> = ({
  title,
  content,
  isUpdate,
  postId,
}) => {
  const router = useRouter();
  let operation: any = null;
  if (isUpdate) {
    const [, updatePost] = useUpdatePostMutation();
    operation = updatePost;
  } else {
    const [, createPost] = useCreateNewPostMutation();
    operation = createPost;
  }

  return (
    <Formik
      initialValues={{
        title: title ? title : "",
        content: content ? content : "",
      }}
      onSubmit={async (values, { setErrors }) => {
        if (values.content === "" || values.title === "") {
          setErrors({
            title:
              values.title === "" ? "This field must not be empty" : undefined,
            content:
              values.content === ""
                ? "This field must not be empty"
                : undefined,
          });
        }
        const { error } = await operation({
          id: isUpdate ? postId : undefined,
          input: values,
        });
        if (!error) {
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form>
            <FormInput name="title" label="Title" />
            <FormInput
              inputType="textarea"
              name="content"
              label="Content"
              boxProps={{
                mt: 4,
              }}
            />

            <Flex w="100%" justify="flex-end" align="center" mt={5}>
              {" "}
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variant="solid"
                colorScheme="blue"
              >
                Post
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

const CreatePost: FC = ({}) => {
  useIsAuth("create-post");

  return (
    <>
      <Head>
        <title>Bubble. | New Post</title>
      </Head>
      <SingleFormPage
        form={<CreatePostForm isUpdate={false} />}
        title="New Post"
        description="Create your new Post here"
      />
    </>
  );
};

export default withUrqlClient(createURQLClient)(CreatePost);
