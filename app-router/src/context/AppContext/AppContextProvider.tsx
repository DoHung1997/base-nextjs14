'use client'
import React, {ReactNode, useEffect, useState} from 'react';

import {cookieGet} from '@/helpers/applicationStorage';
import {base64UrlDecode} from '@/helpers/authHelper';
import {StorageKey} from "@/constants";
import {ContextProvider} from "@/context/AppContext/index";

const AppContextProvider = ({children}: { children: ReactNode }) => {
        const [loading, setLoading] = useState(false);

        const token = cookieGet(StorageKey.TOKEN);

        useEffect(() => {
            if (!token) return;
            const decode = base64UrlDecode(token);
            console.log('decode', decode);
        }, [token]);


        const valueContext = {
            loading,
            setLoading,
        };

        return (
            <ContextProvider value={valueContext}>
                {children}
            </ContextProvider>
        );
    }
;

export default AppContextProvider;