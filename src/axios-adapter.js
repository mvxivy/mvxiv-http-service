import { default as axios, AxiosInstance } from 'axios';
import { setInterseptors, setCommonHeader } from './utils';

/**
 * Axios Adapter
 * @param { object } config - axios config
 * @param { object } customs - customs preferences
 * @returns { AxiosInstance }
 */
export const useHttpService = (axios => (config, customs) => {
  const httpService = axios.create(config);

  httpService.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error)
  );

  if (!customs) {
    return httpService;
  }

  const { serializers, interceptors } = customs;

  if (serializers) {
    const { requestSerializers, responseSerializers, paramsSerializer } = serializers;

    requestSerializers && httpService.defaults.transformRequest.unshift(...requestSerializers);
    responseSerializers && httpService.defaults.transformResponse.push(...responseSerializers);
    paramsSerializer && (httpService.defaults.paramsSerializer = paramsSerializer);
  }

  if (interceptors) {
    setInterseptors.call(httpService, interceptors);
  }

  const setters = {
    setCommonHeader: setCommonHeader.bind(httpService),
    setInterseptors: setInterseptors.bind(httpService),
  };

  return httpService;
})(axios);
