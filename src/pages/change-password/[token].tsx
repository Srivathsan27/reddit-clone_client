import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import FormInput from "../../components/FormInput";
import Wrapper from "../../components/UI/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createURQLClient } from "../../cache/client";
import { useState } from "react";
import SingleFormPage from "../../components/general/SingleFormPage";
import Head from "next/head";

const ChangePasswordForm: React.FC = () => {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();

  const [body, setBody] = useState<JSX.Element | null>(null);
  return (
    <Flex w="100%" direction="column" gap={4} mt={6}>
      <Formik
        initialValues={{
          password: "",
          "confirm-password": "",
        }}
        onSubmit={async (
          { password, "confirm-password": conpas },
          { setErrors }
        ) => {
          if (password !== conpas) {
            setErrors({
              password: "The passwords must be the same",
              "confirm-password": "the passwords must be the same",
            });
          } else {
            const response = await changePassword({
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
              password,
            });
            if (!response.data?.changePassword) {
              setBody(<Text>Oops, Something went wrong!</Text>);
            } else if (response.data.changePassword.errors) {
              const errMap = toErrorMap(response.data.changePassword.errors);
              if (!errMap["token"]) setErrors(errMap);
              else {
                setBody(
                  <Text color="red.200" fontSize="md" textAlign="center">
                    Token Has Expired!
                  </Text>
                );
              }
            } else {
              router.replace("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormInput name="password" label="Password" type="password" />

            <FormInput
              name="confirm-password"
              label="Confirm Password"
              boxProps={{
                mt: 4,
              }}
              type="password"
            />
            {!body && (
              <Flex justify="flex-end">
                <Button
                  type="submit"
                  mt={8}
                  colorScheme="blue"
                  variant="solid"
                  isLoading={isSubmitting}
                >
                  Change
                </Button>
              </Flex>
            )}
          </Form>
        )}
      </Formik>
      <Box mt={8}>{body}</Box>
    </Flex>
  );
};

const ChangePassword: React.FC = () => {
  return (
    <>
      <Head>
        <title>Bubble. | Change Password</title>
      </Head>
      <SingleFormPage
        description="Enter your new password here to login."
        title="Change Password"
        form={<ChangePasswordForm />}
      />
    </>
  );
};

export default withUrqlClient(createURQLClient)(ChangePassword);
