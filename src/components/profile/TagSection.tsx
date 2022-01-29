import { Skeleton, Text } from "@chakra-ui/react";
import { FC } from "react";
import { TaggedUser, useTaggedUsersQuery } from "../../generated/graphql";
import TagList from "./TagList";

interface TagSectionProps {
  userId: number;
}

const TagSection: FC<TagSectionProps> = ({ userId }) => {
  const [{ data, error, fetching }] = useTaggedUsersQuery({
    variables: {
      id: userId,
    },
  });

  if (!fetching && (error || data?.tagged.error)) {
    console.log("error: ", error);
    console.log("tagged error: ", data?.tagged.error);
  }

  const users = data?.tagged.taggedUsers as TaggedUser[];

  console.log(users);

  return (
    <Skeleton minH="25vh" minW="40vw" isLoaded={!fetching}>
      {!fetching && <TagList users={users} />}
    </Skeleton>
  );
};

export default TagSection;
