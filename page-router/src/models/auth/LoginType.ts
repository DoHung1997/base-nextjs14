import {UserLoginType} from "@/models";

export type LoginType = {
    accessToken: string,
    expires?: Date,
    expiryIn: number,
    permission: string,
    refreshToken: string,
    tokenType: string,
    user: UserLoginType
    newest?: boolean
}

export type RequestLoginType = {
    username: string,
    password: string
}

export type ResponseLoginType = {
    success: boolean,
    result: LoginType,
    errors: string[]
}

