export const generateText = (text: any) => {
    const arr = text.split('\n');
    let newText = ''
    arr.map((txt: string, index: number) => newText += `${txt}${index < arr.length - 1 ? '<br>' : ''}`)
    return '<div>' + newText + '</div>'
}

export const generateRandomPassword = (length: number = 12) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&_()";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return `AddIn2024@${password}`;
};

export const getPasswordStrength = (password: string) => {
    const regexStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    const regexMedium = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]/;

    if (regexStrong.test(password)) {
        return 'strong';
    } else if (regexMedium.test(password)) {
        return 'medium';
    } else {
        return 'weak';
    }
};