import { Box, ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { createURQLClient } from "../cache/client";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/UI/Footer";
import { useMeQuery } from "../generated/graphql";

import theme from "../theme";
import { isServer } from "../utils/isServer";

function MyApp({ Component, pageProps }) {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let nav: JSX.Element = <></>;

  if (fetching || !data?.me) {
    nav = <Navbar />;
  } else {
    nav = (
      <Navbar
        isLoggedIn={true}
        username={data.me.username}
        userId={data.me.id}
      />
    );
  }

  return (
    <>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          {nav}
          <Box
            bg="linear-gradient(to right bottom, #1A2746, #171F3B, #171D3A, #171A36, #131330)"
            minH="100vh"
          >
            <Component {...pageProps} />
            <Footer />
          </Box>
        </ColorModeProvider>
      </ChakraProvider>
    </>
  );
}

export default withUrqlClient(createURQLClient)(MyApp);
