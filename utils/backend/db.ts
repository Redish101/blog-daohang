/**
 * 该文件只允许在服务端引入
 */

import path from "path";
import fs from 'fs';

import { Blog, Result, UserInfo } from "../types";
import { Database } from "./database";

const DB = new Database(path.join(path.resolve("."), "db", "data.json"));

var userMap: {[token:string]: UserInfo} = {};

(async () => {
  const { token } = JSON.parse((await fs.readFileSync(
    path.join(path.resolve("."), "db", "setting.json")
  )).toString("utf8"));
  userMap[token] = { name:"admin" } as UserInfo; 
})();


async function getUser(params: { token: string }): Promise<Result<UserInfo>> {
  const info = userMap[params.token];
  console.log(Object.keys(userMap));
  if (!!info) {
    return Promise.resolve({
      success: true,
      data: info,
    });
  }
  
  return Promise.resolve({
    success: false,
    message:"请重新登录"
  });
}

function setUser(params: { token: string, info: UserInfo }) {
  userMap[params.token] = params.info;
}

/**
 * 获取博客总数
 * @returns 博客总数
 */
async function getBlogCount(params: { search?: string, tags?: string[], all?:boolean }): Promise<Result<number>> {
  return new Promise(async (resolve) => {
    const result = await getBlogs(params);
    resolve({
      success: true,
      data: result.data?.length,
    });
  });
}

/**
 * 获取标签列表
 * @returns 标签列表
 */
async function getTags(params: {}): Promise<Result<string[]>> {
  return new Promise(async (resolve) => {

    resolve({
      success: true,
      data: DB.tags,
    });
  });
}


/**
 * 获取博客数据
 * @param search 筛选关键字
 * @param tags 筛选标签
 * @param offset 偏移量
 * @param size 返回数目（-1 全量返回）
 * @returns 博客数据
 */
async function getBlogs(params: { search?: string, tags?: string[], offset?: number, size?: number, all?:boolean}): Promise<Result<Blog[]>> {
  return new Promise((resolve) => {
    var { search, tags, offset, size, all=false } = params;
    var ret = [...DB.blogs];
    if (!all) {
      ret=ret.filter((blog) => blog.enabled);
    }
    if (!!search) {
      ret = ret.filter((blog) => blog.name.toLowerCase().indexOf(search as string) !== -1 || blog.url.toLowerCase().indexOf(search as string) !== -1);
    }
    if (!!tags && tags.length > 0) {
      ret = ret.filter((blog) => tags?.filter((tag) => blog.tags.indexOf(tag) !== -1).length === tags?.length);
    }
    if (typeof offset === "number") {
      ret = ret.slice(offset);
    };
    if (typeof size === "number" && size > 0) {
      ret = ret.slice(0, size);
    }
    resolve({
      success: true,
      data: ret
    });
  });
}

/**
 * 修改 id 为 @id 的博客数据
 * @param id 博客 ID
 * @param blog 新博客数据
 * @returns 返回修改结果
 */
async function updateBlog(params: { id: string, blog: Blog }): Promise<Result> {
  DB.blogs = DB.blogs.map((oldBlog) =>
    oldBlog.id === params.id ?
      {
        ...oldBlog,
        ...params.blog,
      } : {
        ...oldBlog
      });
  await DB.write();

  return { success: true, message: "修改成功", };
}

/**
 * 插入一条新的博客数据
 * @param blog 博客数据
 * @returns 返回插入结果
 */
async function addBlog(params: { blog: Blog }): Promise<Result<Blog>> {
  DB.blogs.push(params.blog);
  await DB.write();
  
  return { success: true, message: "添加成功", };
}

/**
 * 删除 id 为 @id 博客
 * @param id 博客 ID
 * @returns 返回删除结果
 */
async function deleteBlog(params: { id: string }): Promise<Result<Blog>> {
  DB.blogs = DB.blogs.filter((blog) => blog.id !== params.id);
  await DB.write();
  
  return { success: true, message: "删除成功", };
}

export default exports = {
  // db,
  getBlogCount,
  getBlogs,
  updateBlog,
  addBlog,
  deleteBlog,
  getTags,
  getUser,

  setUser,
};
