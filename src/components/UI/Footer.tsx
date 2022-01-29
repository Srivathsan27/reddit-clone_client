import {
  Box,
  Flex,
  Heading,
  HStack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <Flex
      w="100%"
      bg="linear-gradient(to top, #456eae, #4572b3, #4676b8, #467abc, #467ec1)"
      boxShadow="0px -3px 10px 1px rgba(106,170,209,0.55)"
      color="white"
      h="25vh"
      //   position="fixed"
      bottom={0}
    >
      <HStack
        divider={<StackDivider borderColor="whiteAlpha.500" />}
        spacing={10}
        align="center"
        justify="space-evenly"
      >
        <Box ml={20} mb="auto" mt={"auto"}>
          <Text p={4}>
            Contact Us: <br /> +948572981309
          </Text>
        </Box>

        <Box mb="auto" mt={"auto"}>
          <Text p={4}>
            Email: <br /> somethingfishy@automation.com
          </Text>
        </Box>
      </HStack>
      <Box ml="auto" mr={12} mt="auto" mb="auto">
        <Heading size="2xl">Bubble.</Heading>
        <Text fontSize="md">Website Design by Srivathsan</Text>
      </Box>
    </Flex>
  );
};

export default Footer;
