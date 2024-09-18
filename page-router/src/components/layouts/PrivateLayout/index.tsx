import React, {useCallback, useEffect, useState} from 'react';
import {LayoutPropsType} from "@/models";
import PageLoading from "@/components/PageLoading";
import {refreshToken, storageGet, storageRemove, storageSet} from "@/helpers";
import {StorageKey} from "@/constants";
import styles from './PrivateLayout.module.scss'
import Header from "@/components/layouts/PrivateLayout/Header";
import {useRouter} from "next/router";

const PrivateLayout = ({children, openSidebar, title, role}: LayoutPropsType) => {
    const {push, locale} = useRouter()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        handleCallFirstData()
    }, []);

    const handleCallFirstData = useCallback(async () => {
        const token = storageGet(StorageKey.TOKEN);
        const refresh_token = storageGet(StorageKey.REFRESH_TOKEN);
        const newestSignIn = storageGet(StorageKey.NEWEST_SIGN_IN);

        if (!JSON.parse(newestSignIn)) {
            const response = await refreshToken(token, refresh_token)
            if (!response || !response?.success || !response?.result) {
                storageRemove(StorageKey.TOKEN)
                // window.location.href = '/sign-out';
                await push('/sign-out', '/sign-out', {locale})
            } else {
                storageSet(StorageKey.TOKEN, response.result.accessToken);
                storageSet(StorageKey.REFRESH_TOKEN, response.result.refreshToken);
                storageSet(StorageKey.EXPIRES, response.result.expires?.toString() ?? '');
                storageSet(StorageKey.EXPIRES_IN, response.result.expiryIn + '');
                storageSet(StorageKey.TOKEN_TYPE, response.result.tokenType);
                storageSet(StorageKey.USER, JSON.stringify(response.result.user));
            }
        }

        setLoading(false)
        storageSet(StorageKey.NEWEST_SIGN_IN, "false");
    }, [push, locale])

    if (loading) return <PageLoading isLoading={true}/>
    return (
        <div className={styles.wrapper}>
            <Header/>
            <section className={styles.content}>
                {children}
            </section>
        </div>
    );
};
export default PrivateLayout;