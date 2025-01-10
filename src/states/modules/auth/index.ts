import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AuthType = {
    isAuthSuccess: boolean,
    authUser: {
        id?: number,
        email?: string,
        name?: string,
        phone?: string | null,
        status?: number,
        protected?: number,
        permissions?: Array<string>
    },
    errorLogin: ErrorLoginType,
    isLoadingBtnLogin: false,
    errorForgotPassword: {
        email: string
    },
    isLoadingBtnForgotPassword: boolean,
    errorRsPassword: ErrorRsPasswordType,
    isLoadingBtnResetPassword: boolean,
    isLoadingBtnLogout: boolean,
}

export type ErrorLoginType = {
    email: string,
    password: string
}

export type ErrorRsPasswordType = {
    password: string,
    confirmPassword: string,
}

export const initAuth: AuthType = {
    isAuthSuccess: false,
    authUser: {},
    errorLogin: {
        email: "",
        password: ""
    },
    isLoadingBtnLogin: false,
    errorForgotPassword: {
        email: ""
    },
    isLoadingBtnForgotPassword: false,
    errorRsPassword: {
        password: "",
        confirmPassword: ""
    },
    isLoadingBtnResetPassword: false,
    isLoadingBtnLogout: false,
}


const authSlice = createSlice({
    name: 'auth',
    initialState: initAuth,
    reducers: {
        setErrorLogin: (state: AuthType, action: PayloadAction<ErrorLoginType>) => ({
            ...state,
            errorLogin: action.payload
        }),
        startRequestLogin: (state: any) => ({
            ...state,
            isLoadingBtnLogin: true
        }),
        requestLoginSuccess: (state) => ({
            ...state,
            isLoadingBtnLogin: false
        }),
        requestLoginFail: (state) => ({
            ...state,
            isLoadingBtnLogin: false
        }),
        startRequestGetMe: (state) => ({
            ...state,
        }),
        requestGetMeSuccess: (state, action) => {
            return {
                ...state,
                isAuthSuccess: true,
                authUser: action.payload.data
            };
        },
        requestGetMeFail: (state) => ({
            ...state,
            isAuthSuccess: false,
            authUser: {}
        }),
        setErrorForgotPassword: (state, action) => ({
            ...state,
            errorForgotPassword: action.payload
        }),
        startRequestForgotPassword: (state) => ({
            ...state,
            isLoadingBtnForgotPassword: true
        }),
        requestForgotPasswordSuccess: (state) => ({
            ...state,
            isLoadingBtnForgotPassword: false
        }),
        requestForgotPasswordFail: (state) => ({
            ...state,
            isLoadingBtnForgotPassword: false
        }),
        setErrorResetPassword: (state, action) => ({
            ...state,
            errorRsPassword: action.payload
        }),
        startRequestLogout: (state) => ({
            ...state,
            isLoadingBtnLogout: true
        }),
        requestLogoutSuccess: (state) => ({
            ...state,
            isLoadingBtnLogout: false
        }),
        requestLogoutFail: (state) => ({
            ...state,
            isLoadingBtnLogout: false
        }),
        startRequestResetPassword: (state) => ({
            ...state,
            isLoadingBtnResetPassword: true
        }),
        requestResetPasswordSuccess: (state) => ({
            ...state,
            isLoadingBtnResetPassword: false
        }),
        requestResetPasswordFail: (state) => ({
            ...state,
            isLoadingBtnResetPassword: false
        }),
        setAuthSuccess: (state, action) => ({
            ...state,
            isAuthSuccess: action.payload
        }),
    }
})

export const {
    setErrorLogin, setErrorForgotPassword, setErrorResetPassword, setAuthSuccess,
    startRequestLogin, requestLoginSuccess, requestLoginFail,
    startRequestGetMe, requestGetMeSuccess, requestGetMeFail,
    startRequestLogout,requestLogoutSuccess,requestLogoutFail,
    startRequestForgotPassword, requestForgotPasswordSuccess, requestForgotPasswordFail,
    startRequestResetPassword, requestResetPasswordSuccess, requestResetPasswordFail,
} = authSlice.actions

export default authSlice.reducer;
