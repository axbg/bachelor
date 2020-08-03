import axios from 'axios';
import { BASE_URL } from '../constants';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = BASE_URL;

const setupAxiosInterceptors = (onUnauthenticated) => {
  const onRequestSuccess = (config) => {
    const token = window.localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = (response) => response;
  const onResponseError = (err) => {
    const status = err.status || err.response.status;
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
