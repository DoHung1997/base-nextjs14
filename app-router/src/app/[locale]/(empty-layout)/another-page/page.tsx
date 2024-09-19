import React from 'react';
import {Metadata} from "next";
import {useTranslations} from "next-intl";

export const metadata: Metadata = {
    title: "Another"
}

const AnotherPage = () => {
    const t = useTranslations("HomePage")

    return (
        <div>
            {t('about')}
        </div>
    );
};

export default AnotherPage;