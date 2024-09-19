import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { debug } from '@/helpers/Logger';
import { cookieGet, storageGet } from '@/helpers/applicationStorage';
import { StorageKey } from '@/constants';
import { clearAuthData } from '@/helpers/authHelper';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Request Interceptor
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const { method, url, headers } = config;
  // Set Headers Here
  // Check Authentication Here
  // Set Loading Start Here
  debug(`🚀 [HOST] ${API_URL} | [API] ${method?.toUpperCase()} ${url} | Request`);

  const token = cookieGet(StorageKey.TOKEN);
  const locale = storageGet(StorageKey.LOCALE) ?? 'ja-JP';
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (locale) {
    headers['Accept-Language'] = locale;
  }

  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config;
  const { status } = response;
  // Set Loading End Here
  // Handle Response Data Here
  // Error Handling When Return Success with Error Code Here
  debug(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);
  return response;
};

const onErrorResponse = (error: AxiosError | Error | any): Promise<AxiosError> => {
  const locale = storageGet(StorageKey.LOCALE) ?? 'ja-JP';
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    const { status } = error.response as AxiosResponse ?? {};
    debug(
      `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`
    );

    if (status === 401) {
      // "Login required"
      // Delete Token & Go To Login Page if you required.
      clearAuthData();
      setTimeout(() => {
        window.location.href = '/auth/sign-out';
      }, 3000);
    }

    if (status === 404) {
      window.location.href = '/404';
    }

  } else {
    debug(`🚨 [API] | Error ${error.message}`);
  }

  if (!error) {
    error.response.data.errors[0] = 'server_error';
    if (error.status === 404) {
      error.response.data.errors[0] = locale === 'ja-JP' ? '見つかりません' : 'Not found';
    }
  }

  return Promise.reject(error);
};

const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(onRequest, onErrorResponse);
  instance.interceptors.response.use(onResponse, onErrorResponse);
  return instance;
};


const axiosClient = setupInterceptors(axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}));

export default axiosClient;