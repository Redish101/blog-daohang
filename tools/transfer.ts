import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { Blog, getDomain, shouldString } from '../utils';

(async function () {
  const dataPath = path.join(path.resolve("."), "db", "data.json");
    
  const _blogs = JSON.parse((await fs.readFileSync(dataPath)).toString("utf8"));
  var set: { [key: string]: number | undefined } = {};
  var tagSet = new Set < string > ();
  var idx = 1;

  var blogs: Blog[] = [];
  for (const blog of _blogs) {
    const domain = getDomain(blog.url);
    const curBlog = {
      id: shouldString(blog.id, uuid()),
      idx: idx++,
      name: blog.name,
      url: blog.url,
      tags: !!blog.tags ? blog.tags : !!blog.tag ? blog.tag.toLowerCase().split(",") : [],
      sign: shouldString(blog.sign, ""),
      feed: shouldString(blog.feed, ""),
      status: `${blog.status}`,
      repeat: false,
      enabled: !!blog.enabled
    };

    for (const tag of curBlog.tags) {
      tagSet.add(tag);
    }

    if (typeof set[domain] === "undefined") {
      // 该域名不存在
      set[domain] = _blogs.length;
      blogs.push(curBlog);
    } else {
      // 该域名已经存在
      // 在第一次出现的位置添加重复标记
      blogs.push({
        ...curBlog,
        repeat: true,
      });
    }
  }
    
  await fs.writeFileSync(dataPath, JSON.stringify(blogs, undefined, 2));
})();