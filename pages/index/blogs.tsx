const pageSize = 10;

export function Blogs() {
  // const { initial } = props;
  // const [cache, setCache] = React.useState({} as { [key: string]: Blog[] });
  // const [blogs, setBlogs] = React.useState(initial || false);
  // const [loading, setLoading] = React.useState(false);
  // const [query, setQuery] = useQuery({ page: '1', tags: '', search: '' });
  // const getPage = React.useCallback(() => {
  //   setLoading(true);
  //   const search = shouldString(query.search);
  //   const page = shouldNumber(query.page, 1);
  //   const tagsString = shouldString(query.tags);
  //   const tags = tagsString.split(',');
  //   const params = {
  //     search,
  //     tags,
  //     offset: (page - 1) * pageSize,
  //     size: pageSize,
  //   };
  //   const key = JSON.stringify(params);
  //   if (!!cache[key] && cache[key].length > 0) {
  //     setBlogs(cache[key]);
  //   } else {
  //     setLoading(true);
  //   }
  //   getBlogs(params)
  //     .then((res) => {
  //       if (showNotification(res) && !!res.data) {
  //         const _blogs = res.data;
  //         setBlogs(_blogs);
  //         // 更新缓存
  //         setCache({ ...cache, [key]: _blogs });
  //       }
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [cache, query, setBlogs, setLoading]);
}
