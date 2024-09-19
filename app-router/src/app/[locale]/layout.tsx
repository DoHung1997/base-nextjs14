import {Metadata} from "next";
import {getMessages, unstable_setRequestLocale} from "next-intl/server";

import RootProviders from "@/app/RootProviders";
import {routing} from "@/i18n/routing";


export const metadata: Metadata = {
    title: {
        default: process.env.NEXT_PUBLIC_PROJECT_NAME,
        template: `%s | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`
    }
}

export default async function LocaleLayout({
                                               children,
                                               params: {locale}
                                           }: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();
    unstable_setRequestLocale(locale);

    return (
        <html lang={locale}>
        <body>
        <RootProviders locale={locale} messages={messages} children={children}/>
        </body>
        </html>
    );
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}