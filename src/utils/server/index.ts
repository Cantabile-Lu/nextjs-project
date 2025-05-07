import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Result<T> = {
    code: number;
    msg: string;
    data: T;
};
export type Response<T> = T extends any[] ? Result<T> : Result<T>;
export interface ServerOptions extends RequestInit {
    url: string;
    data?: unknown;
    checkToken?: boolean;
    headers?: any;
}

const requestInterceptor = async (options: ServerOptions) => {
    const cookie = await cookies();
    // 判断token
    if (options.checkToken) {
        const token = cookie.has("Token");
        if (!token) {
            redirect("/login");
        }
    }
    return options;
};
const responseInterceptor = async <T = any, R = unknown>(
    response: Response<T> & R,
    options: ServerOptions
): Promise<Response<T> & R> => {
    return new Promise((resolve, reject) => {
        const { code, msg } = response;
        switch (code) {
            case 0:
                resolve(response);
                break;
            case 12:
                redirect("/login");
                break;
            case 500:
                reject(response);
                break;
            default:
                console.log({
                    ...response,
                    ...options,
                    message: `please check ${options.url}`,
                });
                resolve(response);
        }
    });
};
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
class Server {
    async request<T, R = unknown>(
        options: ServerOptions
    ): Promise<Response<T> & R> {
        options = await requestInterceptor(options);
        const cookie = await cookies();
        const {
            method = "GET",
            url,
            headers = {},
            data,
            body,
            ...other
        } = options;
        try {
            const response = await fetch(`${NEXT_PUBLIC_BASE_URL}${url}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookie.get("Token")?.value}`,
                    ...headers,
                },
                body: data ? JSON.stringify(data) : null,
                ...other,
            })
                .then((res) => res.json())
                .catch((error) => {
                    return {};
                });
            return responseInterceptor<T, R>(response, options);
        } catch (error) {
            console.log(
                `🚀🚀🚀🚀🚀-> in index.ts on 67`,
                error,
                JSON.stringify(options)
            );
            return Promise.reject(error);
        }
    }
}

export const server = new Server();
