'use client'

import React, {useEffect} from "react";
import {NextIntlClientProvider} from "next-intl";
import type {AbstractIntlMessages} from 'use-intl'
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider, useTheme} from "next-themes";
import AppContextProvider from "@/context/AppContext/AppContextProvider";
import StoreProviders from "@/store/StoreProviders";

type ProvidersPropsType = { children: React.ReactNode, locale: string, messages: AbstractIntlMessages }

const RootProviders = ({children, locale, messages}: ProvidersPropsType) => {
    const {theme, setTheme} = useTheme()

    useEffect(() => {
        setTheme("dark")
    }, []);

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <StoreProviders>
                <AppContextProvider>
                    <NextUIProvider>
                        <NextThemesProvider attribute="class" defaultTheme={theme}>
                            {children}
                        </NextThemesProvider>
                    </NextUIProvider>
                </AppContextProvider>
            </StoreProviders>
        </NextIntlClientProvider>
    )
}

export default RootProviders