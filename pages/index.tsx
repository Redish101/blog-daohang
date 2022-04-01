import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import logo from '@/public/logo.jpg';
// import styles from '@/styles/Home.module.css';

import { PageHeader } from 'antd';

import { Tabs, Tab } from '@/components/antd';

import { RandomBlogs } from './index/random';
import { AboutTab } from './index/about';
import { getBlogs, getBlogCount } from '@/utils/api';
import {
  useQuery,
  Blog,
  Combine,
  ComponentProps,
  shouldString,
  shouldNumber,
  showNotification,
} from '@/utils';
import { isServer } from '@/utils/env';
import { Blogs } from './index/blogs';

const Home: NextPage<{
  inititalQuery: { [key: string]: string | string[] };
}> = (props) => {
  const { inititalQuery } = props;
  const [query, setQuery] = useQuery({ tab: 'random', ...inititalQuery });
  const { tab } = query;
  const tabs: Tab<any>[] = React.useMemo(
    () =>
      [
        {
          key: 'random',
          tab: '随机博客推荐',
          render: (_, blogs) => <RandomBlogs />,
        },
        {
          key: 'blog_list',
          tab: '博客列表',
          render: (_, blogs) => <Blogs />,
        },
        { key: 'about', tab: '关于', render: (_, blogs) => <AboutTab /> },
      ] as Tab[],
    []
  );

  return (
    <div>
      <PageHeader
        title='中文博客列表导航项目'
        subTitle='尝试链接几乎所有的中文博客'
        avatar={{ src: '/logo.jpg' }}
      ></PageHeader>
      <Tabs<any>
        tabs={tabs}
        activeKey={shouldString(tab, 'random')}
        onChange={(tab) => setQuery({ ...query, tab })}
      />
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  console.log(ctx.query);
  return {
    inititalQuery: ctx.query as { [key: string]: string | string[] },
  };
};

export default Home;
