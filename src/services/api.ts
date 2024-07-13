import axios, { AxiosInstance } from 'axios';
import { BASE_URL, REQUEST_TIMEOUT } from '../const/api';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT
  });

  return api;
};
