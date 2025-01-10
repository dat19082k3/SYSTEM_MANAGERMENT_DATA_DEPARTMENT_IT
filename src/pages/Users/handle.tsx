import React, {useState} from "react";
import useWindowSize from "@/utils/hooks/useWindowSize.ts";
import InlineSVG from "react-inlinesvg";
import {Button, Switch, Tag, Tooltip} from "antd";
import Delete from "@/assets/images/icons/duotone/trash-can.svg";
import _ from "lodash";
import {handleSetTimeOut, hasPermission} from "@/utils/helper.tsx";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";
import Edit from "@/assets/images/icons/duotone/pen-to-square.svg";
import Lock from "@/assets/images/icons/duotone/lock.svg";
import {validate} from "@/utils/validates";
import {
    DataChangePassUserType,
    DataUserType, ErrorChangePassUserType, ErrorUserType,
    setDataChangePassUser,
    setDataFilter,
    setDataUser, setErrorDataChangePassUser,
    setErrorDataUser,
    setVisibleModalChangePass,
    setVisibleModalCreOrUpdUser,
    setVisibleModalDeleteUser
} from "@/states/modules/user";
import {
    getListUsers,
    handleChangePassUser,
    handleChangeStatusUser,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser
} from "@/api/user";
import {getListIdeas} from "@/api/idea";
import {DataFilterType} from "@/states/modules/science";
import {PERMISSIONS} from "@/utils/constaints.ts";
import {initDataFilter} from "@/states/modules/faculties";

