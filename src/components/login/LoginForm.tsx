import { Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { FC } from "react";
import { toErrorMap } from "../../utils/toErrorMap";
import FormInput from "../FormInput";
import { useRouter } from "next/router";
import { useLoginMutation } from "../../generated/graphql";

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
  const router = useRouter();

  const [_, login] = useLoginMutation();

  const forgotPasswordHandler = () => {
    router.push("/forgot-password");
  };
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={async (values, { setErrors }) => {
        if (values.username.trim() === "" || values.password.trim() === "") {
          setErrors({
            username:
              values.username.trim() === ""
                ? "This Field must not be empty!"
                : undefined,
            password:
              values.password.trim() === ""
                ? "This Field must not be empty!"
                : undefined,
          });
        } else {
          const resposnse = await login(values);

          if (resposnse.data?.login.errors) {
            setErrors(toErrorMap(resposnse.data.login.errors));
          } else {
            const path: string =
              typeof router.query.next === "string" ? router.query.next : "/";
            router.replace(path);
          }
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form>
            <FormInput name="username" label="Username" />
            <FormInput
              name="password"
              label="Password"
              type="password"
              boxProps={{
                mt: 4,
              }}
            />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              boxSizing="border-box"
              padding={2}
            >
              <Button
                mt={4}
                type="button"
                variant="link"
                colorScheme="blue"
                onClick={forgotPasswordHandler}
              >
                Forgot Password?
              </Button>

              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variant="solid"
                colorScheme="blue"
              >
                Login
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
