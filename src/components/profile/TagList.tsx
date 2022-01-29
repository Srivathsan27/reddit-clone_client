import { StackDivider, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { TaggedUser } from "../../generated/graphql";
import TagItem from "./TagItem";

interface TagListProps {
  users: TaggedUser[];
}

const TagList: FC<TagListProps> = ({ users }) => {
  return (
    <VStack
      mt={8}
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      {users.map((user) => (
        <TagItem user={user} key={user.id} />
      ))}
    </VStack>
  );
};

export default TagList;
