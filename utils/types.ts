export declare type Combine<T, U> = Omit<U, keyof T> & T
export declare type Argument<T> = T extends (arg: infer P) => void ? P : string;
export declare type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
export declare type APIRequest<T> = { [P in keyof T]?: T[P] | string | undefined; }

export declare type Blog = {
    id?: number, // 数据库 ID
    name: string, // 标题
    url: string, // 链接
    tags: string[], // 标签
    sign: string, // 描述
    feed: string, // RSS Feed
    status: string, // 状态
}

export declare type Result<T = undefined> = {
    success: boolean,
    message?: string,
    data?: T,
}

import { CSSProperties, ReactNode } from 'react';

type DefaultProps = {
    id?: string;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
};

/**
 * 组件基础类
 */
export declare type ComponentProps<T> = Combine<T, DefaultProps>;

export declare type JSON = { [key: string]: string | number | boolean | JSON | string[] | number[] | boolean[] | JSON[] }