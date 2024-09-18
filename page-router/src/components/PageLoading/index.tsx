import React, {useContext, useEffect, useState} from 'react';
import styles from './PageLoading.module.scss'
import {useRouter} from "next/router";
import {AppContext} from "@/context";
import {storageGet} from "@/helpers";
import {Spin} from "antd/lib";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";

type PageLoadingProps = {

}

const PageLoading = (props: any) => {
    const {isLoading, setLoading} = useContext(AppContext)
    const router = useRouter();
    const [isDark, setIsDark] = useState<boolean>(false)

    useEffect(() => {
        setIsDark((storageGet('phoenixTheme') ?? 'light') === 'dark')
    });

    useEffect(() => {

        router.events?.on('routeChangeStart', () => {
            const menuBar = document.getElementById('navbarVerticalCollapse')
            if (menuBar) {
                menuBar.classList.remove('show')
            }
            setLoading(true);
        });

        router.events?.on('routeChangeComplete', () => {
            setLoading(false);
        });
    }, [router]);

    if (!isLoading && !props.isLoading) return null;
    return (
        <div className={`${styles.loadingPageWrapper} ${isDark ? styles.dark : styles.light}`}>
            <Spin indicator={
                <LoadingOutlined
                    style={{
                        fontSize: 48,
                    }}
                    spin
                />}
            />
        </div>
    );
};

export default PageLoading;