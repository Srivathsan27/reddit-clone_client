import { Flex, Heading, Skeleton } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { FC } from "react";
import { createURQLClient } from "../cache/client";
import CommentList from "../components/commnets/CommentList";
import Card from "../components/UI/Card";
import Wrapper from "../components/UI/Wrapper";
import { useMeQuery, useMyCommentsQuery } from "../generated/graphql";

interface MyCommentsProps {}

const MyComments: FC<MyCommentsProps> = ({}) => {
  const [{ data: userData, fetching: userFetching }] = useMeQuery();
  const [{ data: commentData, fetching: commentFetching }] =
    useMyCommentsQuery();

  return (
    <>
      <Head>
        <title>Bubble. | My Comments</title>
      </Head>
      <Flex pt={12} pb={12} minH="85vh">
        <Wrapper type="medium">
          <Skeleton
            minH={"50vh"}
            minW={"40vw"}
            isLoaded={!userFetching && !commentFetching}
          >
            {!userFetching && !commentFetching && (
              <Card>
                <Heading size="lg" pl={5} pt={6}>
                  My Comments
                </Heading>
                <CommentList
                  comments={commentData?.myComments as any[]}
                  user={userData}
                />
              </Card>
            )}
          </Skeleton>
        </Wrapper>
      </Flex>
    </>
  );
};

export default withUrqlClient(createURQLClient)(MyComments);
