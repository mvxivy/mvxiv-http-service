import { default as axios, AxiosInstance } from 'axios';

const useSetHeader = instance => (key, value) => {
  delete instance.defaults.headers[key];
  delete instance.defaults.headers.common[key];
  instance.defaults.headers.common[key] = value;
};

const useSetInterceptors = instance => interceptors => {
  for (const [type, intcTuples] of Object.entries(interceptors)) {
    for (const tuple of intcTuples) {
      instance.interceptors[type].use(...tuple);
    }
  }
};

const mergeSerializers = config => {
  const { transformRequest, transformResponse } = config;
  if (Array.isArray(transformRequest)) {
    config.transformRequest = [...transformRequest, ...axios.defaults.transformRequest];
  }
  if (Array.isArray(transformResponse)) {
    config.transformResponse = [...axios.defaults.transformResponse, ...transformResponse];
  }
};

/**
 * @param { object } config - axios config
 * @param { object } [interceptors]
 * @returns {{ httpService: AxiosInstance, defineService: function, setHeader: function}}
 */
export const useHttpService = (config, interceptors) => {
  mergeSerializers(config);
  const httpService = axios.create(config);

  httpService.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error)
  );

  const setHeader = useSetHeader(httpService);
  const setInterceptors = useSetInterceptors(httpService);

  if (interceptors) {
    setInterceptors(interceptors);
  }

  const defineService = (constructor, args = []) => {
    const constructorArgs = [httpService, ...args];
    const instance = Reflect.construct(constructor, constructorArgs);
    return () => instance;
  };

  return {
    httpService,
    defineService,
    setHeader,
    setInterceptors,
  };
};
