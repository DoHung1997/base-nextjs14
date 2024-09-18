import {createWrapper} from "next-redux-wrapper";
import { configureStore } from '@reduxjs/toolkit';
import {authSlice} from "@/store/slices";

const makeStore = () =>
    configureStore({
        reducer: {
            [authSlice.name]: authSlice.reducer,
        },
        devTools: true
    });

export const wrapper = createWrapper(makeStore);

type Store = ReturnType<typeof makeStore>;
export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;