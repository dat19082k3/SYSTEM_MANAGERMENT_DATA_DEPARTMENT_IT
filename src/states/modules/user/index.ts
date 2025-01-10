import {createSlice} from "@reduxjs/toolkit";
import {DataFilterType} from "@/states/modules/science";


export type DataUserType = {
    id?: any,
    name: string,
    email: string,
    phone?: string,
    role_ids: Array<number>,
    status: string,
    password: string,
    confirm_password: string
}

export type ErrorUserType = {
    name: string,
    email: string,
    phone: string,
    role_ids: string,
    status: string,
    password: string,
    confirm_password: string
}

export type DataChangePassUserType = {
    id?: number | null,
    new_password: string,
    confirm_password: string,
}

export type ErrorChangePassUserType = {
    new_password: string,
    confirm_password: string,
}

export type UserStateType = {
    visibleModalCreOrUpd: boolean,
    visibleModalDelete: boolean,
    visibleModalChangePass: boolean,
    isLoadingTableUser: boolean,
    isLoadingBtnCreOrUpd: boolean,
    isLoadingBtnDelete: boolean,
    isLoadingBtnChangePassword: boolean,
    dataUser: DataUserType,
    errorDataUser: ErrorUserType,
    dataChangePassUser: DataChangePassUserType,
    errorDataChangePassUser: {
        new_password: string,
        confirm_password: string,
    },
    dataFilter: DataFilterType,
    paginationListUsers: {
        currentPage: number,
        perPage: number,
        totalRecord: number,
    },
    users: Array<any>,
}

export const initDataUser: DataUserType = {
    name: "",
    email: "",
    phone: "",
    role_ids: [],
    status: "",
    password: "",
    confirm_password: ""
}

export const initErrorUser: ErrorUserType = {
    name: "",
    email: "",
    phone: "",
    role_ids: "",
    status: "",
    password: "",
    confirm_password: ""
}

export const initUserState: UserStateType = {
    visibleModalCreOrUpd: false,
    visibleModalDelete: false,
    visibleModalChangePass: false,
    isLoadingTableUser: false,
    isLoadingBtnCreOrUpd: false,
    isLoadingBtnDelete: false,
    isLoadingBtnChangePassword: false,
    dataUser: initDataUser,
    errorDataUser: initErrorUser,
    dataChangePassUser: {
        new_password: "",
        confirm_password: "",
    },
    errorDataChangePassUser: {
        new_password: "",
        confirm_password: "",
    },
    dataFilter: {
        search: "",
        perPage: 20,
        page: 1,
        sortField: "name",
        sortOrder: "asc"
    },
    paginationListUsers: {
        currentPage: 1,
        perPage: 20,
        totalRecord: 0,
    },
    users: []
}

const
    userSlice = createSlice({
        name: "user",
        initialState: initUserState,
        reducers:
            {
                setVisibleModalCreOrUpdUser: (state, action) => ({
                    ...state,
                    visibleModalCreOrUpd: action.payload,
                }),
                setVisibleModalDeleteUser:
                    (state, action) => ({
                        ...state,
                        visibleModalDelete: action.payload,
                    }),
                setVisibleModalChangePass:
                    (state, action) => ({
                        ...state,
                        visibleModalChangePass: action.payload,
                    }),
                setDataUser:
                    (state, action) => ({
                        ...state,
                        dataUser: action.payload,
                    }),
                setErrorDataUser:
                    (state, action) => ({
                        ...state,
                        errorDataUser: action.payload,
                    }),
                setDataChangePassUser:
                    (state, action) => ({
                        ...state,
                        dataChangePassUser: action.payload,
                    }),
                setErrorDataChangePassUser:
                    (state, action) => ({
                        ...state,
                        errorDataChangePassUser: action.payload,
                    }),
                getListUser:
                    (state) => ({
                        ...state,
                        users: [],
                        isLoadingTableUser: true,
                        paginationListUsers: {
                            currentPage: 1,
                            perPage: 20,
                            totalRecord: 0,
                        },
                    }),
                getListUserSuccess:
                    (state, action) => ({
                        ...state,
                        isLoadingTableUser: false,
                        users: action.payload.data.users,
                        paginationListUsers: {
                            currentPage: action.payload.data.page,
                            perPage: action.payload.data.per_page,
                            totalRecord: action.payload.data.total,
                            sortField: action.payload.data.sort_field,
                            sortOrder: action.payload.data.sort_order
                        },
                    }),
                getListUserFailure:
                    (state) => ({
                        ...state,
                        users: [],
                        isLoadingTableUser: false,
                    }),
                changeStatusUser:
                    (state) => ({
                        ...state,
                        status: "",
                    }),
                changeStatusUserSuccess:
                    (state, action) => ({
                        ...state,
                        status: action.payload,
                    }),
                changeStatusUserFail:
                    (state) => ({
                        ...state,
                        status: "",
                    }),
                setDataFilter:
                    (state, action) => ({
                        ...state,
                        dataFilter: action.payload,
                    }),
                setPaginationListUsers:
                    (state, action) => ({
                        ...state,
                        paginationListUsers: action.payload,
                    }),
                creOrUpdUser:
                    (state) => ({
                        ...state,
                        isLoadingBtnCreOrUpd: true,
                    }),
                creOrUpdUserSuccess:
                    (state) => ({
                        ...state,
                        isLoadingBtnCreOrUpd: false,
                    }),
                creOrUpdUserFail:
                    (state) => ({
                        ...state,
                        isLoadingBtnCreOrUpd: false,
                    }),
                deleteUser:
                    (state) => ({
                        ...state,
                        isLoadingBtnDelete: true,
                    }),
                deleteUserSuccess:
                    (state) => ({
                        ...state,
                        isLoadingBtnDelete: false,
                    }),
                deleteUserFail:
                    (state) => ({
                        ...state,
                        isLoadingBtnDelete: false,
                    }),
                changePasswordUser:
                    (state) => ({
                        ...state,
                        isLoadingBtnChangePassword: true,
                    }),
                changePasswordUserSuccess:
                    (state) => ({
                        ...state,
                        isLoadingBtnChangePassword: false,
                    }),
                changePasswordUserFail:
                    (state) => ({
                        ...state,
                        isLoadingBtnChangePassword: false,
                    }),
            }
        ,
    })
;

export const {
    setVisibleModalCreOrUpdUser,
    setVisibleModalDeleteUser,
    setVisibleModalChangePass,
    setDataUser,
    setErrorDataUser,
    setDataChangePassUser,
    setErrorDataChangePassUser,
    getListUser,
    getListUserSuccess,
    getListUserFailure,
    changeStatusUser,
    changeStatusUserSuccess,
    changeStatusUserFail,
    setDataFilter,
    creOrUpdUser,
    creOrUpdUserSuccess,
    creOrUpdUserFail,
    deleteUser,
    deleteUserSuccess,
    deleteUserFail,
    changePasswordUser,
    changePasswordUserSuccess,
    changePasswordUserFail,
} = userSlice.actions;
export default userSlice.reducer;
