import { withUrqlClient } from "next-urql";
import { Head } from "next/document";
import { FC } from "react";
import { createURQLClient } from "../cache/client";
import SingleFormPage from "../components/general/SingleFormPage";
import RegisterForm from "../components/register/RegisterForm";

interface RegisterProps {}

const Register: FC<RegisterProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Bubble. | Register</title>
      </Head>
      <SingleFormPage
        form={<RegisterForm />}
        title="Register"
        description="Create your new Bubble. account today"
      />
    </>
  );
};

export default withUrqlClient(createURQLClient)(Register);
