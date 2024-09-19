// import { createContext, useContext } from 'react';
// // import { AccountRoleData, RoleDataType } from '@/model';
// // import * as signalR from '@microsoft/signalr';
//
// export type AppContextProps = {
//   loading: boolean,
//   setLoading: (value: boolean) => void
//   roleProject: RoleDataType
//   setRoleProject: (value: RoleDataType) => void
//   accountRole: AccountRoleData
//   setAccountRole: (d: AccountRoleData) => void
//   connection: signalR.HubConnection | null
//   setConnection: (d: any) => void
//   startConnection: () => Promise<void>
// }
//
// const defaultContext = {
//   loading: false,
//   setLoading: () => {
//   },
//   roleProject: RoleDataType.USER,
//   setRoleProject: () => {
//   },
//   accountRole: AccountRoleData.USER,
//   setAccountRole: () => {
//   },
//   connection: null,
//   setConnection: () => {
//   },
//   startConnection: async () => {
//   }
// };
//
// const AppContext = createContext<AppContextProps>(defaultContext);
//
// export const ContextProvider = AppContext.Provider;
//
// export const useAppContext = () => useContext(AppContext);
//
//
// export default AppContext;