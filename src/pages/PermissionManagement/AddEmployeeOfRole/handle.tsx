import {handleDeleteEmployeeOfRole, handleEmployeeWithoutRole, handleUpdateAddEmployeeOfRole} from '@/api/permission';
import {
    EmployeeIdsErrType,
    setEmployeeIds,
    setErrorEmployeeIds,
    setInfoEmployeeSelected,
    setQueryEmployeeWithoutRole,
    setVisibleModalDeleteEmployeeOfRole,
} from '@/states/modules/permissions';
import {handleSetTimeOut} from '@/utils/helper';
import {validate} from '@/utils/validates/validate.ts';
import _ from 'lodash';
import {useEffect, useState} from 'react';
import {Schema} from "joi";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";

export default function Handle() {
    const dispatch = useAppDispatch();

    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    const [employeeOption, setEmployeeOption] = useState<any[]>([]);
    const [contentModalDeleteEmployeeOfRole, setContentModalDeleteEmployeeOfRole] = useState<any>();

    const employeeIdsErr = useAppSelector((state) => state.permission.employeeIdsErr);
    const infoEmployeeIds = useAppSelector((state) => state.permission.infoEmployeeIds);
    const infoRoleSelected = useAppSelector((state) => state.permission.infoRoleSelected);
    const infoEmployeeSelected = useAppSelector((state) => state.permission.infoEmployeeSelected);
    const employeeWithoutRoleList = useAppSelector((state) => state.permission.employeeWithoutRoleList);
    const queryEmployeeWithoutRole = useAppSelector((state) => state.permission.queryEmployeeWithoutRole);
    const isLoadingListEmployeeOfRole = useAppSelector((state) => state.permission.isLoadingListEmployeeOfRole);
    const isLoadingBtnAddEmployeeOfRole = useAppSelector((state) => state.permission.isLoadingBtnAddEmployeeOfRole);
    const isLoadingBtnDeleteEmployeeOfRole = useAppSelector((state) => state.permission.isLoadingBtnDeleteEmployeeOfRole);
    const visibleModalDeleteEmployeeOfRole = useAppSelector((state) => state.permission.visibleModalDeleteEmployeeOfRole);

    useEffect(() => {
        setEmployeeOption(
            employeeWithoutRoleList?.map((item: any) => ({
                value: item.id,
                label: item.name,
            }))
        );
    }, [employeeWithoutRoleList]);

    const handleToggleVisibleModalDeleteEmployeeOfRole = () => {
        dispatch(setVisibleModalDeleteEmployeeOfRole(!visibleModalDeleteEmployeeOfRole));
    };

    const openModalDeleteEmployeeOfRole = (employee: any) => {
        dispatch(setInfoEmployeeSelected(employee));
        dispatch(setVisibleModalDeleteEmployeeOfRole(true));
    };

    useEffect(() => {
        if (infoEmployeeSelected) {
            setContentModalDeleteEmployeeOfRole(
                <span>
              Bạn có chắc chắn muốn xóa{''}
                    <div>
          <b>{infoEmployeeSelected.name}</b> khỏi vai trò <b>{infoRoleSelected.name}</b>?
          </div>
          </span>
            );
        }
    }, [infoEmployeeSelected, infoRoleSelected.name]);

    const handleConfirmDeleteEmployeeOfRole = () => {
        if (infoEmployeeSelected) {
            dispatch(handleDeleteEmployeeOfRole(infoRoleSelected.id, infoEmployeeSelected.id));
        }
    };

    const handleChangeSelectEmployeeOfRole = (value: any, type: string) => {
        let data = _.cloneDeep(infoEmployeeIds);
        if (type === 'employee_ids') {
            data[type] = value;
        }
        dispatch(setEmployeeIds(data));
    };

    const handleSubmitEmployeeOfRole = (schema: Schema, data: any) => {
        validate(schema, data, {
            onSuccess: (data: any) => dispatch(handleUpdateAddEmployeeOfRole(infoRoleSelected.id, data)),
            onError: (error: any) => dispatch(setErrorEmployeeIds(error)),
        });
        dispatch(setEmployeeIds({employee_ids: []}));
    };

    const handleFocusEmployeeOfRole = (type: keyof EmployeeIdsErrType) => {
        let dataError = _.cloneDeep(employeeIdsErr);
        dataError[type] = '';
        dispatch(setErrorEmployeeIds(dataError));
    };

    const handlePopupScroll = (e: any) => {
        const scrollContentHeight = e.target.scrollHeight;
        const visibleHeight = e.target.clientHeight;
        const scrollPosition = e.target.scrollTop;

        if (scrollContentHeight - visibleHeight === scrollPosition) {
            dispatch(
                setQueryEmployeeWithoutRole({
                    ...queryEmployeeWithoutRole,
                    page_size: queryEmployeeWithoutRole.page_size + 20,
                })
            );
            dispatch(handleEmployeeWithoutRole(infoRoleSelected.id));
        }
    };

    const handleSearch = (value: string) => {
        dispatch(
            setQueryEmployeeWithoutRole({
                ...queryEmployeeWithoutRole,
                q: value,
            })
        );
        let newTimeoutId = handleSetTimeOut(
            () => {
                dispatch(handleEmployeeWithoutRole(infoRoleSelected.id));
            },
            500,
            timeoutId
        );
        setTimeoutId(newTimeoutId);
    };

    const handleClear = () => {
        dispatch(
            setQueryEmployeeWithoutRole({
                ...queryEmployeeWithoutRole,
                q: '',
            })
        );
        let newTimeoutId = handleSetTimeOut(
            () => {
                dispatch(handleEmployeeWithoutRole(infoRoleSelected.id));
            },
            100,
            timeoutId
        );
        setTimeoutId(newTimeoutId);
    };

    const filterOption = (inputValue: string, option: any) => {
        return option.label.toLowerCase().includes(inputValue.toLowerCase());
    };

    return {
        employeeIdsErr,
        employeeOption,
        infoEmployeeIds,
        queryEmployeeWithoutRole,
        isLoadingListEmployeeOfRole,
        isLoadingBtnAddEmployeeOfRole,
        visibleModalDeleteEmployeeOfRole,
        contentModalDeleteEmployeeOfRole,
        isLoadingBtnDeleteEmployeeOfRole,
        dispatch,
        handleClear,
        filterOption,
        handleSearch,
        handlePopupScroll,
        handleFocusEmployeeOfRole,
        handleSubmitEmployeeOfRole,
        openModalDeleteEmployeeOfRole,
        handleConfirmDeleteEmployeeOfRole: handleConfirmDeleteEmployeeOfRole,
        handleChangeSelectEmployeeOfRole,
        handleToggleVisibleModalDeleteEmployeeOfRole,
    };
}