export default function Handle() {
    const dispatch = useAppDispatch();
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    const [userId, setUserId] = useState<string>("");
    const [contentModalDelete, setContentModalDelete] = useState<React.JSX.Element>(<></>);

    const windowWidth = useWindowSize().width;
    const dataFilter = useAppSelector((state) => state.user.dataFilter);
    const dataUser = useAppSelector((state) => state.user.dataUser);
    const dataChangePass = useAppSelector(state => state.user.dataChangePassUser)
    const errorUser = useAppSelector((state) => state.user.errorDataUser);
    const errorChangePassUser = useAppSelector((state) => state.user.errorDataChangePassUser);
    const users = useAppSelector((state) => state.user.users);
    const rolesList = useAppSelector((state) => state.permission.rolesList);

    const paginationListUsers = useAppSelector(
        (state) => state.user.paginationListUsers
    );
    const isLoadingTableUsers = useAppSelector(
        (state) => state.user.isLoadingTableUser
    );
    const isLoadingBtnDelete = useAppSelector(
        (state) => state.user.isLoadingBtnDelete
    );
    const isLoadingBtnCreOrUpd = useAppSelector(
        (state) => state.user.isLoadingBtnCreOrUpd
    );
    const isLoadingBtnChangePassword = useAppSelector(
        (state) => state.user.isLoadingBtnChangePassword
    );
    const visibleModalDelete = useAppSelector(
        (state) => state.user.visibleModalDelete
    );
    const visibleModalCreOrUpd = useAppSelector(
        (state) => state.user.visibleModalCreOrUpd
    );
    const visibleModalChangePass = useAppSelector(
        (state) => state.user.visibleModalChangePass
    );

    const columns = [
        {
            title: "Họ Tên",
            dataIndex: "name",
            key: "name",
            showSorterTooltip: false,
            align: "center",
            width: 200,
            sorter: true,
            render: (text: string) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <span className={`italic`}>Đang cập nhật</span>
                ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 150,
            align: "center",
            showSorterTooltip: false,
            render: (text: string) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            align: "center",
            width: 150,
            showSorterTooltip: false,
            render: (text: string) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: "Vai trò",
            dataIndex: "role_ids",
            key: "role_ids",
            align: "center",
            width: 180,
            showSorterTooltip: false,
            render: (arr: Array<number>) => {
                return arr && arr?.length > 0 ? <div className={"w-full flex flex-wrap gap-y-1 justify-center"}>
                    {arr.map(id => <Tag className={"w-fit"} key={id}>{
                            findInArray(rolesList, id)?.name
                        }</Tag>
                    )}
                </div> : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                )
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center",
            width: 150,
            showSorterTooltip: false,
            render: (text: any, record: any) =>
                (
                    <Tooltip title={text ? "Đã kích hoạt" : "Chưa kích hoạt"}><Switch
                        value={text}
                        onChange={e => {
                            dispatch(handleChangeStatusUser(record.id, e ? 1 : 0))

                        }}
                    /></Tooltip>
                )
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            width: 120,
            fixed: "right",
            align: "center",
            render: (_: any, record: any) => (
                <div>
                    <div className={`btn-action flex space-x-2`}>
                        <Tooltip placement="bottom"
                                 title={hasPermission([PERMISSIONS.EDIT.USER_MANAGEMENT]) ? 'Chỉnh sửa' : 'Bạn không có quyền này'}>
                            <Button
                                className={"btn-edit"}
                                variant={"filled"}
                                disabled={!hasPermission([PERMISSIONS.EDIT.USER_MANAGEMENT])}
                                onClick={() => {
                                    setUserId(record.id)
                                    openModalCreOrUpd(record)
                                }}
                            ><InlineSVG src={Edit} width={16}/></Button>
                        </Tooltip>
                        <Tooltip placement="bottom"
                                 title={hasPermission([PERMISSIONS.EDIT.RESET_PASSWORD_USER]) ? 'Đổi mật khẩu' : 'Bạn không có quyền này'}>
                            <Button
                                className={"btn-edit"}
                                variant={"filled"}
                                disabled={!hasPermission([PERMISSIONS.EDIT.RESET_PASSWORD_USER])}
                                onClick={() => {
                                    setUserId(record.id)
                                    openModalChangePass(record)
                                }}
                            ><InlineSVG src={Lock} width={14}/></Button>
                        </Tooltip>
                        <Tooltip placement="bottomLeft"
                                 title={hasPermission([PERMISSIONS.DELETE.USER_MANAGEMENT]) ? 'Xóa' : 'Bạn không có quyền này'}>
                            <Button
                                className={"btn-delete"}
                                color={"danger"}
                                variant={"filled"}
                                disabled={!hasPermission([PERMISSIONS.DELETE.USER_MANAGEMENT])}
                                onClick={() => openModalDelete(record)}
                            ><InlineSVG src={Delete} width={14}/></Button>
                        </Tooltip>
                    </div>
                </div>
            ),
        },
    ];

    function findInArray(objects: any[], id: string | number): any | null {
        const queue: any[] = [...objects];

        while (queue.length > 0) {
            const current = queue.shift();
            if (current.id === id) {
                return current;
            }

            if (Array.isArray(current.children)) {
                queue.push(...current.children);
            }
        }

        return null;
    }

    const handleSelectPagination = (value: number) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter.page = value;
        dispatch(setDataFilter(newDataFilter));
    };

    const handleSearch = (e: any) => {
        let newDataFilter: DataFilterType = _.cloneDeep(dataFilter);
        newDataFilter.search = e.target.value;
        newDataFilter.page = 1;
        dispatch(setDataFilter(newDataFilter));
        let newTimeoutId = handleSetTimeOut(
            () => {
                dispatch(getListUsers(newDataFilter));
            },
            500,
            timeoutId
        );
        setTimeoutId(newTimeoutId);
    };

    const handleChangeTable = (___: any, __: any, sorter: any) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        if (sorter.order && sorter.field) {
            newDataFilter.sortOrder = sorter.order === "descend" ? "desc" : "asc";
            newDataFilter.sortField = sorter.field;
            dispatch(setDataFilter(newDataFilter));
            dispatch(getListUsers(newDataFilter));
        } else {
            dispatch(getListUsers(initDataFilter));
        }
    };

    const openModalDelete = (user: any) => {
        setUserId(user.id);
        setContentModalDelete(
            <span>
        Bạn có chắc chắn muốn xóa người dùng{" "}<b>{user.name}</b> không?
      </span>
        );
        dispatch(setVisibleModalDeleteUser(true));
    };

    const openModalCreOrUpd = (user: DataUserType) => {
        dispatch(setDataUser(user))
        dispatch(setVisibleModalCreOrUpdUser(true));
    };

    const openModalChangePass = (data: any) => {
        dispatch(setDataChangePassUser({
            ...dataChangePass,
            id: data.id
        }))
        dispatch(setVisibleModalChangePass(true));
    };


    const handleChangeInputInfo = (value: string | number[], type: string) => {
        let data = _.cloneDeep(dataUser);
        let dataError = _.cloneDeep(errorUser);
        data[type as keyof DataUserType] = value;
        dataError[type as keyof ErrorUserType] = '';
        dispatch(setDataUser(data));
        dispatch(setErrorDataUser(dataError));
    };

    const handleChangeInputPass = <K extends keyof DataChangePassUserType>(value: DataChangePassUserType[K], type: K) => {
        let data = _.cloneDeep(dataChangePass);
        let dataError = _.cloneDeep(errorChangePassUser);
        data[type] = value;
        dataError[type as keyof ErrorChangePassUserType] = '';
        dispatch(setDataChangePassUser(data));
        dispatch(setErrorDataChangePassUser(dataError));
    };


    const handleConfirmDelete = () => {
        dispatch(handleDeleteUser(userId));
    };

    const handleConfirm = (scheme: any, data: any) => {
        if (data && data.id) {
            validate(scheme, data, {
                onSuccess: (data: any) => {
                    dispatch(handleUpdateUser(data.id, data))
                },
                onError: (error: any) => dispatch(setErrorDataUser(error)),
            });
        } else {
            validate(scheme, data, {
                onSuccess: (data: any) => {
                    dispatch(handleCreateUser(data))
                },
                onError: (error: any) => dispatch(setErrorDataUser(error)),
            });
        }
    };

    const handleChangePass = (scheme: any, data: any) => {
        if (data.new_password === data.confirm_password) {
            validate(scheme, data, {
                onSuccess: (data: any) => {
                    dispatch(handleChangePassUser(data.id, data))
                },
                onError: (error: any) => dispatch(setErrorDataChangePassUser(error)),
            });
        } else {
            dispatch(setErrorDataChangePassUser({
                ...errorChangePassUser,
                confirm_password: "Nhập lại mật khẩu không trùng khớp"
            }))
        }
    };

    const handleSelectLimitTable = (value: number) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter["page"] = 1;
        newDataFilter["perPage"] = value;
        dispatch(setDataFilter(newDataFilter));
        dispatch(getListIdeas(newDataFilter));
    };

    return {
        windowWidth,
        columns,
        users,
        rolesList,
        dataFilter,
        paginationListUsers,
        isLoadingTableUsers,
        isLoadingBtnDelete,
        isLoadingBtnCreOrUpd,
        isLoadingBtnChangePassword,
        visibleModalDelete,
        visibleModalCreOrUpd,
        visibleModalChangePass,
        contentModalDelete,
        dataUser,
        dataChangePass,
        errorUser,
        errorChangePassUser,
        handleSearch,
        handleChangeTable,
        handleSelectPagination,
        handleChangeInputInfo,
        handleChangeInputPass,
        handleConfirmDelete,
        handleConfirm,
        handleChangePass,
        handleSelectLimitTable,
    };
}
