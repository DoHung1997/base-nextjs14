import React, {useCallback, useEffect} from 'react';
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import UnauthorizedLayout from "@/components/layouts/UnauthorizedLayout";
import styles from '@/styles/SignInPage.module.scss'
import {useTranslation} from "next-i18next";
import LoginForm from "@/components/LoginForm";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {logoutAuthAction, selectAuth} from "@/store/slices";
import {useRouter} from "next/router";
import {StorageKey} from "@/constants";
import {errorToast, storageSet, successToast} from "@/helpers";

const SignInPage = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const {locale, push} = useRouter()
    const {data, isSuccess} = useAppSelector(selectAuth)

    useEffect(() => {
        dispatch(logoutAuthAction())
    }, []);

    const handleSuccessLogin = useCallback(async () => {
        if (data) {
            successToast(t('sign_in_successfully', {ns: 'sign-in'} ))
            await push('/', '/', {locale})
        } else {
            errorToast(t('sign_in_error', {ns: 'sign-in'}))
        }
    }, [data, locale, push, t])

    useEffect(() => {
        if (isSuccess) {
            handleSuccessLogin()
        }
    }, [isSuccess])

    return (
        <div className={styles.formCard}>
            <h1 className={styles.title}>{t('sign_in')}</h1>
            <LoginForm />
        </div>
    );
}

export default SignInPage

SignInPage.Layout = UnauthorizedLayout
SignInPage.Title = 'sign_in'

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ? locale : 'en-US', ["common", 'sign-in']))
        }
    }
}

