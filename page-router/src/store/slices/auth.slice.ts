import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store";
import {StorageKey} from "@/constants";
import {login} from "@/store/actions";
import {ResponseLoginType} from "@/models";
import {storageRemove, storageSet} from "@/helpers";

export type AuthModel = {
    data: ResponseLoginType | undefined,
    isFetching: boolean,
    isError: boolean,
    isSuccess: boolean,
    errorMessage: string[],
}

const initialState: AuthModel = {
    data: undefined,
    isError: false,
    isFetching: false,
    isSuccess: false,
    errorMessage: [],
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutAuthAction(state) {
            state.data = undefined;
            state.isError = false;
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = [];

            storageRemove(StorageKey.TOKEN);
            storageRemove(StorageKey.REFRESH_TOKEN);
            storageRemove(StorageKey.EXPIRES);
            storageRemove(StorageKey.EXPIRES_IN);
            storageRemove(StorageKey.TOKEN_TYPE);
            storageRemove(StorageKey.USER);
        },
        clearAuth(state) {
            state.data = undefined;
            state.isError = false;
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.isFetching = true;
            state.isSuccess = false;
            state.isError = false;
            state.errorMessage = [];
        }).addCase(login.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.isError = false;
            state.isSuccess = true;
            state.errorMessage = [];

            const response = payload as ResponseLoginType;
            state.data = {...response};

            storageSet(StorageKey.TOKEN, response.result.accessToken);
            storageSet(StorageKey.REFRESH_TOKEN, response.result.refreshToken);
            storageSet(StorageKey.EXPIRES, response.result.expires?.toString() ?? '');
            storageSet(StorageKey.EXPIRES_IN, response.result.expiryIn+ '');
            storageSet(StorageKey.TOKEN_TYPE, response.result.tokenType);
            storageSet(StorageKey.USER, JSON.stringify(response.result.user));

        }).addCase(login.rejected, (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = false;
            state.isError = true;

            state.errorMessage = payload as string[];
        })
    },
});

export const selectAuth = (state: RootState) => state.auth;

export const { clearAuth, logoutAuthAction } = authSlice.actions

export default authSlice.reducer;