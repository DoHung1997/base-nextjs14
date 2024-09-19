import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '@/store/store';
import {clearAuthData} from "@/helpers/authHelper";
import {AuthInitStateType} from "@/models";

const initialState: AuthInitStateType = {
    statusAuthAction: '',
    user: null
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutAction: (state) => {
            clearAuthData();
            state.user = null;
        },
        controlAuthUser: (state, {payload}) => {
            state.user = payload;
        }
    },
    extraReducers: (builder) => {
        // builder
        //   .addCase(loginAuthAction.pending, (state) => {
        //     state.statusAuthAction = StoreStatus.PENDING;
        //   })
        //   .addCase(loginAuthAction.fulfilled, (state, { payload }) => {
        //     state.statusAuthAction = StoreStatus.FULFILLED;
        //     state.user = payload.user;
        //     saveAuthData(payload);
        //   })
        //   .addCase(loginAuthAction.rejected, (state) => {
        //     state.statusAuthAction = StoreStatus.REJECTED;
        //   });
    }
});

export const selectAuth = (state: RootState) => state.auth;

export const {logoutAction, controlAuthUser} = authSlice.actions;

export default authSlice.reducer;