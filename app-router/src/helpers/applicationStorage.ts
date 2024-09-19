import Cookies from 'js-cookie';

export const cookieGet = (key: string, parseItem: boolean = false) => {
    try {
        const valueStr = Cookies.get(key);
        if (!valueStr) return null;
        if (parseItem) return JSON.parse(valueStr);
        return valueStr;
    } catch (err) {
        // error(`Error get storage data [${key}]`, err);
        return null;
    }
};

export const cookieSet = (key: string, value: string) => {
    Cookies.set(key, value);
    // window.dispatchEvent(new CustomEvent('storage', { detail: key }));
};

export const cookieRemove = (key: string) => {
    return Cookies.remove(key);
};
export const storageGet = (key: string, parseItem: boolean = false) => {
    try {
        const valueStr = localStorage.getItem(key);
        if (!valueStr) return null;
        if (parseItem) return JSON.parse(valueStr);
        return valueStr;
    } catch (err) {
        return null;
    }
};

export const storageSet = (key: string, value: string) => {
    localStorage.setItem(key, value);
};

export const storageRemove = (key: string) => {
    return localStorage.removeItem(key);
};