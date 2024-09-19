// import React, { ReactNode, useCallback, useEffect, useState } from 'react';
// import { useTranslation } from 'next-i18next';
// import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
// import { notification } from 'antd/lib';
//
// import { ContextProvider } from '@/context/AppContext/index';
// import { HubError, StorageKey } from '@/constants';
// import { AccountRoleData, RoleDataType } from '@/model';
// import { cookieGet } from '@/helpers/applicationStorage';
// import { base64UrlDecode } from '@/helpers/authHelper';
//
// const AppContextProvider = ({ children }: { children: ReactNode }) => {
//     const { t } = useTranslation(['common']);
//
//     const [loading, setLoading] = useState(false);
//     const [roleProject, setRoleProject] = useState<RoleDataType>(RoleDataType.USER);
//     const [accountRole, setAccountRole] = useState<AccountRoleData>(AccountRoleData.USER);
//     const [connection, setConnection] = useState<HubConnection | null>(null);
//
//     const token = cookieGet(StorageKey.TOKEN);
//
//     useEffect(() => {
//       if (!token) return;
//       const decode = base64UrlDecode(token);
//       setAccountRole(decode.role);
//     }, [token]);
//
//     useEffect(() => {
//       if (!token && connection) {
//         connection.stop().then(() => {
//           setConnection(null);
//         });
//         return;
//       }
//
//       if (token && (!connection)) {
//         startConnection();
//       }
//     }, [connection, accountRole, token]);
//
//     const startConnection = useCallback(async () => {
//       if (!token) return;
//
//       let connect = new HubConnectionBuilder()
//         .withUrl(`${process.env.NEXT_PUBLIC_HUB_API_URL}?access_token=${token}`)
//         .withAutomaticReconnect()
//         .withServerTimeout(3 * 60000)
//         .build();
//
//       connect
//         .start()
//         .then(() => {
//           setConnection(connect);
//           connect.on(HubError.ERROR_USER_NOT_FOUND, () => {
//             notification.warning({
//               message: t('error_account_ban_or_delete')
//             });
//             window.location.href = '/auth/login';
//           });
//         })
//         .catch((err) => {
//           console.error('SignalR Connection Error: ', err);
//           startConnection();
//         });
//     }, [token]);
//
//     const valueContext = {
//       loading,
//       setLoading,
//       roleProject,
//       setRoleProject,
//       accountRole,
//       setAccountRole,
//       connection,
//       setConnection,
//       startConnection
//     };
//
//     return (
//       <ContextProvider value={valueContext}>
//         {children}
//       </ContextProvider>
//     );
//   }
// ;
//
// export default AppContextProvider;