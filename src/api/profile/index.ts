import callApi from "../callApi.js";
import {
    startRequestUpdateInformation, startRequestUpdateInformationFail, startRequestUpdateInformationSuccess,
    startRequestChangePassword, requestChangePasswordSuccess, requestChangePasswordFail
} from "@/states/modules/profile";
import _ from "lodash";

export const updateMyInformation: Function = (dataInfo: any) => async (dispatch: any, getState: any) => {
    const data = _.cloneDeep(dataInfo)
    delete data.id
    for (const key in data) {
        if (data[key] === null || data[key] === undefined || data[key] === "") {
            delete data[key];
        }
    }

    return callApi({
        method: 'patch',
        apiPath: `/users/profile`,
        actionTypes: [startRequestUpdateInformation, startRequestUpdateInformationSuccess, startRequestUpdateInformationFail],
        variables: data,
        dispatch,
        getState
    })
}

export const changePassword: Function = (id: any, data: any) => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'patch',
        apiPath: `/users/change-password/${id}`,
        actionTypes: [startRequestChangePassword, requestChangePasswordSuccess, requestChangePasswordFail],
        variables: {
            new_password: data.password,
            confirm_password: data.confirm_password
        },
        dispatch,
        getState
    })
}

export const resetPassword: Function = (data: any) => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'patch',
        apiPath: `/users/reset-password`,
        actionTypes: [startRequestChangePassword, requestChangePasswordSuccess, requestChangePasswordFail],
        variables: {
            new_password: data.password,
            confirm_password: data.confirmPassword
        },
        dispatch,
        getState,
        headers: {"Authorization": data.token ? `Bearer ${data.token}` : ""},
    })
}
