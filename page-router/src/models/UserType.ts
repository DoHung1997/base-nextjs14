export type UserType = UserLoginType & {

}

export type UserLoginType = {
    id: string
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    company: string,
    country: string,
    phoneNumber?: string,
    picture?: string,
    roles: string[],
    registerType?: number,
    lastLogin?: Date,
    status: UserStatus,
}

export enum UserStatus {
    Unknown = -1,
    Active,
    Newest,
    Locked,
    EmailPending,
}

export enum UserRoleName {
    SuperAdmin = 'superadmin',
    Admin = 'admin',
    Mod = 'mod',
    User = 'user',
}

export type UserRoleCount = {
    role: string,
    count: number
}