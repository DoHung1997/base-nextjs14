import React from 'react';
import Link from "next/link";
import classNames from "classnames/bind";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";

import styles from './Header.module.scss'

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <Navbar shouldHideOnScroll className={cx('navbar-container', 'w-full')}>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarBrand className="hidden sm:flex gap-4 justify-center">
                <Link href="#" aria-current="page">
                    <p className="font-bold text-inherit">ACME</p>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Header;