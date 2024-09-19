import {useDispatch} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import AuthReducer from './auth/auth.slice'

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
    },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export enum StoreStatus {
    PENDING,
    FULFILLED,
    REJECTED
}