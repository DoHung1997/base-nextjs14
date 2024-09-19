import {createContext, useContext} from 'react';
// import { AccountRoleData, RoleDataType } from '@/model';
// import * as signalR from '@microsoft/signalr';

export type AppContextProps = {
    loading: boolean,
    setLoading: (value: boolean) => void
}

const defaultContext = {
    loading: false,
    setLoading: () => {
    },
};

const AppContext = createContext<AppContextProps>(defaultContext);

export const ContextProvider = AppContext.Provider;

export const useAppContext = () => useContext(AppContext);


export default AppContext;