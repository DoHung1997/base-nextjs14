'use client'

import React, {useCallback} from 'react';
import styles from './PrivateLayout.module.scss'
import {Button} from "antd/lib";
import {AiOutlineUser} from "react-icons/ai";
import {FiLogOut} from "react-icons/fi";
import {useRouter} from "next/router";

const Header = () => {
    const {locale, push} = useRouter()

    const handleSignOut = useCallback(async () => {
        await push('/sign-out', '/sign-out', {locale})
    }, [push, locale])

    return (
        <div className={styles.header}>
            <div className={styles.headerLogo}>
                Logo
            </div>
            <div className={styles.headerBtnGroup}>
                <Button icon={<AiOutlineUser size={25}/>} className={styles.headerBtnNone}/>
                <Button icon={<FiLogOut size={25}/>} className={styles.headerBtn} onClick={handleSignOut}/>
            </div>
        </div>
    );
};

export default Header;