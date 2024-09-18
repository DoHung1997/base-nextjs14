import React from 'react';
import PrivateLayout from "@/components/layouts/PrivateLayout";
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import UnauthorizedLayout from "@/components/layouts/UnauthorizedLayout";

const SignUpPage = () => {
    return (
        <>
            123
        </>
    );
}

export default SignUpPage

SignUpPage.Layout = UnauthorizedLayout
SignUpPage.Title = 'sign_up'

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ? locale : 'en-US', ["common"]))
        }
    }
}

