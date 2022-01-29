import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";

const Card: FC = ({ children }) => {
  return (
    <Box
      width="100%"
      bgColor="white"
      color="teal"
      padding={2}
      margin={"auto"}
      boxShadow="0px 4px 8px 0px rgba(3,15,2,0.3);"
      borderRadius={5}
      borderTop="5px solid teal"

      // borderTop="5px solid teal"
    >
      {children}
    </Box>
  );
};

export default Card;
