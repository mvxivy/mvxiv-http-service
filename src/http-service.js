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

/**
 * @param { object } config - axios config
 * @param { object } [interceptors]
 * @returns {{ httpService: AxiosInstance, defineService: function, setHeader: function}}
 */
export const useHttpService = (config, interceptors) => {
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

  const defineService = (constructor, props = []) => {
    const constructorArgs = [httpService, ...props];
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
