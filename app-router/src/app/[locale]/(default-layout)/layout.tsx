import localFont from "next/font/local";
import "@/app/styles/globals.scss";
import {unstable_setRequestLocale} from "next-intl/server";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

const geistSans = localFont({
    src: "../../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function RootLayout({
                                       children,
                                       params: {locale}
                                   }: Readonly<{
    children: React.ReactNode;
    params: { locale: string }
}>) {
    unstable_setRequestLocale(locale);
    return (
        <DefaultLayout>
            {children}
        </DefaultLayout>
    );
}
