import React, {useEffect, useState} from 'react';
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import UnauthorizedLayout from "@/components/layouts/UnauthorizedLayout";
import PageLoading from "@/components/PageLoading";
import {storageGet, storageRemove} from "@/helpers";
import {StorageKey} from "@/constants";
import {revokeToken} from "@/store/actions";
import {logoutAuthAction} from "@/store/slices";
import {useRouter} from "next/router";
import {useAppDispatch} from "@/hooks";
import EmptyLayout from "@/components/layouts/EmptyLayout";

const SignOutPage = () => {
    const dispatch = useAppDispatch()
    const {locale, push} = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = storageGet(StorageKey.TOKEN)
        const refreshToken = storageGet(StorageKey.REFRESH_TOKEN)
        const user = storageGet(StorageKey.USER)

        dispatch(logoutAuthAction())

        if (token && refreshToken && user) {
            dispatch(revokeToken({accessToken: token, refreshToken}))
                .unwrap()
                .then((response: any) => {
                    // ignore
                })
                .catch((err: any) => console.error(err))
                .finally(async () => {
                    storageRemove(StorageKey.TOKEN);
                    storageRemove(StorageKey.REFRESH_TOKEN);
                    storageRemove(StorageKey.EXPIRES);
                    storageRemove(StorageKey.EXPIRES_IN);
                    storageRemove(StorageKey.TOKEN_TYPE);
                    storageRemove(StorageKey.USER);

                    await push('/sign-in', '/sign-in', {locale})
                    setLoading(false)
                })
        } else {
            push('/sign-in', '/sign-in', {locale})
        }

        return () => setLoading(true)
    }, []);

    return <PageLoading isLoading={loading}/>
}

export default SignOutPage

SignOutPage.Layout = EmptyLayout
SignOutPage.Title = 'sign_out'

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ? locale : 'en-US', ["common"]))
        }
    }
}