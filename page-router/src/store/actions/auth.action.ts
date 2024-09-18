import {createAsyncThunk} from "@reduxjs/toolkit";
import {RequestLoginType, ResponseLoginType} from "@/models";
import api from "@/api";
import {
    RequestActiveCodeType,
    RequestSignUpType,
    ResponseActiveCodeType,
    ResponseSignUpType
} from "@/models/auth/SignUpType";

export const login = createAsyncThunk(
    'login',
    async (payload: RequestLoginType, thunkAPI) => {
        try {
            const response = await api.post('v1/auth/sign-in', payload)

            if (response.status < 400) {
                return response.data;
            }

            return thunkAPI.rejectWithValue([response.data]);
        } catch (error: any) {
            if ('code' in error && error.code === 'ERR_NETWORK') {
                return thunkAPI.rejectWithValue(['Network error!']);
            }

            const errorData = error?.response?.data as ResponseLoginType | undefined;
            return thunkAPI.rejectWithValue(errorData?.errors ?? ['Network error!']);
        }
    }
)

export const signup = createAsyncThunk(
    'signup',
    async (payload: RequestSignUpType, thunkAPI) => {
        try {
            const response = await api.post('v1/auth/sign-up', payload)

            if (response.status < 400) {
                return response.data;
            }

            return thunkAPI.rejectWithValue([response.data]);
        } catch (error: any) {
            if ('code' in error && error.code === 'ERR_NETWORK') {
                return thunkAPI.rejectWithValue(['Network error!']);
            }
            const errorData = error?.response?.data as ResponseSignUpType | undefined;
            return thunkAPI.rejectWithValue(errorData?.errors ?? ['Network error!']);
        }
    }
)

export const verifyCode = createAsyncThunk(
    'verifyCode',
    async (payload: RequestActiveCodeType, thunkAPI) => {
        try {
            const response = await api.post('v1/auth/verify', payload)

            if (response.status < 400) {
                return response.data;
            }

            return thunkAPI.rejectWithValue([response.data]);
        } catch (error: any) {
            if ('code' in error && error.code === 'ERR_NETWORK') {
                return thunkAPI.rejectWithValue(['Network error!']);
            }
            const errorData = error?.response?.data as ResponseActiveCodeType | undefined;
            return thunkAPI.rejectWithValue(errorData?.errors ?? ['Network error!']);
        }
    }
)

export const forgotPassword = createAsyncThunk(
    'forgotPassword',
    async (payload: any, thunkAPI) => {
        try {
            const response = await api.post('v1/auth/forgot-password', payload)

            if (response.status < 400) {
                return response.data;
            }

            return thunkAPI.rejectWithValue([response.data]);
        } catch (error: any) {
            if ('code' in error && error.code === 'ERR_NETWORK') {
                return thunkAPI.rejectWithValue(['Network error!']);
            }
            const errorData = error?.response?.data as any | undefined;
            return thunkAPI.rejectWithValue(errorData?.errors ?? ['Network error!']);
        }
    }
)

export const forgotPasswordCheckCode = createAsyncThunk(
    'forgotPasswordCheckCode',
    async (payload: any, thunkAPI) => {
        try {
            const response = await api.post(`v1/auth/forgot-password/${payload}`)

            if (response.status < 400) {
                return response.data;
            }

            return thunkAPI.rejectWithValue([response.data]);
        } catch (error: any) {
            if ('code' in error && error.code === 'ERR_NETWORK') {
                return thunkAPI.rejectWithValue(['Network error!']);
            }
            const errorData = error?.response?.data as any | undefined;
            return thunkAPI.rejectWithValue(errorData?.errors ?? ['Network error!']);
        }
    }
)

export const resetPassword = createAsyncThunk(
    'resetPassword',
    async (payload: any, thunkAPI) => {
        try {
            const response = await api.post(`v1/auth/reset-password`, payload)

            if (response.status < 400) {
                return response.data;
            }

            return thunkAPI.rejectWithValue([response.data]);
        } catch (error: any) {
            if ('code' in error && error.code === 'ERR_NETWORK') {
                return thunkAPI.rejectWithValue(['Network error!']);
            }
            const errorData = error?.response?.data as any | undefined;
            return thunkAPI.rejectWithValue(errorData?.errors ?? ['Network error!']);
        }
    }
)

export const setPassword = createAsyncThunk(
    'setPassword',
    async (payload: any, thunkAPI) => {
        try {
            const response = await api.post(`v1/auth/set-password`, payload)

            if (response.status < 400) {
                return response.data;
            }

            return thunkAPI.rejectWithValue([response.data]);
        } catch (error: any) {
            if ('code' in error && error.code === 'ERR_NETWORK') {
                return thunkAPI.rejectWithValue(['Network error!']);
            }
            const errorData = error?.response?.data as any | undefined;
            return thunkAPI.rejectWithValue(errorData?.errors ?? ['Network error!']);
        }
    }
)

export const revokeToken = createAsyncThunk(
    'revokeToken',
    async (payload: any, thunkAPI) => {
        try {
            const response = await api.post('v1/token/revoke', payload)

            if (response.status < 400) {
                return response.data;
            }

            return thunkAPI.rejectWithValue([response.data]);
        } catch (error: any) {
            if ('code' in error && error.code === 'ERR_NETWORK') {
                return thunkAPI.rejectWithValue(['Network error!']);
            }
            const errorData = error?.response?.data as any | undefined;
            return thunkAPI.rejectWithValue(errorData?.errors ?? ['Network error!']);
        }
    }
)

export const resendRegisterCode = createAsyncThunk(
    'resendRegisterCode',
    async (payload: any, thunkAPI) => {
        try {
            const response = await api.post(`v1/auth/verify/resend-code/${payload}`)

            if (response.status < 400) {
                return response.data;
            }

            return thunkAPI.rejectWithValue([response.data]);
        } catch (error: any) {
            if ('code' in error && error.code === 'ERR_NETWORK') {
                return thunkAPI.rejectWithValue(['Network error!']);
            }

            const errorData = error?.response?.data as ResponseLoginType | undefined;
            return thunkAPI.rejectWithValue(errorData?.errors ?? ['Network error!']);
        }
    }
)
