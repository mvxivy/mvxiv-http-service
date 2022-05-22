import { useHttpService } from './http-service';

class RequiredParamError extends Error {
  constructor(paramName, param) {
    super(`Param "${paramName}" is required! Got ${param}`);
  }
}

/**
 * @param { Object } serviceList
 * @param { Object } config - axios configuration
 * @param { Object } plugins - axios plugins (serializers, interceptors, etc.)
 * @return { ApiServiceContainer }
 */

export const createApiServiceContainer = (httpConfig, httpCustoms, serviceList) => {
  if (!httpConfig) throw new RequiredParamError('httpConfig', httpConfig);
  if (!serviceList) throw new RequiredParamError('serviceList', serviceList);

  const { defineService, setHeader, setInterceptors } = useHttpService(httpConfig, httpCustoms);
  const container = serviceList.reduce((container, Service) => {
    const key = Service.name[0].toLowerCase() + Service.name.slice(1);
    container[key] = defineService(Service)();
    return container;
  }, {});

  Object.defineProperty(container, 'setHeader', {
    value: setHeader,
    enumerable: false,
  });

  Object.defineProperty(container, 'setInterceptors', {
    value: setInterceptors,
    enumerable: false,
  });

  return container;
};
