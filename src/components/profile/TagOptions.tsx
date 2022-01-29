import { CheckIcon } from "@chakra-ui/icons";
import { Flex, IconButton, useToast } from "@chakra-ui/react";
import { GroupAddOutlined } from "@mui/icons-material";
import { FC } from "react";
import {
  useTagUserMutation,
  useUntagUserMutation,
} from "../../generated/graphql";

interface TagOptionsProps {
  isTagged: boolean;
  userId: number;
  isOwnAccount?: boolean;
}

export const TagOptions: FC<TagOptionsProps> = ({
  userId,
  isTagged,
  isOwnAccount,
}) => {
  const [, tagUser] = useTagUserMutation();
  const [, untagUser] = useUntagUserMutation();

  const toast = useToast();

  if (isOwnAccount) {
    return null;
  }

  return (
    <>
      <Flex flex="0.08">
        {isTagged ? (
          <IconButton
            aria-label="remove-friend"
            icon={<CheckIcon color="green.100" />}
            onClick={async () => {
              const resp = await untagUser({
                friendId: userId,
              });
              if (resp.error || resp.data?.untagUser === false) {
                console.log(resp.error);
                console.log(resp.data?.untagUser);
                toast({
                  duration: 4000,
                  description: "Unable to untag the user!",
                  status: "error",
                  title: "Error",
                  isClosable: true,
                  position: "bottom-left",
                  variant: "solid",
                });
              } else {
                toast({
                  duration: 4000,
                  description: "User untagged successfully!",
                  status: "success",
                  title: "User untagged",
                  isClosable: true,
                  position: "bottom-left",
                  variant: "solid",
                });
              }
            }}
          />
        ) : (
          <IconButton
            aria-label="add-friend"
            icon={<GroupAddOutlined color="action" />}
            onClick={async () => {
              const resp = await tagUser({
                friendId: userId,
              });
              if (resp.error || resp.data?.tagUser === false) {
                console.log(resp.error);
                console.log(resp.data?.tagUser);
                toast({
                  duration: 4000,
                  description: "Unable to tag the user!",
                  status: "error",
                  title: "Error",
                  isClosable: true,
                  position: "bottom-left",
                  variant: "solid",
                });
              } else {
                toast({
                  duration: 4000,
                  description: "User tagged successfully!",
                  status: "success",
                  title: "User tagged",
                  isClosable: true,
                  position: "bottom-left",
                  variant: "solid",
                });
              }
            }}
          />
        )}
      </Flex>
    </>
  );
};
