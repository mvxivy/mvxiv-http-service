import { default as axios, AxiosInstance } from 'axios';
import { methodsMap } from './axios.config.json';

const bodyContractAxiosFn = fn => async (url, payload, config) => {
  const { data, ...res } = await fn(url, payload, config);
  return data;
};
const bodilessContractAxiosFn = fn => async (url, config) => {
  const { data, ...res } = await fn(url, config);
  return data;
};

const requestContractAxiosFn = fn => async config => {
  const { data, ...res } = await fn(config);
  return data;
};

const methodContractsMap = {
  request: requestContractAxiosFn,
  delete: bodilessContractAxiosFn,
  get: bodilessContractAxiosFn,
  head: bodilessContractAxiosFn,
  options: bodilessContractAxiosFn,
  post: bodyContractAxiosFn,
  put: bodyContractAxiosFn,
  patch: bodyContractAxiosFn,
};

/**
 * Axios Adapter
 * @param { function }  axios
 * @param { Object }    config
 * @param { Object }    config.methodsMap
 * @param { string }    config.methodsMap.key - Alias for method on transport instance
 * @param { string }    config.methodsMap.value - Method name for service instances
 * @param { Object }    config.methodContracts
 * @param { string }    config.methodContracts.key - Method name
 * @param { function }  config.methodContracts.value - Contract function
 * @param { Object }    axiosConfig
 *
 * @returns { AxiosInstance } transport
 */
const axiosAdapter = (axios, config, axiosConfig) => {
  const { methodContractsMap, methodsMap } = config;

  const transport = axios.create(axiosConfig);

  /* setup logger here, or any interception operations */
  // transport.interceptors.request.use(
  //   config => {
  //     console.log(`[${config.method.toUpperCase()}] "${config.baseURL}${config.url}"`);
  //     return config;
  //   },
  //   error => Promise.reject(error),
  // );
  // transport.interceptors.response.use(response => {})

  if (methodsMap) {
    Object.entries(methodsMap).forEach(([adapterName, methodName]) => {
      const methodContract = methodContractsMap[methodName];
      transport[adapterName] = methodContract(transport[methodName]);
    });
    transport._methodsMap = methodsMap;
  }

  return transport;
};

const setupConfig = {
  methodsMap,
  methodContractsMap,
};

/**
 * @returns { AxiosInstance | ITransport } transport
 */
export const useAxiosTransport = axiosAdapter.bind(null, axios, setupConfig);
