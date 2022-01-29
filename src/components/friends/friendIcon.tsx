import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { FC } from "react";

interface FriendIconProps {}
// sample profile image with online/offline status!
const FriendIcon: FC<FriendIconProps> = ({}) => {
  return (
    <Avatar>
      <AvatarBadge boxSize="1.25em" bg="green.500" />
    </Avatar>
  );
};

export default FriendIcon;
