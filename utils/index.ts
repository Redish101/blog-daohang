import { Blog, Combine, Result, UnwrapPromise, ComponentProps, APIRequest } from './types';
import { showNotification } from './notification'
import React from 'react';
import { useRouter } from 'next/router'
import { makeQuery } from './api'
import { isServer } from './env';


export type { Blog, Combine, Result, UnwrapPromise, ComponentProps, APIRequest }
export { showNotification }

/**
 * 筛选出 Object 的特定属性
 * @param obj 要筛选的对象
 * @param callback 筛选回调
 */
export function ObjectFilter<T>(obj: T, callback: (key: keyof T, value: T[keyof T]) => boolean) {
    var ret: Partial<T> = {};
    for (var key in obj) {
        const value = obj[key];
        if (callback(key, value)) {
            ret[key] = value;
        }
    }
    return ret;
}

/**
 * 拼接 class 列表，会自动忽略空值
 * @param classList 要拼接的 class 列表
 */
export function classConcat(...classList: string[]) {
    return classList.filter((s) => !!s).join(' ');
}

/**
 * 获取列表首元素
 * @param arr 列表
 * @param defaultValue 列表为空时默认值
 */
export function UnwrapArray<T>(arr: T[] | T, defaultValue: T): T {
    if (arr === undefined || arr === null) return defaultValue;
    if (!Array.isArray(arr)) return arr
    if (arr.length === 0) return defaultValue;
    return arr[0];
}

/**
 * 转换 @value 为数组
 * @param value 值
 */
export function shouldArray<T>(value: T[] | T): T[] {
    if (Array.isArray(value)) return value
    return [value]
}

/**
 * 转换 @value 为 number 类型
 * @param value 值
 * @param defaultValue 默认值
 */
export function shouldNumber(value: any, defaultValue: number = 0): number {
    try {
        value = UnwrapArray(value, defaultValue);
        const v = parseInt(value);
        if (isNaN(v)) return defaultValue;
        return v;
    } catch (e) {
        return defaultValue;
    }
}

/**
 * 转换 @value 为 string 类型
 * @param value 值
 * @param defaultValue 默认值
 */
export function shouldString(value: any, defaultValue: string = ""): string {
    try {
        value = UnwrapArray(value, defaultValue);
        return `${value}`;
    } catch (e) {
        return defaultValue;
    }
}

/**
 * 转换 undefined 或 null
 * @param arr 列表
 * @param defaultValue 列表为空时默认值
 */
export function shouldNotUndefined<T>(value: T | null | undefined, defaultValue: T): T {
    if (value === undefined || value === null) return defaultValue;
    return value;
}

/**
 * 将非异步函数异步化
 * @param callback 函数
 */
export function promiselized<T extends (...arg: any) => any>(callback: T): (...args: any[]) => Promise<ReturnType<T>> {
    return (...args: any) => new Promise((resolve) => { resolve(callback(...args)) });
}

/**
 * React Hook 绑定路由参数
 * @param defaultState 默认路由参数
 */
export function useQuery(defaultState?: { [key: string]: string | string[] }) {
    const [state, setState] = React.useState({ ...defaultState })

    React.useEffect(() => {
        var url = new URL(window.location.href)
        url.search = makeQuery(state)
        history.replaceState('', '', url.toString())
    }, [state])

    return [state, setState] as [
        { [key: string]: string | string[]; },
        React.Dispatch<React.SetStateAction<{ [key: string]: string | string[]; }>>
    ]
}

/**
 * 判断两个变量是否相同
 * @param a 变量
 * @param b 变量
 * @return 是否相同
 */
export function isEqual(a: any, b: any) {
    if (a === b) return true;
    if (a === undefined || b === undefined) return false;
    if (a === null || b === null) return false;
    if (a.constructor !== b.constructor) return false;
    if (typeof a === 'object') {
        if (Object.keys(a).length !== Object.keys(b).length) return false;
        for (var key in a) {
            if (!isEqual(a[key], b[key])) return false;
        }
        return true;
    }
    return false;
}