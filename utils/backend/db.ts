/**
 * 该文件只允许在服务端引入
 */

import Datastore from 'nedb'
import { shouldString } from '..';
import { Blog, Result } from '../types'
import { blogs as _blogs } from './data'

// nedb 数据库
// const db = new Datastore({ filename: 'todo.db', autoload: true });
const blogs = (() => {
    const domainExtract = RegExp('https{0,1}://([-a-zA-Z0-9.]+)/{0,1}.*');
    var set: { [key: string]: number | undefined } = {};
    var idx = 1;

    var blogs: Blog[] = [];
    for (const blog of _blogs) {
        const domainResult = domainExtract.exec(blog.url);
        const domain = !!domainResult && domainResult.length > 0 ? domainResult[1] : blog.url;
        if (typeof set[domain] === 'undefined') {
            // 该域名不存在
            set[domain] = _blogs.length;
            blogs.push({
                id: idx++,
                name: blog.name,
                url: blog.url,
                tags: !!blog.tag ? blog.tag.toLowerCase().split(",") : [],
                sign: shouldString(blog.sign, ''),
                feed: shouldString(blog.feed, ''),
                status: `${blog.status}`,
            });
        } else {
            // 该域名已经存在
            // 在第一次出现的位置添加重复标记
            // _blogs.push({ ...blog, repeat: true, domain });
        }
    }

    return blogs
})()



/**
 * 获取博客总数
 * @returns 博客总数
 */
async function getBlogCount(params: { search: string, tags: string[] }): Promise<Result<number>> {
    return new Promise(async (resolve) => {
        const result = await getBlogs(params)
        resolve({
            success: true,
            data: result.data?.length,
        })
    })
}


/**
 * 获取博客数据
 * @param search 筛选关键字
 * @param tags 筛选标签
 * @param offset 偏移量
 * @param size 返回数目（-1 全量返回）
 * @returns 博客数据
 */
async function getBlogs(params: { search?: string, tags?: string[], offset?: number, size?: number }): Promise<Result<Blog[]>> {

    return new Promise((resolve) => {
        var { search, tags, offset, size } = params
        var ret = [...blogs];
        if (!!search) ret.filter(blog => blog.name.toLowerCase().indexOf(search as string) !== -1 || blog.url.toLowerCase().indexOf(search as string) !== -1);
        if (!!tags && tags.length > 0) ret.filter(blog => tags?.filter((tag) => blog.tags.indexOf(tag) != -1).length === tags?.length);
        if (typeof offset === "number") ret = ret.slice(offset)
        if (typeof size === 'number' && size > 0) ret = ret.slice(0, size);
        resolve({
            success: true,
            data: ret
        })
    })
}

/**
 * 修改 id 为 @id 的博客数据
 * @param id 博客 ID
 * @param blog 新博客数据
 * @returns 返回修改结果
 */
async function updateBlogs(params: { id: string, blog: Blog }): Promise<Result> {
    return { success: false, message: '未实现该功能', }
}

/**
 * 插入一条新的博客数据
 * @param blog 博客数据
 * @returns 返回插入结果
 */
async function addBlogs(params: { blog: Blog }): Promise<Result<Blog>> {
    return { success: false, message: '未实现该功能', }
}

/**
 * 删除 id 为 @id 博客
 * @param id 博客 ID
 * @returns 返回删除结果
 */
async function deleteBlogs(params: { id: string }): Promise<Result<Blog>> {
    return { success: false, message: '未实现该功能', }
}

export default exports = {
    // db,
    getBlogCount,
    getBlogs,
    updateBlogs,
    addBlogs,
    deleteBlogs,
}