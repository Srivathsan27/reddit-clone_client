import { Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC } from "react";
import { useRegisterMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import FormInput from "../FormInput";

interface RegisterFormProps {}

const RegisterForm: FC<RegisterFormProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        "confirm-password": "",
        email: "",
      }}
      onSubmit={async (
        { username, password, "confirm-password": conpas, email },
        { setErrors }
      ) => {
        if (conpas !== password) {
          setErrors({
            "confirm-password": "Passwords do not match",
            password: "Passwords do not match",
          });
        } else {
          const response = await register({ username, password, email });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else {
            if (response.data?.register.user) {
              router.push("/");
            }
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormInput name="username" label="Username" />
          <FormInput
            name="email"
            label="Email"
            boxProps={{
              mt: 4,
            }}
            type="email"
          />
          <FormInput
            boxProps={{
              mt: 4,
            }}
            name="password"
            label="Password"
            type="password"
          />

          <FormInput
            name="confirm-password"
            label="Confirm Password"
            boxProps={{
              mt: 4,
            }}
            type="password"
          />
          <Flex w="100%" justifyContent="center">
            <Button
              type="submit"
              mt={10}
              colorScheme="blue"
              variant="solid"
              isLoading={isSubmitting}
              justifySelf="center"
            >
              Register
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
