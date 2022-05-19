import { useAxiosTransport } from './axios-adapter';
import { setCommonHeader, setInterseptors } from './utils';

const useContainerTemplate = () => ({
  [Symbol.for('api-services')]: {},
});

/**
 * @param { Object } servicesMap
 * @param { Object } config - axios configuration
 * @param { Object } plugins - axios plugins (serializers, interceptors, etc.)
 * @return { ApiServiceContainer }
 */
export const createApiContainer = (servicesMap, config, plugins) => {
  /**
   * @type { AxiosInstance }
   */
  const transport = useAxiosTransport(config);

  const apiServiceFactory = serviceFactoryAdapter([transport]);

  const container = Object.entries(servicesMap).reduce((container, [key, Service]) => {
    container[key] = apiServiceFactory(Service);
    container[Symbol.for('api-services')][key] = container[key];
    return container;
  }, useContainerTemplate());

  return Object.assign(container, setters);
};

/**
 * Adapter method returns factory with bounded props.
 * So usage simplified: just put service identifier, e.g. :
 * userService: apiServiceFactory(userService)
 * @param { Array } props
 * @return { function } apiServiceFactory
 */
function serviceFactoryAdapter(props) {
  return serviceFactory.bind(null, props);
}

/**
 * @param constructor { function } Identifier of constructor
 * @param props { Array } array of props
 */
function serviceFactory(props, constructor) {
  const instance = Reflect.construct(constructor, props);
  return new Proxy(instance, {
    get(target, prop) {
      const value = Reflect.get(...arguments);
      return typeof value === 'function' ? value.bind(target) : value;
    },
  });
}
