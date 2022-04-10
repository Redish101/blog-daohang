import "@/styles/globals.css";

import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import Head from "next/head";
import Layout from "@/components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="root">
      <Head>
        <title>中文博客列表导航-尝试链接几乎所有的中文博客</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
