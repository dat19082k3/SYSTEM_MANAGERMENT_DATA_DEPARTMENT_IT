import _ from 'lodash';
import {validate} from '@/utils/validates/validate.ts';
import {TYPE_SUBMIT} from '@/utils/constaints.ts';
import {handleCreateRole, handleUpdateRole} from '@/api/permission';
import {InfoRoleType, setErrorCreateOrUpdateRole, setInfoRole} from '@/states/modules/permissions';
import {Schema} from "joi";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";

export default function Handle() {
    const dispatch = useAppDispatch();

    const infoRole = useAppSelector((state) => state.permission.infoRole);
    const rolesList = useAppSelector((state) => state.permission.rolesList);
    const configModal = useAppSelector((state) => state.permission.configModal);
    const infoRoleSelected = useAppSelector((state) => state.permission.infoRoleSelected);
    const errorCreateOrUpdateRole = useAppSelector((state) => state.permission.errorCreateOrUpdateRole);
    const isLoadingBtnCreateOrUpdatePermission = useAppSelector(
        (state) => state.permission.isLoadingBtnCreateOrUpdateRole
    );

    const handleSubmitForm = (type: string, schema: Schema, data: any) => {
        if (type === TYPE_SUBMIT.CREATE) {
            validate(schema, data, {
                onSuccess: (data: any) => dispatch(handleCreateRole({...data})),
                onError: (error: any) => dispatch(setErrorCreateOrUpdateRole(error)),
            });
        }

        if (type === TYPE_SUBMIT.UPDATE) {
            validate(schema, data, {
                onSuccess: (data: any) => dispatch(handleUpdateRole(infoRole.id, data)),
                onError: (error: any) => dispatch(setErrorCreateOrUpdateRole(error)),
            });
        }
    };

    const handleChangeInput = <K extends keyof InfoRoleType>(value: InfoRoleType[K], type: K) => {
        let data = _.cloneDeep(infoRole);
        let dataError: Record<K, string> = _.cloneDeep(errorCreateOrUpdateRole) as Record<K, string>;
        data[type] = value;
        dataError[type] = '';

        dispatch(setInfoRole(data));
        dispatch(setErrorCreateOrUpdateRole(dataError));
    };

    const convertToTreeData = (data: any) => {
        return data?.reduce((acc: any, role: any) => {
            if (role && role.protected !== 1) {
                const treeItem = {
                    title: role.name,
                    value: role.id,
                    children: role.children && role.children.length > 0 ? convertToTreeData(role.children) : [],
                };
                return [...acc, treeItem];
            }
            return acc;
        }, []);
    };
    const treeDataOption = convertToTreeData(rolesList);

    const removeDataEditRole = (treeData: any, data: any) => {
        return treeData.filter((item: any) => {
            if (item.value === data.id) {
                return false;
            }
            if (item.children && item.children.length > 0) {
                item.children = removeDataEditRole(item.children, data);
            }
            return true;
        });
    };
    let treeDataOptionClone = _.cloneDeep(treeDataOption);
    const updatedTreeData = removeDataEditRole(treeDataOptionClone, infoRoleSelected);

    return {
        infoRole,
        configModal,
        treeDataOption,
        updatedTreeData,
        errorCreateOrUpdateRole,
        isLoadingBtnCreateOrUpdatePermission,
        dispatch,
        handleSubmitForm,
        handleChangeInput,
    };
}
