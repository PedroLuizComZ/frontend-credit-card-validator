import { store } from "@/store/store";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Credit Card Validador</title>
        <meta name="description" content="Validade Credit Cards" />
      </Head>
      <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </>
  );
}
