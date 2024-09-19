import {Metadata} from "next";

import {routing} from "@/i18n/routing";
import RootProviders from "@/app/providers";


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

    return (
        <html lang={locale}>
        <body>
        <RootProviders locale={locale}>
            {children}
        </RootProviders>
        </body>
        </html>
    );
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}