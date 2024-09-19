"use client"

import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider, useTheme} from "next-themes";
import {getMessages, unstable_setRequestLocale} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";
import {useEffect} from "react";

type ProvidersPropsType = { children: React.ReactNode, locale: string }

const RootProviders = async ({children, locale}: ProvidersPropsType) => {
    // Providing all messages to the client
    // side is the easiest way to get started
    unstable_setRequestLocale(locale);
    const messages = await getMessages();
    const {theme, setTheme} = useTheme()

    useEffect(() => {
        setTheme("dark")
    }, []);

    return (
        <NextIntlClientProvider messages={messages}>
            <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme={theme}>
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </NextIntlClientProvider>
    )
}

export default RootProviders