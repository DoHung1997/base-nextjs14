import {Alert, Button, Form, Input} from 'antd/lib';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from "next-i18next";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {login} from "@/store/actions";
import {selectAuth} from "@/store/slices";


type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};


const LoginForm = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()

    const {isFetching, isError, errorMessage} = useAppSelector(selectAuth)

    const [errorMsg, setErrorMsg] = useState<string[]>([])

    useEffect(() => {
        if (isError) {
            setErrorMsg(errorMessage)
        } else {
            setErrorMsg([])
        }
    }, [isError])

    const handleSubmitForm = useCallback(async (values: any) => {
        setErrorMsg([])
        dispatch(login(values));
    }, [dispatch])

    const renderErrorMsg = useCallback(() => {
        if (errorMsg.length < 1) return null;
        return <Alert
            style={{marginBottom: 18}}
            type='error'
            message={<b>{t('sign_in_failed', {ns: 'sign-in'})}</b>}
            description={errorMsg.map((msg: string, index: number) => <span key={index}>&bull; {msg}</span>)}
            showIcon={true}/>;

    }, [errorMsg, t])

    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleSubmitForm}
            autoComplete="off"
            layout="vertical"
        >
            {renderErrorMsg()}
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: t('username_required') }]}
            >
                <Input placeholder={t('username')} size='large'/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: t('password_required') }]}
            >
                <Input.Password placeholder={t('password')} size='large'/>
            </Form.Item>

            <Form.Item style={{width: '100%', textAlign: 'center'}}>
                <Button type="primary" htmlType="submit" size='large' loading={isFetching}>
                    {t('sign_in')}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;