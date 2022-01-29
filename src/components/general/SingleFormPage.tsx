import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import Wrapper from "../UI/Wrapper";

interface SingleFormPageProps {
  form: JSX.Element;
  title: string;
  description: string;
}

const SingleFormPage: FC<SingleFormPageProps> = ({
  form,
  title,
  description,
}) => {
  return (
    <Wrapper type="small">
      <Flex align="center" h="100%" minH={"85vh"} width="100%" pb={12}>
        <Box w="100%">
          <Flex
            pt="10%"
            align="center"
            justify="center"
            direction="column"
            gap={8}
            pb={8}
          >
            <Heading size="xl" color="white">
              Bubble.
            </Heading>
            <Box>
              <Heading textAlign="center" color="white" size="md">
                {title}
              </Heading>
              <Text mt={3} color="white" textAlign="center">
                {description}
              </Text>
            </Box>
          </Flex>
          {form}
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default SingleFormPage;
