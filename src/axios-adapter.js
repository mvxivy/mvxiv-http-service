import axios from 'axios';

const axiosAdapter = (axios, axiosConfig) => {
  const http = axios.create(axiosConfig);

  return http;
};

export const useHttpService = config => axiosAdapter.bind(null, axios, config);
