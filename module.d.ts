import { AxiosInstance } from 'axios'
declare module "BaseService" {
    export class BaseService {
        constructor(httpService: any);
        setHeader(key: any, value: any): void;
        get(url: any, config: any): void;
        delete(url: any, config: any): void;
        head(url: any, config: any): void;
        options(url: any, config: any): void;
        post(url: any, payload: any, config: any): void;
        put(url: any, payload: any, config: any): void;
        patch(url: any, payload: any, cofig: any): void;
        request(config: any): void;
        #private;
    }
}
declare module "http-service" {
    export function useHttpService(config: object, interceptors?: object | undefined): {
        httpService: AxiosInstance;
        defineService: Function;
        setHeader: Function;
    };
}
declare module "ioc" {
    export function autobindDecorator(service: any): any;
    export function createApiServiceContainer(serviceList: Object, httpConfig: Object, httpInterceptors?: Object | undefined): any;
}
