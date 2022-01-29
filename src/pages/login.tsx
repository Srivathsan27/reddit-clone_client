import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { FC } from "react";
import { createURQLClient } from "../cache/client";
import SingleFormPage from "../components/general/SingleFormPage";
import LoginForm from "../components/login/LoginForm";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Bubble. | Login</title>
      </Head>
      <SingleFormPage
        form={<LoginForm />}
        title="Login"
        description="Enter your credentials to Login"
      />
    </>
  );
};

export default withUrqlClient(createURQLClient)(Login);
