import { useHttpService } from './http-service.js';

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
 * @param { object } constructorsDict
 * @param { object } httpConfig - axios configuration
 * @param { object } [httpInterceptors] - axios plugins (serializers, interceptors, etc.)
 * @return { * } apiServiceContainer
 */

export const createApiServiceContainer = (constructorsDict, httpConfig, httpInterceptors) => {
  if (!httpConfig) throw new RequiredParamError('httpConfig', httpConfig);
  if (!constructorsDict) throw new RequiredParamError('constructorsDict', constructorsDict);

  const { defineService, setHeader, setInterceptors } = useHttpService(
    httpConfig,
    httpInterceptors
  );
  const container = Object.entries(constructorsDict).reduce((container, [key, Service]) => {
    const instanceKey = key.charAt(0).toLowerCase() + key.slice(1);
    const service = defineService(Service)();
    container[instanceKey] = autobindDecorator(service);
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
