import Layout from "@/app/components/layout";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Questionnaire Management System</title>
        <meta name="description" content="Manage and respond to questionnaires easily." />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
