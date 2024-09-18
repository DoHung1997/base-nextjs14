import React, {useEffect, useState} from 'react';
import {LayoutPropsType} from "@/models";
import {Watermark} from "antd/lib";
import styles from './UnauthorizedLayout.module.scss'
import {useRouter} from "next/router";
import {storageGet} from "@/helpers";
import {StorageKey} from "@/constants";
import PageLoading from "@/components/PageLoading";

const UnauthorizedLayout = ({children, openSidebar, title, role}: LayoutPropsType) => {
    const {push, locale} = useRouter()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const user = storageGet(StorageKey.USER)
        const token = storageGet(StorageKey.TOKEN)

        if (user && token) {
            push('/', '/', {locale})
        } else {
            setLoading(false)
        }
    }, [])

    if (loading) return <PageLoading isLoading={true}/>
    return (
        <Watermark content={process.env.NEXT_PUBLIC_APP_NAME}>
            <div className={styles.wrapper}>
                {children}
            </div>
        </Watermark>
    );
};

export default UnauthorizedLayout;