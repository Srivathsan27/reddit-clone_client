import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="icon"
            type="image/svg+xml"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23336bd7%22></rect><path fill=%22%23fff%22 d=%22M54.57 81.99L24.25 81.99L24.25 76.46L31.41 75.22L31.41 24.82L24.25 23.59L24.25 18.01L31.41 18.01L51.85 18.01Q61.87 18.01 67.51 22.34Q73.16 26.67 73.16 35.32L73.16 35.32Q73.16 39.58 70.46 42.95Q67.75 46.31 63.32 47.93L63.32 47.93Q67.18 48.73 69.95 51.03Q72.72 53.34 74.24 56.66Q75.75 59.98 75.75 63.93L75.75 63.93Q75.75 72.72 70.04 77.36Q64.33 81.99 54.57 81.99L54.57 81.99ZM40.07 51.98L40.07 75.22L54.57 75.22Q60.50 75.22 63.78 72.30Q67.05 69.38 67.05 64.02L67.05 64.02Q67.05 60.24 65.84 57.56Q64.63 54.88 62.15 53.43Q59.67 51.98 55.89 51.98L55.89 51.98L40.07 51.98ZM40.07 24.82L40.07 45.21L54.09 45.21Q58.75 45.21 61.62 42.51Q64.50 39.80 64.50 35.15L64.50 35.15Q64.50 29.96 61.25 27.39Q58.00 24.82 51.85 24.82L51.85 24.82L40.07 24.82Z%22></path></svg>"
          />
          <meta
            name="description"
            content="Bubble, the one place you feel like home. You dont need to step out of your Comfort zone!"
          />
          <meta name="keywords" content="bubble pop stay home freinds" />
          <meta name="author" content="Srivathsan" />
        </Head>

        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
