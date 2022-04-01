import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet='utf-8' />

          <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
          <meta httpEquiv='Cache-Control' content='no-siteapp' />
          <meta httpEquiv='Cache-Control' content='no-transform' />

          <link rel='canonical' href='https://zhblogs.ohyee.cc/' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
