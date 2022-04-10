import React from "react";
import { Typography } from "antd";

import { Flex } from "@/components/flex";
import { getRandomBlogs } from "@/utils/api";
import { Card, Loading } from "@/components/antd";
import { Blog, showNotification } from "@/utils";

import styles from "@/styles/go.module.css";

const DefaultWaitTimeInSecond = 10;

export default function Go() {
  const blogRef = React.useRef<Blog>();
  const [blog, setBlog] = React.useState<Blog | undefined>(undefined);
  React.useEffect(() => {
    getRandomBlogs({ n: 1 }).then((result) => {
      if (showNotification(result) && !!result.data && result.data.length > 0) {
        setBlog(result.data[0]);
        blogRef.current = result.data[0];
      }
    });
  }, []);

  const [ts, setTs] = React.useState(DefaultWaitTimeInSecond);
  const tsRef = React.useRef<number>(ts);
  const timeoutIdRef = React.useRef<NodeJS.Timeout>();
  const minute1s = React.useCallback(() => {
    timeoutIdRef.current = setTimeout(() => {
      if (tsRef.current >= 0) {
        tsRef.current--;
        setTs(tsRef.current);
        minute1s();
      } else {
        if (!!blogRef.current && !!blogRef.current.url) {
          window.location.href = blogRef.current?.url;
        }
      }
    }, 1000);
  }, [tsRef, setTs]);

  React.useEffect(() => {
    minute1s();
    
    return () => {
      if (!!timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      };
    };
  }, [minute1s]);

  return (
    <Flex direction="TB" mainAxis="center" fullWidth className={styles.wrapper}>
      <Card className={styles.card} shadow>
        {!!blog ? (
          <div>
            <Typography.Paragraph>
              正在前往 <a href={blog.url}>{`${blog.name} (${blog.url})`}</a>
            </Typography.Paragraph>
            <Typography.Paragraph>{ts} 秒后自动跳转</Typography.Paragraph>
          </div>
        ) : (
          <div>
            <Loading />
            <Typography.Paragraph>正在选择博客</Typography.Paragraph>
          </div>
        )}
      </Card>
      ;
    </Flex>
  );
}
