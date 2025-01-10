const AUTH_TOKEN_STORE_KEY = 'token';

export const removeAuthToken = () => {
    return localStorage.removeItem(AUTH_TOKEN_STORE_KEY);
}

export const setAuthToken = (token:string) => {
    return localStorage.setItem(AUTH_TOKEN_STORE_KEY, token);
}

export const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN_STORE_KEY)
}

export const hasAuthToken = () => {
    return !!getAuthToken();
}