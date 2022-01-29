import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { FC, useState } from "react";
import { createURQLClient } from "../cache/client";
import FormInput from "../components/FormInput";
import SingleFormPage from "../components/general/SingleFormPage";
import { useForgotPasswordMutation } from "../generated/graphql";
import { isValidEmail } from "../utils/isValidEmail";

interface ForgotPasswordProps {}

const ForgotPasswordForm = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();

  const [body, setBody] = useState<JSX.Element | null>(null);

  return (
    <Flex direction="column" gap={4} mt={6}>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          if (!isValidEmail(values.email)) {
            setErrors({
              email: "Invlid Email. Please enter a valid Email!",
            });
          } else {
            const resposnse = await forgotPassword(values);
            if (resposnse.data?.forgotPassword === false) {
              setErrors({
                email: "Invlid Email. Please enter a valid Email!",
              });
            } else {
              setBody(
                <Text color="white" textAlign="center">
                  An Email has been sent to {values.email}. Please verify to
                  further continue.
                </Text>
              );
            }
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <FormInput name="email" label="Email" />

              {!body && (
                <Flex w="100%" justify="flex-end">
                  <Button
                    mt={7}
                    type="submit"
                    isLoading={isSubmitting}
                    variant="solid"
                    colorScheme="blue"
                  >
                    Next
                  </Button>
                </Flex>
              )}
            </Form>
          );
        }}
      </Formik>
      <Box mt={7}>{body}</Box>
    </Flex>
  );
};

const ForgotPassword: FC<ForgotPasswordProps> = () => {
  return (
    <>
      <Head>
        <title>Bubble. | Forgot Password</title>
      </Head>
      <SingleFormPage
        title="Forgot Password"
        description={
          "Enter your registered Email to continue. An email will be sent, and the password can be changed using the link provided"
        }
        form={<ForgotPasswordForm />}
      />
    </>
  );
};

export default withUrqlClient(createURQLClient)(ForgotPassword);
