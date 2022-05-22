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

const customize = function (httpService, customs) {
  const { serializers, interceptors } = customs;

  if (serializers) {
    const { requestSerializers, responseSerializers, paramsSerializer } = serializers;

    if (requestSerializers) httpService.defaults.transformRequest.unshift(...requestSerializers);
    if (responseSerializers) httpService.defaults.transformResponse.push(...responseSerializers);
    if (paramsSerializer) httpService.defaults.paramsSerializer = paramsSerializer;
  }

  if (interceptors) {
    useSetInterceptors(httpService)(interceptors);
  }
};

/**
 * @param { object } config - axios config
 * @param { object } customs - interceptors, serializers as custom plugins collection
 * @returns {{ httpService: AxiosInstance, defineService: function, setHeader: function}}
 */
export const useHttpService = (config, customs) => {
  const httpService = axios.create(config);

  httpService.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error)
  );
  if (typeof customs === 'object') customize(httpService, customs);

  const constructors = new Set();
  const defineService = (constructor, props = []) => {
    if (constructors.has(constructor)) {
      console.error(new Error(`The service ${constructor.name} already has an instance`));
      return;
    }

    const constructorArgs = [httpService, ...props];
    const instance = Reflect.construct(constructor, constructorArgs);
    constructors.add(constructor);
    return () => instance;
  };

  const setHeader = useSetHeader(httpService);
  const setInterceptors = useSetInterceptors(httpService);

  return {
    httpService,
    defineService,
    setHeader,
    setInterceptors,
  };
};
