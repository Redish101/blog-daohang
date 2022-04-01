import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='root'>
      <Head>
        <title>中文博客列表导航-尝试链接几乎所有的中文博客</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
