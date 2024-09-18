import PrivateLayout from "@/components/layouts/PrivateLayout";
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styles from '@/styles/Home.module.scss'
import {useTranslation} from "next-i18next";
import {Button, Space} from "antd/lib";
import PlusOutlined from "@ant-design/icons/PlusOutlined";

const HomePage = () => {
    const {t} = useTranslation()


    return (
        <div className={styles.homeWrapper}>
            <div className={styles.homeCard}>
                <div className={styles.cardTitle}>
                    <h2 className={styles.title}>
                        {t('projects')}
                    </h2>
                    <Space>
                        <Button type={'primary'} icon={<PlusOutlined/>}>{t('create_project')}</Button>
                    </Space>
                </div>
            </div>
        </div>
    );
}

export default HomePage

HomePage.Layout = PrivateLayout
HomePage.Title = 'home'

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ? locale : 'en-US', ["common", 'home']))
        }
    }
}

