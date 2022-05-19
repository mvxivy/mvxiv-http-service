import { default as axios, AxiosInstance } from 'axios';

/**
 * Axios Adapter
 * @param { function } axios - axios constructor
 * @returns { function: AxiosInstance }
 */
const useAxiosAdapter = axios => (config, customs) => {
  const transport = axios.create(config);

  transport.interceptors.request.use(
    config => {
      console.log(`[${config.method.toUpperCase()}] "${config.baseURL}${config.url}"`);
      return config;
    },
    error => Promise.reject(error)
  );
  transport.interceptors.response.use(response => {});

  return transport;
};

/**
 * @returns { AxiosInstance  } transport
 */
export const useHttpService = useAxiosAdapter(axios);
