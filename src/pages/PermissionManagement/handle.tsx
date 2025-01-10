import {useEffect, useState} from 'react';
import {PROTECTED} from '@/utils/constaints.ts';
import {
    setInfoRole,
    setConfigModal,
    setEmployeeIds,
    setErrorEmployeeIds,
    setInfoRoleSelected,
    setVisibleModalDeleteRole,
    setErrorCreateOrUpdateRole,
    setQueryEmployeeWithoutRole,
    setInfoPermissionRoleSelected,
    setVisibleModalAddEmployeeOfRole,
    setVisibleModalCreateOrUpdateRole,
    initialQueryEmployeeWithoutRole,
} from '@/states/modules/permissions';
import {
    handleGetTypes,
    handleDeleteRole,
    handleGetEmployeeOfRole,
    handleGetPermissionOfRole,
    handleEmployeeWithoutRole,
    handleUpdatePermissionRole,
} from '@/api/permission';
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";

export default function Handle() {
    const dispatch = useAppDispatch();

    const [permissionId, setPermissionId] = useState<number | null>(null);
    const [contentModalDelete, setContentModalDelete] = useState<any>('');

    const infoUser = useAppSelector((state) => state.auth.authUser);
    const infoRole = useAppSelector((state) => state.permission.infoRole);
    const rolesList = useAppSelector((state) => state.permission.rolesList);
    const typesList = useAppSelector((state) => state.permission.typesList);
    const configModal = useAppSelector((state) => state.permission.configModal);
    const permissionList = useAppSelector((state) => state.permission.permissionList);
    const infoRoleSelected = useAppSelector((state) => state.permission.infoRoleSelected);
    const employeeOfRoleList = useAppSelector((state) => state.permission.employeeOfRoleList);
    const isLoadingBtnDeleteRole = useAppSelector((state) => state.permission.isLoadingBtnDeleteRole);
    const visibleModalDeleteRole = useAppSelector((state) => state.permission.visibleModalDeleteRole);
    const isLoadingListPermission = useAppSelector((state) => state.permission.isLoadingListPermission);
    const visibleModalAddEmployeeOfRole = useAppSelector((state) => state.permission.visibleModalAddEmployeeOfRole);
    const visibleModalCreateOrUpdateRole = useAppSelector((state) => state.permission.visibleModalCreateOrUpdateRole);
    const isLoadingBtnUpdatePermissionRole = useAppSelector((state) => state.permission.isLoadingBtnUpdatePermissionRole);

    const handleReloadData = () => {
        dispatch(
            setErrorCreateOrUpdateRole({
                name: '',
                description: '',
            })
        );
    };

    const openModalCreate = (type: any) => {
        dispatch(setConfigModal({title: 'Tạo mới vai trò', type}));
        dispatch(
            setInfoRole({
                name: '',
                description: '',
            })
        );
        handleReloadData();
        handleToggleVisibleModalCreateOrUpdate();
    };

    const handleToggleVisibleModalCreateOrUpdate = () => {
        handleReloadData();
        dispatch(setVisibleModalCreateOrUpdateRole(!visibleModalCreateOrUpdateRole));
    };

    const openModalEdit = (roleDetail: any, type: any) => {
        handleToggleVisibleModalCreateOrUpdate();
        dispatch(setConfigModal({title: 'Cập nhật thông tin vai trò ', type}));
        dispatch(setInfoRole({...roleDetail}));
        dispatch(setInfoRoleSelected({...roleDetail}));
        if (roleDetail.protected === PROTECTED.UNPROTECTED) {
            dispatch(handleGetEmployeeOfRole(roleDetail.id));
        }
        dispatch(handleGetPermissionOfRole(roleDetail.id));
        dispatch(handleGetTypes())
    };

    const openModalDelete = (user: any) => {
        dispatch(setInfoRole(user));
        dispatch(setVisibleModalDeleteRole(true));
    };

    useEffect(() => {
        if (infoRole) {
            setContentModalDelete(
                <span>
          Bạn có chắc chắn muốn xóa vai trò{''}
                    <div>
            <b>{infoRole.name}</b>?
          </div>
        </span>
            );
        }
    }, [infoRole]);

    const handleConfirmDelete = () => {
        if (infoRole) {
            dispatch(handleDeleteRole(infoRole.id));
        }
    };

    const handleContentSelect = (role: any) => {
        const roleId = role.id;
        dispatch(setInfoRoleSelected({...role}));
        dispatch(setInfoRole({...role}));
        if (role.protected === PROTECTED.UNPROTECTED) {
            dispatch(handleGetEmployeeOfRole(roleId));
        }
        dispatch(handleGetPermissionOfRole(roleId));
        dispatch(handleGetTypes());
    };

    const openModalAddEmployeeRole = () => {
        dispatch(handleEmployeeWithoutRole(infoRoleSelected.id));
        dispatch(handleGetEmployeeOfRole(infoRoleSelected.id));
        dispatch(setVisibleModalAddEmployeeOfRole(true));
        dispatch(setEmployeeIds({employee_ids: []}));
        dispatch(setErrorEmployeeIds({employee_ids: ''}));
    };

    const handleToggleVisibleModalAddEmployeeOfRole = () => {
        dispatch(setEmployeeIds({employee_ids: []}));
        dispatch(setErrorEmployeeIds({employee_ids: ''}));
        dispatch(setQueryEmployeeWithoutRole(initialQueryEmployeeWithoutRole));
        dispatch(setVisibleModalAddEmployeeOfRole(!visibleModalAddEmployeeOfRole));
    };

    const handleCheckboxChange = (id: number, _: number, permissionRole: any) => {
        setPermissionId(id);
        dispatch(setInfoPermissionRoleSelected(permissionRole));
        dispatch(handleUpdatePermissionRole(infoRoleSelected.id, id));
    };

    const handleConfirmUpdatePermissionRole = () => {
        dispatch(handleUpdatePermissionRole(infoRoleSelected.id, permissionId));
    };

    const convertRoleList = (roles: any) => {
        const convertRole = (role: any) => {
            let newRole = {...role};

            if (newRole.name === 'super_admin') {
                newRole.name = 'Super Admin';
            }

            if (newRole.children && newRole.children.length > 0) {
                newRole.children = newRole.children.map(convertRole);
            }

            return newRole;
        };

        return roles.map(convertRole);
    };
    const dataRole = convertRoleList(rolesList);

    return {
        dataRole,
        infoUser,
        infoRole,
        typesList,
        rolesList,
        configModal,
        permissionList,
        infoRoleSelected,
        contentModalDelete,
        employeeOfRoleList,
        visibleModalDeleteRole,
        isLoadingBtnDeleteRole,
        isLoadingListPermission,
        visibleModalAddEmployeeOfRole,
        visibleModalCreateOrUpdateRole,
        isLoadingBtnUpdatePermissionRole,
        dispatch,
        openModalEdit,
        openModalDelete,
        openModalCreate,
        handleConfirmDelete,
        handleContentSelect,
        handleCheckboxChange,
        openModalAddEmployeeRole,
        handleConfirmUpdatePermissionRole,
        handleToggleVisibleModalCreateOrUpdate,
        handleToggleVisibleModalAddEmployeeOfRole,
    };
}
