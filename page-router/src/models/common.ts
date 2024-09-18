import {UserRoleName} from "@/models/UserType";
import {ReactElement, ReactNode} from "react";
import {NextPage} from "next";
import {AppProps} from "next/app";

export type LayoutPropsType = {
    children: ReactNode
    openSidebar?: boolean
    title?: string
    role?: UserRoleName | UserRoleName[]
}

export interface LayoutProps {
    children: ReactNode,
    openSidebar?: boolean
}

export type NextPageWithLayout = NextPage & {
    Layout?: (props: LayoutProps) => ReactElement
    Title?: string
    Role?: UserRoleName | UserRoleName[]
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}