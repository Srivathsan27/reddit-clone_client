import { Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
import { createURQLClient } from "../../cache/client";
import CommentSection from "../../components/commnets/CommentSection";
import CommentList from "../../components/commnets/CommentSection";
import HitSection from "../../components/post/HitSection";
import PostOptions from "../../components/post/postOptions";
import Card from "../../components/UI/Card";
import Wrapper from "../../components/UI/Wrapper";
import { usePostQuery } from "../../generated/graphql";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { isServer } from "../../utils/isServer";

interface PostProps {}
const Post: FC<PostProps> = ({}) => {
  const router = useRouter();

  if (!isServer()) useIsAuth("/post/" + router.query.id);

  let header: JSX.Element | null = null;
  const [{ data, fetching, error }] = usePostQuery({
    variables: {
      id: +(router.query?.id as string),
    },
  });

  if (!data) {
    if (error) {
      console.log(error);
      header = (
        <Text color="red.200" textAlign="center">
          Oops, Could not fetch post
        </Text>
      );
    } else {
      header = (
        <Text color="red.200" textAlign="center">
          Loading...
        </Text>
      );
    }
  } else if (data.post.errors) {
    header = (
      <Text color="red.200" textAlign="center">
        Could not fetch Post Does not exist!
      </Text>
    );
  }
  return (
    <>
      <Head>
        <title>Bubble. | {data?.post.post?.title}</title>
      </Head>
      <Wrapper type="medium">
        <Flex
          // bg="linear-gradient(to right bottom, #1A2746, #171F3B, #171D3A, #171A36, #131330)"
          pt="15%"
          pb="15%"
          gap={15}
          direction="column"
        >
          <Skeleton minH="50vh" isLoaded={!fetching}>
            <Card>
              {!!header && header}
              {!header && (
                <Flex minW="40vw" h="fit-content">
                  <HitSection
                    numberOfComments={
                      data?.post.post?.comments.length as number
                    }
                    hits={data?.post.post?.numberOfHits as number}
                    postId={data?.post.post?.id as number}
                    hitStatus={data?.post.post?.hitStatus as number}
                  />
                  <Flex flex={1} direction="column" justify="space-between">
                    <Heading as="h2" size="lg" p={4} pb={1}>
                      {data?.post.post?.title}
                    </Heading>
                    <Text mt={0.4} p={4} fontSize="sm">
                      Post by {data?.post?.post?.creator.username}
                    </Text>

                    <Text mt={5} pb={8} pl={4} fontSize="1.2em" width="94%">
                      {data?.post.post?.content}
                    </Text>

                    {data?.post.post?.isOwnPost && (
                      <PostOptions
                        postId={data.post.post.id}
                        title={data.post.post.title}
                        content={data.post.post.content}
                      />
                    )}
                  </Flex>
                </Flex>
              )}
            </Card>
          </Skeleton>

          <Skeleton minH={"30vh"} minW="20vw" isLoaded={!fetching}>
            <CommentSection
              comments={data?.post.post?.comments}
              postId={data?.post.post?.id as number}
            />
          </Skeleton>
        </Flex>
      </Wrapper>
    </>
  );
};

interface ViewPostProps {}

const ViewPost: FC<ViewPostProps> = ({}) => {
  return <Post />;
};

export default withUrqlClient(createURQLClient)(ViewPost);
