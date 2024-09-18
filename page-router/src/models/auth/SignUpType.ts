export type RequestSignUpType = {
    firstName: string,
    lastName: string
    email: string
    password: string
    confirmPassword: string
    company: string
    country: string
    isAcceptTerm: boolean
    captcha: boolean
}

export type ResponseSignUpType = {
    success: boolean,
    result: {mailSent: boolean},
    errors: string[]
}

export type RequestActiveCodeType = {
    code?: string,
}

export type ResponseActiveCodeType = {
    success: boolean,
    result: { active: boolean },
    errors: string[]
}
