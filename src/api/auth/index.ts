import callApi from "../callApi";
import {
    startRequestForgotPassword,
    requestForgotPasswordFail,
    requestForgotPasswordSuccess,
    startRequestGetMe,
    requestGetMeFail,
    requestGetMeSuccess,
    startRequestLogin,
    requestLoginFail,
    requestLoginSuccess,
    startRequestLogout,
    requestLogoutSuccess, requestLogoutFail,
} from "@/states/modules/auth";

export const login: Function = (data: any) => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'post',
        apiPath: `/auth/login`,
        actionTypes: [startRequestLogin, requestLoginSuccess, requestLoginFail],
        variables: {
            email: data.email,
            password: data.password,
        },
        dispatch,
        getState
    })
}

export const getMe: Function = () => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'get',
        apiPath: `/auth/me`,
        actionTypes: [startRequestGetMe, requestGetMeSuccess, requestGetMeFail],
        variables: {},
        dispatch,
        getState
    })
}

export const forgotPassword: Function = (data: any) => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'post',
        apiPath: `/auth/forgot-password`,
        actionTypes: [startRequestForgotPassword, requestForgotPasswordSuccess, requestForgotPasswordFail],
        variables: {
            email: data.email
        },
        dispatch,
        getState
    })
}

export const logout: Function = (token: string) => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'post',
        apiPath: `/auth/logout`,
        actionTypes: [startRequestLogout, requestLogoutSuccess, requestLogoutFail],
        headers: {"Authorization": token ? `Bearer ${token}` : ""},
        variables: {},
        dispatch,
        getState
    })
}