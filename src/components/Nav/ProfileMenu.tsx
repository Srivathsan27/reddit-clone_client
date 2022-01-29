import {
  Avatar,
  Button,
  CloseButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Router from "next/router";
import { FC } from "react";

interface ProfileProps {
  username: string | null;
  userId: number | null;
}

const ProfileMenu: FC<ProfileProps> = ({ username, userId }) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton isActive={isOpen} as={Button} mr={3} bg="transparent">
            {!isOpen ? (
              <Avatar
                name={username as string}
                size="sm"
                bg="green.300"
                color="blue.700"
              />
            ) : (
              <CloseButton />
            )}
          </MenuButton>
          <MenuList>
            {username === null ? null : (
              <MenuItem textAlign="right" isDisabled>
                Hello {username}
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                Router.push(`/users/${userId}`);
              }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={() => Router.push("/my-posts")}>
              My Posts
            </MenuItem>
            <MenuItem onClick={() => Router.push("/my-comments")}>
              My Comments
            </MenuItem>
            <MenuItem onClick={() => Router.push("/reset-password")}>
              Reset Password
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default ProfileMenu;
