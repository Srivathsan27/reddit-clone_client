import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { ProfileType } from "../../types/profileType";
import PostsComments from "./posts-comments";
import UserBio from "./UserBio";

interface UserProfileProps {
  user: ProfileType;
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return (
    <Flex gap={12} direction="column" align="center" justify="center" p="50px">
      <UserBio user={user} />
      <PostsComments userId={user.id} username={user.username} />
    </Flex>
  );
};

export default UserProfile;
