import "../styles/globals.css";
import Layout from "../Components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
// import ContextProvider from "../utils/Context/Context";
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout>
        {/* <ContextProvider> */}
          <Component {...pageProps} />
        {/* </ContextProvider> */}
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
