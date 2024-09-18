import styles from "./page.module.css";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
    const t = await getTranslations({locale, namespace: 'HomePage'});

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('og.title'),
            description: t('og.description'),
        },
        // Add other metadata fields as needed
    };
}

export default function Home({params: {locale}}: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = useTranslations("HomePage")

    return (
        <div className={styles.page}>
            {t('title')}
        </div>
    );
}
