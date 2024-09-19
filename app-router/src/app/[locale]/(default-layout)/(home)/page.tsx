import {getTranslations} from "next-intl/server";
import {useTranslations} from "next-intl";
import classNames from "classnames/bind";

import styles from "./page.module.css";
import {Button} from "@nextui-org/react";

const cx = classNames.bind(styles);

export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
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

export default function Home() {
    const t = useTranslations("HomePage")

    return (
        <div className={cx('page', 'text-3xl font-bold underline')}>
            <Button>{t('title')}</Button>
        </div>
    );
}
