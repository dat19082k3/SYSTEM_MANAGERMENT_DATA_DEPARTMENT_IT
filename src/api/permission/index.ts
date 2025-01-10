import callApi from '../callApi.js';
import {
    QueryEmployeeWithoutRoleType,
    requestCreateRole,
    requestCreateRoleFail,
    requestCreateRoleSuccess,
    requestDeleteEmployeeOfRole,
    requestDeleteEmployeeOfRoleFail,
    requestDeleteEmployeeOfRoleSuccess,
    requestDeleteRole,
    requestDeleteRoleFail,
    requestDeleteRoleSuccess,
    requestGetEmployeeOfRoleFail,
    requestGetEmployeeOfRoleSuccess,
    requestGetEmployeeWithoutRoleFail,
    requestGetEmployeeWithoutRoleSuccess,
    requestGetListEmployeeOfRole,
    requestGetListEmployeeWithoutRole,
    requestGetListPermission,
    requestGetListRole,
    requestGetListType,
    requestGetPermissionFail,
    requestGetPermissionSuccess,
    requestGetRoleFail,
    requestGetRoleSuccess,
    requestGetTypeFail,
    requestGetTypeSuccess,
    requestUpdateEmployeeOfRole,
    requestUpdateEmployeeOfRoleFail,
    requestUpdateEmployeeOfRoleSuccess,
    requestUpdateRole,
    requestUpdateRoleFail,
    requestUpdateRoleSuccess,
    requestUpdateUpdatePermissionRole,
    requestUpdateUpdatePermissionRoleFail,
    requestUpdateUpdatePermissionRoleSuccess,
} from '@/states/modules/permissions/index.ts';

export const handleGetRoles: Function = () => async (dispatch: any, getState: any) => {
    return await callApi({
        variables: {},
        method: 'get',
        apiPath: `/roles`,
        actionTypes: [requestGetListRole, requestGetRoleSuccess, requestGetRoleFail],
        dispatch,
        getState
    });
};

export const handleGetAllRoles: Function = () => async (dispatch: any, getState: any) => {
    return await callApi({
        variables: {},
        method: 'get',
        apiPath: `/roles/all-by-protected`,
        actionTypes: [requestGetListRole, requestGetRoleSuccess, requestGetRoleFail],
        dispatch,
        getState
    });
};


export const handleCreateRole: Function = (data: any) => async (dispatch: any, getState: any) => {
    return await callApi({
        method: 'post',
        apiPath: `/roles`,
        actionTypes: [requestCreateRole, requestCreateRoleSuccess, requestCreateRoleFail],
        variables: {
            name: data.name,
            description: data.description,
            parent_id: data.parent_id,
        },
        dispatch,
        getState,
    });
};

export const handleUpdateRole: Function = (permissionId: number, data: any) => async (dispatch: any, getState: any) => {
    return await callApi({
        method: 'put',
        apiPath: `/roles/${permissionId}`,
        actionTypes: [requestUpdateRole, requestUpdateRoleSuccess, requestUpdateRoleFail],
        variables: {
            name: data.name,
            description: data.description,
            parent_id: data.parent_id,
        },
        dispatch,
        getState,
    });
};

export const handleDeleteRole: Function = (roleId: number) => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'delete',
        apiPath: `/roles/${roleId}`,
        actionTypes: [requestDeleteRole, requestDeleteRoleSuccess, requestDeleteRoleFail],
        variables: {},
        dispatch,
        getState,
    });
};

export const handleUpdateAddEmployeeOfRole: Function = (roleId: number, data: any) => async (dispatch: any, getState: any) => {
    return await callApi({
        method: 'put',
        apiPath: `/roles/${roleId}/update-role-user`,
        actionTypes: [
            requestUpdateEmployeeOfRole,
            requestUpdateEmployeeOfRoleSuccess,
            requestUpdateEmployeeOfRoleFail
        ],
        variables: {
            user_ids: data.employee_ids,
        },
        dispatch,
        getState,
    });
};

export const handleGetEmployeeOfRole: Function = (roleId: number) => async (dispatch: any, getState: any) => {
    return await callApi({
        variables: {},
        method: 'get',
        apiPath: `/roles/${roleId}/users`,
        actionTypes: [
            requestGetListEmployeeOfRole,
            requestGetEmployeeOfRoleSuccess,
            requestGetEmployeeOfRoleFail
        ],
        dispatch,
        getState
    });
};

export const handleEmployeeWithoutRole: Function = (roleId: number, query: QueryEmployeeWithoutRoleType) => async (dispatch: any, getState: any) => {
    let path = `/roles/${roleId}/excluded-users`

    return await callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [
            requestGetListEmployeeWithoutRole,
            requestGetEmployeeWithoutRoleSuccess,
            requestGetEmployeeWithoutRoleFail,
        ],
        variables: query,
        dispatch,
        getState,
    });
};

export const handleDeleteEmployeeOfRole: Function = (roleId: number, employeeId: number) => async (dispatch: any, getState: any) => {
    return callApi({
        variables: {
            role_id: roleId,
            user_id: employeeId
        },
        method: 'delete',
        apiPath: `/roles/remove-role-user`,
        actionTypes: [
            requestDeleteEmployeeOfRole,
            requestDeleteEmployeeOfRoleSuccess,
            requestDeleteEmployeeOfRoleFail
        ],
        dispatch,
        getState
    });
};

export const handleUpdatePermissionRole: Function = (id: number, permissionId: number) => async (dispatch: any, getState: any) => {
    return await callApi({
        method: 'post',
        apiPath: `/roles/update-role-permission`,
        actionTypes: [
            requestUpdateUpdatePermissionRole,
            requestUpdateUpdatePermissionRoleSuccess,
            requestUpdateUpdatePermissionRoleFail,
        ],
        variables: {
            role_id: id,
            permission_id: permissionId
        },
        dispatch,
        getState
    });
};

export const handleGetTypes: Function = () => async (dispatch: any, getState: any) => {
    return await callApi({
        variables: {},
        method: 'get',
        apiPath: `/permissions/types`,
        actionTypes: [requestGetListType, requestGetTypeSuccess, requestGetTypeFail],
        dispatch,
        getState
    });
};

export const handleGetPermissionOfRole: Function = (roleId: number) => async (dispatch: any, getState: any) => {
    return await callApi({
        variables: {},
        method: 'get',
        apiPath: `/permissions/${roleId}`,
        actionTypes: [
            requestGetListPermission,
            requestGetPermissionSuccess,
            requestGetPermissionFail
        ],
        dispatch,
        getState
    });
};
