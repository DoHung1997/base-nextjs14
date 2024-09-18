import "@/styles/globals.css";
import {appWithTranslation, useTranslation} from "next-i18next";
import {AppPropsWithLayout} from "@/models";
import React, {Suspense, useEffect, useState} from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import {wrapper} from "@/store";
import EmptyLayout from "@/components/layouts/EmptyLayout";
import {storageSet} from "@/helpers";
import {StorageKey} from "@/constants";
import {Provider} from "react-redux";
import {AppContext} from "@/context";
import PageLoading from "@/components/PageLoading";

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const App = ({Component, ...rest}: AppPropsWithLayout) => {
    const {t} = useTranslation()
    const {locale} = useRouter()
    const {store, props} = wrapper.useWrappedStore(rest)
    const {pageProps} = props

    // page loading
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [titlePage, setTitlePage] = useState<string | undefined>(undefined);

    const setLoading = (value: boolean) => {
        setIsLoading(value)
    }

    // open sidebar menu
    const [openSidebar, setOpenSidebar] = useState<boolean>(true)

    const Layout = Component.Layout ?? EmptyLayout
    const title = Component.Title

    useEffect(() => {
        setLoading(true)
        require('antd/lib')
        setLoading(false)
    }, []);

    useEffect(() => {
        storageSet(StorageKey.LOCALE, locale ? locale : 'en-US')
    }, [locale])

    return <main className='main' id='top'>
        <Head>
            <title>{title ? `${t(title)} | ${process.env.NEXT_PUBLIC_APP_NAME}` : process.env.NEXT_PUBLIC_APP_NAME}</title>
            <meta name='viewport' content='width=device-width, initial-scale=1'/>
        </Head>

        <Provider store={store}>
            <AppContext.Provider value={{isLoading, setLoading, title: titlePage, setTitle: setTitlePage}}>
                <div style={{position: 'relative', width: '100%', minHeight: '100vh'}}>
                    <PageLoading/>
                    {isLoading ? (
                        <></>
                    ) : (
                        <Layout openSidebar={openSidebar} title={Component.Title ?? ''} role={Component?.Role}>
                            <Component {...pageProps} suppressHydrationWarning/>
                        </Layout>
                    )}
                    <ToastContainer/>
                </div>
            </AppContext.Provider>
        </Provider>
    </main>
}

export default appWithTranslation(App);