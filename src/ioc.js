import { useHttpService } from './http-service';

class RequiredParamError extends Error {
  constructor(paramName, param) {
    super(`Param "${paramName}" is required! Got ${param}`);
  }
}

// TODO: replace to es decorator
export const autobindDecorator = service =>
  new Proxy(service, {
    get(target) {
      const value = Reflect.get(...arguments);
      return typeof value === 'function' ? value.bind(target) : value;
    },
  });

/**
 * @param { Object } serviceList
 * @param { Object } config - axios configuration
 * @param { Object } plugins - axios plugins (serializers, interceptors, etc.)
 * @return { ApiServiceContainer }
 */

export const createApiServiceContainer = (httpConfig, httpInterceptors, serviceList) => {
  if (!httpConfig) throw new RequiredParamError('httpConfig', httpConfig);
  if (!serviceList) throw new RequiredParamError('serviceList', serviceList);

  const { defineService, setHeader, setInterceptors } = useHttpService(
    httpConfig,
    httpInterceptors
  );

  const constructors = new Set(serviceList);
  const container = serviceList.reduce((container, Service) => {
    const key = Service.name[0].toLowerCase() + Service.name.slice(1);
    const service = defineService(Service)();
    container[key] = autobindDecorator(service);
    constructors.add(constructor);
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

  // Object.defineProperty(container, 'addService', {
  //   configurable: false,
  //   enumerable: false,
  //   writable: false,
  //   value: Service => {
  //     if (constructors.has(Service)) {
  //       console.error(new Error(`The service ${Service.name} already has an instance`));
  //       return;
  //     }
  //     const key = Service.name[0].toLowerCase() + Service.name.slice(1);
  //     const service = defineService(Service)();
  //     container[key] = autobindDecorator(service);
  //     constructors.add(constructor);
  //   },
  // });

  return container;
};
