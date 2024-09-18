import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {debug, isExpired, refreshToken, storageGet, storageRemove, storageSet} from "@/helpers";
import {StorageKey} from "@/constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Request Interceptor
// InternalAxiosRequestConfig
const onRequest = async (config: InternalAxiosRequestConfig) => {
    const {method, url, headers} = config;
    // Set Headers Here
    // Check Authentication Here
    // Set Loading Start Here
    debug(`🚀 [HOST] ${API_URL} | [API] ${method?.toUpperCase()} ${url} | Request`);

    const token = storageGet(StorageKey.TOKEN);
    const refresh_token = storageGet(StorageKey.REFRESH_TOKEN);
    const expires = storageGet(StorageKey.EXPIRES);
    const locale = storageGet(StorageKey.LOCALE);
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    if (locale) {
        headers['Accept-Language'] = locale;
    }

    if (token && refresh_token && isExpired(expires)) {
        const response = await refreshToken(token, refresh_token)
        if (!response || !response?.success || !response?.result) {
            storageRemove(StorageKey.TOKEN)
            window.location.href = '/sign-out';
        } else {
            storageSet(StorageKey.TOKEN, response.result.access_token);
            storageSet(StorageKey.REFRESH_TOKEN, response.result.refresh_token);
            storageSet(StorageKey.EXPIRES, response.result.expires?.toString() ?? '');
            storageSet(StorageKey.EXPIRES_IN, response.result.expiries_in + '');
            storageSet(StorageKey.TOKEN_TYPE, response.result.token_type);
            storageSet(StorageKey.USER, JSON.stringify(response.result.user));
            storageSet(StorageKey.NEWEST_SIGN_IN, "false");
        }
    }

    return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    const {method, url} = response.config;
    const {status} = response;
    // Set Loading End Here
    // Handle Response Data Here
    // Error Handling When Return Success with Error Code Here
    debug(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);
    return response;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
    if (axios.isAxiosError(error)) {
        const {message} = error;
        const {method, url} = error.config as AxiosRequestConfig;
        const {status} = error.response as AxiosResponse ?? {};

        debug(
            `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`
        );

        if (status === 401) {
            // "Login required"
            // Delete Token & Go To Login Page if you required.
            window.location.href = '/sign-out';
        }
    } else {
        debug(`🚨 [API] | Error ${error.message}`);
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
        'Content-Type': 'application/json',
    },
}));

export default axiosClient;