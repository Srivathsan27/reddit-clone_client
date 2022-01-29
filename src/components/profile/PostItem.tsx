import { Flex, Box, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";
import { Post } from "../../generated/graphql";
import { UserPost } from "../../types/userPost";
import HitSection from "../post/HitSection";

interface PostItemProps {
  post: UserPost;
}

const PostItem: FC<PostItemProps> = ({
  post: {
    id,
    hitStatus,
    numberOfComments,
    numberOfHits: hits,
    title,
    createdAt: uploadedAt,
    contentSnip: content,
    creator: { username: creator },
  },
}) => {
  return (
    <Flex gap={3} alignItems="flex-start">
      <HitSection
        postId={id}
        hitStatus={hitStatus}
        hits={hits}
        numberOfComments={numberOfComments}
      />
      <Box flex={0.88} pb={3}>
        <NextLink href={`/post/${id}`}>
          <Link>
            <Heading as="h2" size="lg" p={3} pb={1}>
              {title}
            </Heading>
          </Link>
        </NextLink>
        <Text mt={0.4} p={3} fontSize="sm">
          Post by {creator}. Uploaded at {new Date(+uploadedAt).toUTCString()}
        </Text>

        <Text mt={5} pb={8} pl={3} fontSize="1.2em" width="94%">
          {content + (content.length === 80 ? "..." : "")}
        </Text>
      </Box>
    </Flex>
  );
};

export default PostItem;
