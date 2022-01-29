import { Flex, Skeleton, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { createURQLClient } from "../../cache/client";
import UserProfile from "../../components/profile/UserProfile";
import Wrapper from "../../components/UI/Wrapper";
import { useGetProfileQuery, useMeQuery } from "../../generated/graphql";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { isServer } from "../../utils/isServer";

interface UserProfilePageProps {
  id: string;
}

const UserProfilePage: NextPage<UserProfilePageProps> = ({ id }) => {
  if (!isServer()) {
    useIsAuth("/users/" + id);
  }

  const [{ data, fetching, error }] = useGetProfileQuery({
    variables: {
      id: +id,
    },
  });

  if (error || data?.profile.errors) {
    console.log("resp err: ", error);
    console.log("error:", data?.profile.errors);
  }

  return (
    <>
      <Head>
        <title>Bubble. | {data?.profile.user?.username}</title>
      </Head>
      <Flex minH="85vh" align="center" justify="center">
        {data?.profile.user && (
          <Wrapper>
            <Skeleton isLoaded={!fetching} h="100%" w="100%">
              {!fetching && <UserProfile user={data.profile.user} />}
            </Skeleton>
          </Wrapper>
        )}
      </Flex>
    </>
  );
};

UserProfilePage.getInitialProps = async (ctx) => {
  return {
    id: ctx.query.id ? (ctx.query.id as string) : "",
  };
};

export default withUrqlClient(createURQLClient, { ssr: true })(UserProfilePage);
