import { Avatar, Flex, Link, Text } from "@chakra-ui/react";
import { FC } from "react";
import { TaggedUser } from "../../generated/graphql";
import { TagOptions } from "./TagOptions";
import Router from "next/router";

interface TagItemProps {
  user: TaggedUser;
}

const TagItem: FC<TagItemProps> = ({ user }) => {
  return (
    <Flex gap={4} align="center">
      <Flex flex="0.3" align="center" justify="center">
        <Avatar
          size="md"
          name={user.username}
          bg="green.300"
          color="blue.700"
        ></Avatar>
      </Flex>
      <Flex flex="0.6">
        <Link fontSize="lg" onClick={() => Router.push("/users/" + user.id)}>
          {user.isOwnAccount ? "You" : user.username}
        </Link>
      </Flex>
      <TagOptions
        isTagged={user.isTagged}
        userId={user.id}
        isOwnAccount={user.isOwnAccount}
      />
    </Flex>
  );
};

export default TagItem;
