import { AxiosInstance, AxiosRequestConfig } from 'axios';

export class BaseService {
    constructor(httpService: AxiosInstance);
    setHeader(key: string, value: string): void;
    get(url: string, config?: AxiosRequestConfig): Promise<any>;
    delete(url: string, config?: AxiosRequestConfig): Promise<any>;
    head(url: string, config?: AxiosRequestConfig): Promise<any>;
    options(url: string, config?: AxiosRequestConfig): Promise<any>;
    post(url: string, payload: unknown, config?: AxiosRequestConfig): Promise<any>;
    put(url: string, payload: unknown, config?: AxiosRequestConfig): Promise<any>;
    patch(url: string, payload: unknown, config?: AxiosRequestConfig): Promise<any>;
    request(config: AxiosRequestConfig): Promise<any>;
    private readonly httpService: AxiosInstance;
}

export interface IConstructor {}

export function useHttpService(
    config: AxiosRequestConfig,
    interceptors?: { request: any[], response: any[] } | undefined
): {
    httpService: AxiosInstance;
    defineService: (constructor: IConstructor, props: any[]) => () => IServiceInstance;
    setHeader: (key: string, value: string) => void;
};

export interface IServiceInstance {
    setHeader(key: string, value: string): void;
    get(url: string, config?: AxiosRequestConfig): Promise<any>;
    delete(url: string, config?: AxiosRequestConfig): Promise<any>;
    head(url: string, config?: AxiosRequestConfig): Promise<any>;
    options(url: string, config?: AxiosRequestConfig): Promise<any>;
    post(url: string, payload: unknown, config?: AxiosRequestConfig): Promise<any>;
    put(url: string, payload: unknown, config?: AxiosRequestConfig): Promise<any>;
    patch(url: string, payload: unknown, config?: AxiosRequestConfig): Promise<any>;
    request(config: AxiosRequestConfig): Promise<any>;
}

export function autobindDecorator(service: IServiceInstance): IServiceInstance;

export function createApiServiceContainer(
    constructorsDict: Record<string, IConstructor>,
    httpConfig: AxiosRequestConfig,
    httpInterceptors?: object | undefined): any;
