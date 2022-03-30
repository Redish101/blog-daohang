import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='root'>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
