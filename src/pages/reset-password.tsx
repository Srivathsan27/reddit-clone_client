import { Alert, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { createURQLClient } from "../cache/client";
import FormInput from "../components/FormInput";
import SingleFormPage from "../components/general/SingleFormPage";
import { useResetPasswordMutation } from "../generated/graphql";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { toErrorMap } from "../utils/toErrorMap";

interface ResetPasswordProps {}

const ResetPasswordForm: FC = ({}) => {
  const [, resetPassword] = useResetPasswordMutation();

  const [error, setError] = useState(<></>);
  const [header, setHeader] = useState(<></>);
  const router = useRouter();

  return (
    <Flex direction="column" mt={2} gap={4}>
      <Flex padding={2} justifyContent="center" alignItems="center">
        {header}
      </Flex>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        onSubmit={async (
          { currentPassword, newPassword, confirmNewPassword },
          { setErrors }
        ) => {
          if (newPassword !== confirmNewPassword) {
            setErrors({
              newPassword: "The passwords do not match!",
              confirmNewPassword: "The passwords do not match",
            });
          } else {
            const response = await resetPassword({
              current: currentPassword,
              new: newPassword,
            });
            console.log(response.data);
            if (response.data?.resetPassword.errors) {
              const errMap = toErrorMap(response.data.resetPassword.errors);
              if (errMap["user"]) {
                setError(
                  <Text mt={3} textAlign="center">
                    {errMap["user"]}
                  </Text>
                );
              } else {
                setErrors(errMap);
              }
            } else {
              setHeader(
                <Alert status="success">
                  The password has been changed successfully!
                </Alert>
              );
              setTimeout(() => {
                router.push("/");
              }, 3000);
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormInput
              name="currentPassword"
              label="Current Password"
              type="password"
            />
            <FormInput
              name="newPassword"
              label="New Password"
              boxProps={{
                mt: 4,
              }}
              type="password"
            />
            <FormInput
              name="confirmNewPassword"
              label="Confirm New Password"
              boxProps={{
                mt: 4,
              }}
              type="password"
            />
            {error}
            <Flex w="100%" justify="flex-end" align="center" mt={5}>
              <Button
                type="submit"
                mt={4}
                colorScheme="blue"
                variant="solid"
                isLoading={isSubmitting}
              >
                Reset
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

const ResetPassword: FC<ResetPasswordProps> = ({}) => {
  useIsAuth();

  return (
    <>
      <Head>
        <title>Bubble. | Reset Password</title>
      </Head>
      <SingleFormPage
        form={<ResetPasswordForm />}
        title="Reset Password"
        description="Enter your credentials and your new password to change it"
      />
    </>
  );
};

export default withUrqlClient(createURQLClient)(ResetPassword);
