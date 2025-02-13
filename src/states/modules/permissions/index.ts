import {createSlice} from "@reduxjs/toolkit";

export type QueryEmployeeWithoutRoleType = {
    q: string,
    page: number,
    page_size: number

}

export type InfoEmployeeIdsType = {
    employee_ids: Array<any>
}

export type InfoRoleType = {
    id?: number,
    name: string,
    description: string,
    parent_id: string | null
}

export type InfoRoleSelectedType = {
    id?: number | undefined,
    name: string,
    description: string,
    parent_id?: number | null,
    protected?: number,
    children?: any
}

export type InfoEmployeeSelectedType = {
    id?: number,
    name: string,
    email: string,
}

export type EmployeeIdsErrType = {
    employee_ids: string
}

export type ErrorCreateOrUpdateRoleType = {
    id?: number
    name: string,
    description: string
}

export type ConfigModalType = {
    title: string,
    type: string,
}

export type permissionsType = {
    isLoadingListRole: boolean,
    isLoadingListType: boolean,
    isLoadingBtnDeleteRole: boolean,
    isLoadingListPermission: boolean,
    isLoadingListEmployeeOfRole: boolean,
    isLoadingBtnAddEmployeeOfRole: boolean,
    isLoadingBtnCreateOrUpdateRole: boolean,
    isLoadingBtnDeleteEmployeeOfRole: boolean,
    isLoadingBtnUpdatePermissionRole: boolean,
    isLoadingListEmployeeWithoutRole: boolean,

    visibleModalDeleteRole: boolean,
    visibleModalAddEmployeeOfRole: boolean,
    visibleModalCreateOrUpdateRole: boolean,
    visibleModalDeleteEmployeeOfRole: boolean,

    rolesList: Array<any>,
    typesList: Array<any>,
    employeeOfRoleList: Array<any>,
    employeeWithoutRoleList: Array<any>,
    permissionList: Array<any>,

    infoEmployeeIds: InfoEmployeeIdsType,
    infoRole: InfoRoleType,
    infoRoleSelected: InfoRoleSelectedType,
    infoEmployeeSelected: InfoEmployeeSelectedType,
    infoPermissionRoleSelected: any,

    employeeIdsErr: EmployeeIdsErrType,
    errorCreateOrUpdateRole: ErrorCreateOrUpdateRoleType,

    queryEmployeeWithoutRole: QueryEmployeeWithoutRoleType,

    configModal: ConfigModalType,
}

export const initialQueryEmployeeWithoutRole: QueryEmployeeWithoutRoleType = {
    q: "",
    page: 1,
    page_size: 20
}

export const initialState: permissionsType = {
    isLoadingListRole: false,
    isLoadingListType: false,
    isLoadingBtnDeleteRole: false,
    isLoadingListPermission: false,
    isLoadingListEmployeeOfRole: false,
    isLoadingBtnAddEmployeeOfRole: false,
    isLoadingBtnCreateOrUpdateRole: false,
    isLoadingBtnDeleteEmployeeOfRole: false,
    isLoadingBtnUpdatePermissionRole: false,
    isLoadingListEmployeeWithoutRole: false,

    visibleModalDeleteRole: false,
    visibleModalAddEmployeeOfRole: false,
    visibleModalCreateOrUpdateRole: false,
    visibleModalDeleteEmployeeOfRole: false,

    rolesList: [],
    typesList: [],
    employeeOfRoleList: [],
    employeeWithoutRoleList: [],
    permissionList: [],

    infoEmployeeIds: {
        employee_ids: []
    },
    infoRole: {
        name: "",
        description: "",
        parent_id: ""
    },
    infoRoleSelected: {
        name: "",
        description: ""
    },
    infoEmployeeSelected: {
        name: "",
        email: "",
    },
    infoPermissionRoleSelected: {},

    employeeIdsErr: {
        employee_ids: ""
    },
    errorCreateOrUpdateRole: {
        name: "",
        description: ""
    },

    queryEmployeeWithoutRole: initialQueryEmployeeWithoutRole,

    configModal: {
        title: "",
        type: "",
    },
}

const permissionsSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
        setInfoRole: (state, action) => ({
            ...state,
            infoRole: action.payload,
        }),
        setInfoRoleSelected: (state, action) => ({
            ...state,
            infoRoleSelected: action.payload,
        }),
        setConfigModal: (state, action) => ({
            ...state,
            configModal: action.payload,
        }),
        setVisibleModalCreateOrUpdateRole: (state, action) => ({
            ...state,
            visibleModalCreateOrUpdateRole: action.payload
        }),
        setErrorCreateOrUpdateRole: (state, action) => ({
            ...state,
            errorCreateOrUpdateRole: action.payload
        }),
        setDataFilterRole: (state, action) => ({
            ...state,
            dataFilter: action.payload
        }),

        //Role
        requestCreateRole: state => ({
            ...state,
            isLoadingBtnCreateOrUpdateRole: true
        }),
        requestCreateRoleSuccess: (state) => ({
            ...state,
            isLoadingBtnCreateOrUpdateRole: false,
            visibleModalCreateOrUpdateRole: false
        }),
        requestCreateRoleFail: (state) => ({
            ...state,
            isLoadingBtnCreateOrUpdateRole: false
        }),
        requestGetListRole: (state) => ({
            ...state,
            isLoadingListRole: true
        }),
        requestGetRoleSuccess: (state, action) => ({
            ...state,
            isLoadingListRole: false,
            rolesList: action.payload.data,
        }),
        requestGetRoleFail: (state) => ({
            ...state,
            isLoadingListRole: false,
            rolesList: [],
        }),
        requestUpdateRole: state => ({
            ...state,
            isLoadingBtnCreateOrUpdateRole: true
        }),
        requestUpdateRoleSuccess: (state) => ({
            ...state,
            isLoadingBtnCreateOrUpdateRole: false,
            visibleModalCreateOrUpdateRole: false
        }),
        requestUpdateRoleFail: (state) => ({
            ...state,
            isLoadingBtnCreateOrUpdateRole: false
        }),
        setVisibleModalDeleteRole: (state, action) => ({
            ...state,
            visibleModalDeleteRole: action.payload
        }),
        requestDeleteRole: state => ({
            ...state,
            isLoadingBtnDeleteRole: true
        }),
        requestDeleteRoleSuccess: (state) => ({
            ...state,
            isLoadingBtnDeleteRole: false,
            visibleModalDeleteRole: false
        }),
        requestDeleteRoleFail: (state) => ({
            ...state,
            isLoadingBtnDeleteRole: false
        }),

        //Permission
        requestGetListPermission: (state) => ({
            ...state,
            isLoadingListPermission: true
        }),
        requestGetPermissionSuccess: (state, action) => ({
            ...state,
            isLoadingListPermission: false,
            permissionList: action.payload.data,
        }),
        requestGetPermissionFail: (state) => ({
            ...state,
            isLoadingListPermission: false,
            permissionList: [],
        }),

        //Employee Of Role
        requestGetListEmployeeOfRole: (state) => ({
            ...state,
            isLoadingListEmployeeOfRole: true
        }),
        requestGetEmployeeOfRoleSuccess: (state, action) => ({
            ...state,
            isLoadingListEmployeeOfRole: false,
            employeeOfRoleList: action.payload.data,
        }),
        requestGetEmployeeOfRoleFail: (state) => ({
            ...state,
            isLoadingListEmployeeOfRole: false,
            employeeOfRoleList: [],
        }),
        requestGetListEmployeeWithoutRole: (state) => ({
            ...state,
            isLoadingListEmployeeWithoutRole: true
        }),
        requestGetEmployeeWithoutRoleSuccess: (state, action) => ({
            ...state,
            isLoadingListEmployeeWithoutRole: false,
            employeeWithoutRoleList: action.payload.data,
        }),
        requestGetEmployeeWithoutRoleFail: (state) => ({
            ...state,
            isLoadingListEmployeeWithoutRole: false,
            employeeWithoutRoleList: [],
        }),
        requestDeleteEmployeeOfRole: state => ({
            ...state,
            isLoadingBtnDeleteEmployeeOfRole: true
        }),
        requestDeleteEmployeeOfRoleSuccess: (state) => ({
            ...state,
            isLoadingBtnDeleteEmployeeOfRole: false,
            visibleModalDeleteEmployeeOfRole: false
        }),
        requestDeleteEmployeeOfRoleFail: (state) => ({
            ...state,
            isLoadingBtnDeleteEmployeeOfRole: false
        }),
        setVisibleModalAddEmployeeOfRole: (state, action) => ({
            ...state,
            visibleModalAddEmployeeOfRole: action.payload
        }),
        setVisibleModalDeleteEmployeeOfRole: (state, action) => ({
            ...state,
            visibleModalDeleteEmployeeOfRole: action.payload
        }),
        setInfoEmployeeSelected: (state, action) => ({
            ...state,
            infoEmployeeSelected: action.payload,
        }),
        requestUpdateEmployeeOfRole: state => ({
            ...state,
            isLoadingBtnAddEmployeeOfRole: true
        }),
        requestUpdateEmployeeOfRoleSuccess: (state) => ({
            ...state,
            isLoadingBtnAddEmployeeOfRole: false,
        }),
        requestUpdateEmployeeOfRoleFail: (state) => ({
            ...state,
            isLoadingBtnAddEmployeeOfRole: false
        }),
        setEmployeeIds: (state, action) => ({
            ...state,
            infoEmployeeIds: action.payload,
        }),
        setErrorEmployeeIds: (state, action) => ({
            ...state,
            employeeIdsErr: action.payload
        }),

        //Type
        requestGetListType: (state) => ({
            ...state,
            isLoadingListType: true
        }),
        requestGetTypeSuccess: (state, action) => ({
            ...state,
            isLoadingListType: false,
            typesList: action.payload.data,
        }),
        requestGetTypeFail: (state) => ({
            ...state,
            isLoadingListType: false,
            typesList: [],
        }),

        //Permission Role
        requestUpdateUpdatePermissionRole: state => ({
            ...state,
            isLoadingBtnUpdatePermissionRole: true
        }),
        requestUpdateUpdatePermissionRoleSuccess: (state) => ({
            ...state,
            isLoadingBtnUpdatePermissionRole: false,
            visibleModalAddUpdatePermissionRole: false
        }),
        requestUpdateUpdatePermissionRoleFail: (state) => ({
            ...state,
            isLoadingBtnUpdatePermissionRole: false
        }),
        setInfoPermissionRoleSelected: (state, action) => ({
            ...state,
            infoPermissionRoleSelected: action.payload,
        }),

        setQueryEmployeeWithoutRole: (state, action) => ({
            ...state,
            queryEmployeeWithoutRole: action.payload,
        }),
    }
})

