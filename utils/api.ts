import { isDevelopment } from "./env";
import { Result, Blog } from "./types";

const backendURL = isDevelopment() ? "http://localhost:3000" : "";
const apiPrefix = "/api/"
const apiPath = backendURL.replace(/\/*$/g, "") + apiPrefix;

/**
 * 替换参数到 path 中
 * 如 使用 `{ "id" : 1, "name": "a" }` 替换 `/api/blog/:id` 将返回 `/api/blog/1` 与 `{ "name": "a" }`
 * @returns 返回替换后的 path 及剩余的参数
 */
export function replaceParams<T extends { [key: string]: any }>(path: string, params: T): { path: string, params: Partial<T> } {
    var finalPath = path;
    var p = { ...params };

    if (!!params) {
        Object.keys(params).map(key => {
            if (params[key] === undefined || params[key] === null) {
                delete p[key]
            } else {
                const varKey = `:${key}`;
                if (finalPath.indexOf(varKey) !== -1) {
                    finalPath = finalPath.replace(`:${key}`, params[key]);
                    delete p[key];
                }
            }
        })
    }
    return {
        path: finalPath,
        params: p,
    }
}

/**
 * 生成 Query 字段
 * @param params 参数
 * @return 返回生成的 Query 字段
 */
export function makeQuery(query: { [key: string]: number | string | string[] }): string {
    return !!query ? Object.keys(query).map(key => {
        const k = encodeURIComponent(key)
        const value = query[key];
        const v = encodeURIComponent(Array.isArray(value) ? value.join(",") : value)
        return `${k}=${v}`
    }).join('&') : '';
}

export async function sendRequest<T, U>(method: "get" | "post" | "put" | "delete", path: string, params: Partial<T>): Promise<Result<U>> {
    ({ path, params } = replaceParams(path, params));
    if (method === "get") {
        path = `${path}?${makeQuery(params as unknown as { [key: string]: number | string })}`;
    }
    try {
        console.log(`${apiPath.replace(/\/*$/g, "")}/${path.replace(/^\/*/g, "")}`)
        const resp = await fetch(`${apiPath.replace(/\/*$/g, "")}/${path.replace(/^\/*/g, "")}`, {
            method,
            body: method !== "get" ? JSON.stringify(params) : undefined,
        })
        const result: Result<U> = await resp.json()
        return result
    } catch (err: any) {
        return {
            success: false,
            message: err.message,
        }
    }

}


/**
 * 获取博客总数
 * @returns 博客总数
 */
export async function getBlogCount(params: { search?: string, tags?: string[] }): Promise<Result<number>> {
    return await sendRequest("get", "/blogs/count", {});
}


/**
 * 获取博客数据
 * @param search 筛选关键字
 * @param tags 筛选标签
 * @param offset 偏移量
 * @param size 返回数目（-1 全量返回）
 * @returns 博客数据
 */
export async function getBlogs(params: { search?: string, tags?: string[], offset?: number, size?: number }): Promise<Result<Blog[]>> {
    return await sendRequest("get", "/blogs", params);
}

/**
 * 修改 id 为 @id 的博客数据
 * @param id 博客 ID
 * @param blog 新博客数据
 * @returns 返回修改结果
 */
async function updateBlog(params: { id: string, blog: Blog }): Promise<Result> {
    return { success: true, message: '', }
}

/**
 * 插入一条新的博客数据
 * @param blog 博客数据
 * @returns 返回插入结果
 */
async function addBlog(params: { blog: Blog }): Promise<Result<Blog>> {
    const { blog } = params;

    return {
        success: true,
        message: '',
        data: { ...blog, id: 0 },
    }
}

/**
 * 删除 id 为 @id 博客
 * @param id 博客 ID
 * @returns 返回删除结果
 */
async function deleteBlog(params: { id: string }): Promise<Result<Blog>> {
    return sendRequest("delete", "/blogs/random", params);
}

/**
 * 获取随机 @n 个博客数据
 * @param search 筛选关键字
 * @param tags 筛选标签
 * @returns 博客数据
 */
export async function getRandomBlogs(params: { search?: string, tags?: string[], n?: number }): Promise<Result<Blog[]>> {
    return await sendRequest("get", "/blogs/random", params);
}


/**
 * 测试接口
 * @param name 名称
 * @returns 测试返回
 */
export async function testApi(params: { name?: string }): Promise<Result<{ name: string }>> { return sendRequest("get", "/hello", params); }


