import callApi from '@/api/callApi'
import {
    changePasswordUser, changePasswordUserFail,
    changePasswordUserSuccess,
    changeStatusUser,
    changeStatusUserFail,
    changeStatusUserSuccess, creOrUpdUser, creOrUpdUserFail, creOrUpdUserSuccess,
    deleteUser,
    deleteUserFail,
    deleteUserSuccess,
    getListUser,
    getListUserFailure,
    getListUserSuccess,
} from '@/states/modules/user'
import _ from 'lodash'
import {DataFilterType} from "@/states/modules/science";

export const getListUsers: Function = (dataFilter: DataFilterType) => async (dispatch: any, getState: any) => {
    let path = `/users`

    if (dataFilter?.perPage && dataFilter?.page) {
        path += `?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

        if (dataFilter.search) {
            path += `&search=${dataFilter.search}`;
        }
    }

    if (dataFilter?.sortOrder) {
        path += `&sort_order=${dataFilter.sortOrder}&sort_field=${dataFilter.sortField}`
    }

    return callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [
            getListUser,
            getListUserSuccess,
            getListUserFailure
        ],
        variables: {},
        dispatch,
        getState,
    })
}

export const handleCreateUser: Function = (data: any) => async (dispatch: any, getState: any) => {
    for (const key in data) {
        if (data[key] === null || data[key] === undefined || data[key] === "") {
            delete data[key];
        }
    }

    return callApi({
        method: 'post',
        apiPath: 'users',
        actionTypes: [
            creOrUpdUser,
            creOrUpdUserSuccess,
            creOrUpdUserFail
        ],
        variables: {...data},
        dispatch,
        getState,
    })
}

export const handleUpdateUser: Function = (id: any, data: any) => async (dispatch: any, getState: any) => {
    let dataUser = _.cloneDeep(data)
    delete dataUser?.id

    return callApi({
        method: 'put',
        apiPath: `users/${id}`,
        actionTypes: [
            creOrUpdUser,
            creOrUpdUserSuccess,
            creOrUpdUserFail
        ],
        variables: {...dataUser},
        dispatch,
        getState,
    })
}

export const handleChangeStatusUser: Function = (id: number, data: any) => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'patch',
        apiPath: `users/status/${id}`,
        actionTypes: [
            changeStatusUser,
            changeStatusUserSuccess,
            changeStatusUserFail
        ],
        variables: {
            status: data,
        },
        dispatch,
        getState,
    })
}

export const handleChangePassUser: Function = (id: number, data: any) => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'patch',
        apiPath: `/users/change-password/${id}`,
        actionTypes: [
            changePasswordUser,
            changePasswordUserSuccess,
            changePasswordUserFail
        ],
        variables: {
            ...data,
        },
        dispatch,
        getState,
    })
}

export const handleDeleteUser: Function = (id: number) => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'delete',
        apiPath: `users/${id}`,
        actionTypes: [
            deleteUser,
            deleteUserSuccess,
            deleteUserFail
        ],
        variables: {},
        dispatch,
        getState,
    })
}
