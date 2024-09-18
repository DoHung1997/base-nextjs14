import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import {routing} from "@/i18n/routing";
import {Metadata} from "next";

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
    unstable_setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body>
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}