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

          {/* <link href='/boot.css' rel='stylesheet' type='text/css' />
          <link href='/homepage.css' rel='stylesheet' type='text/css' /> */}

          <script
            type='text/javascript'
            src='/boot.js'
            async
            charSet='UTF-8'
          ></script>

          {/* <title>中文博客列表导航-尝试链接几乎所有的中文博客</title> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
