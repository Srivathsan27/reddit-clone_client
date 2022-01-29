import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useLogoutMutation } from "../../generated/graphql";
import ProfileMenu from "./ProfileMenu";

interface NavbarProps {
  isLoggedIn?: boolean;
  username?: string;
  userId?: number;
}

const Title = () => {
  return (
    <NextLink href="/">
      <Link>
        <Heading cursor="pointer" ml={4} size="3xl" mb={3}>
          Bubble.
        </Heading>
      </Link>
    </NextLink>
  );
};

const Navbar: FC<NavbarProps> = ({ isLoggedIn, username, userId }) => {
  let bodyRight: any = null;
  let bodyLeft: any = null;
  const [{ fetching }, logout] = useLogoutMutation();
  const router = useRouter();

  const logoutHandler = async () => {
    const response = await logout();
    if (response.error || !response.data?.logout) {
    } else {
      console.log("success");
      router.replace("/");
    }
  };

  if (isLoggedIn) {
    bodyLeft = (
      <Flex align="center" gap={5}>
        <Title />
        <NextLink href="/create-post">
          <Button variant="outline" colorScheme="black" isLoading={fetching}>
            Post +
          </Button>
        </NextLink>
      </Flex>
    );
    bodyRight = (
      <Flex ml="auto" gap={5} alignItems="center" justifyContent="space-evenly">
        <Button
          onClick={logoutHandler}
          variant="outline"
          colorScheme="black "
          isLoading={fetching}
        >
          Logout
        </Button>
        <NextLink href="/reset-password">
          <ProfileMenu
            username={username ? username : null}
            userId={userId ? userId : null}
          />
        </NextLink>
      </Flex>
    );
  } else {
    bodyLeft = <Title />;
    bodyRight = (
      <Flex ml="auto" gap={5} pr={4}>
        <NextLink href="/login">
          <Link fontSize="lg">Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link fontSize="lg">Register</Link>
        </NextLink>
      </Flex>
    );
  }

  return (
    <Flex
      padding={4}
      bg="linear-gradient(to right top, #283B6B, #2E4781, #335094, #3655a0, #3f63bd)"
      alignItems="center"
      justifyContent="space-between"
      position={"sticky"}
      top={0}
      color="white"
      zIndex={10}
      boxShadow="0px 6px 16px 0px #0D478A85"
      minH="90px"
    >
      {bodyLeft}
      {bodyRight}
    </Flex>
  );
};

export default Navbar;