export const {
    setInfoRole,
    setConfigModal,
    setEmployeeIds,
    setDataFilterRole,
    setErrorEmployeeIds,
    setInfoRoleSelected,
    setInfoEmployeeSelected,
    setVisibleModalDeleteRole,
    setErrorCreateOrUpdateRole,
    setQueryEmployeeWithoutRole,
    setInfoPermissionRoleSelected,
    setVisibleModalAddEmployeeOfRole,
    setVisibleModalCreateOrUpdateRole,
    setVisibleModalDeleteEmployeeOfRole,

    requestGetListType, requestGetTypeSuccess, requestGetTypeFail,
    requestGetListRole, requestGetRoleSuccess, requestGetRoleFail,
    requestCreateRole, requestCreateRoleSuccess, requestCreateRoleFail,
    requestUpdateRole, requestUpdateRoleSuccess, requestUpdateRoleFail,
    requestDeleteRole, requestDeleteRoleSuccess, requestDeleteRoleFail,
    requestGetListPermission, requestGetPermissionSuccess, requestGetPermissionFail,
    requestGetListEmployeeOfRole, requestGetEmployeeOfRoleSuccess, requestGetEmployeeOfRoleFail,
    requestDeleteEmployeeOfRole, requestDeleteEmployeeOfRoleSuccess, requestDeleteEmployeeOfRoleFail,
    requestUpdateEmployeeOfRole, requestUpdateEmployeeOfRoleSuccess, requestUpdateEmployeeOfRoleFail,
    requestGetListEmployeeWithoutRole, requestGetEmployeeWithoutRoleSuccess, requestGetEmployeeWithoutRoleFail,
    requestUpdateUpdatePermissionRole, requestUpdateUpdatePermissionRoleSuccess, requestUpdateUpdatePermissionRoleFail,

} = permissionsSlice.actions

export default permissionsSlice.reducer;
