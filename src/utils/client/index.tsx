import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import cookie from "js-cookie";

interface CustomRequestConfig {
    toast?: boolean;
}
export type Result<T> = {
    code: number;
    msg: string;
    data: T;
};
export type Response<T> = T extends any[] ? Result<T> : Result<T>;
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default class Request {
    private axiosInstance: AxiosInstance;
    private readonly options: AxiosRequestConfig;
    constructor(options: AxiosRequestConfig) {
        this.axiosInstance = axios.create(options);
        this.options = options;
        this.setupInterceptors();
    }

    setupInterceptors() {
        // 定义拦截器
        const { axiosInstance } = this;

        /**
         * @description 全局请求拦截
         */
        axiosInstance.interceptors.request.use(
            async (
                config: InternalAxiosRequestConfig & CustomRequestConfig
            ) => {
                config.baseURL = NEXT_PUBLIC_BASE_URL;
                config.headers.Authorization = `Bearer ${cookie.get("Token")}`;

                return config;
            },
            (error) => {}
        );
        /**
         * @description 全局响应拦截
         */
        axiosInstance.interceptors.response.use(
            (res) => {
                const { code } = res.data;
                switch (code) {
                    case 0:
                        return res;
                    case 12:
                        window.location.href = "/login";
                        return res;
                    default:
                        return res;
                }
            },
            (error) => {}
        );
    }

    /**
     * @description 单个实列请求
     */
    request<T = unknown, R = unknown>(
        config: AxiosRequestConfig
    ): Promise<Response<T> & R> {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request<unknown, AxiosResponse<Response<T> & R>>(config)
                .then(async (res) => {
                    if (res.status === 200) {
                        resolve(res.data);
                    } else {
                        reject(res);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    get<T, R = unknown>(config: AxiosRequestConfig): Promise<Response<T> & R> {
        return this.request({ ...config, method: "get" });
    }
    post<T, R = unknown>(config: AxiosRequestConfig): Promise<Response<T> & R> {
        return this.request({ ...config, method: "post" });
    }
    put<T, R = unknown>(config: AxiosRequestConfig): Promise<Response<T> & R> {
        return this.request({ ...config, method: "put" });
    }
    delete<T, R = unknown>(
        config: AxiosRequestConfig
    ): Promise<Response<T> & R> {
        return this.request({ ...config, method: "delete" });
    }
}
export const server = new Request({
    timeout: 10 * 1000,
});
