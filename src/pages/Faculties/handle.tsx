import React, {useState} from "react";
import useWindowSize from "@/utils/hooks/useWindowSize.ts";
import {
    deleteFaculty,
    getListFaculties,
    postCreateFaculty,
    putUpdateFaculty
} from "@/api/faculties";
import InlineSVG from "react-inlinesvg";
import {Button, Tooltip} from "antd";
import Delete from "@/assets/images/icons/duotone/trash-can.svg";
import _ from "lodash";
import {handleSetTimeOut, hasPermission} from "@/utils/helper.tsx";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";
import {
    setDataFilter, setDataFaculty, setErrorFaculty, setVisibleModalCreOrUpdFaculty,
    setVisibleModalDeleteFaculty, initDataFilter,
} from "@/states/modules/faculties";
import Edit from "@/assets/images/icons/duotone/pen-to-square.svg";
import {validate} from "@/utils/validates";
import {DataFilterType} from "@/states/modules/science";
import moment from "moment/moment";
import {PERMISSIONS} from "@/utils/constaints.ts";

export default function Handle() {
    const dispatch = useAppDispatch();
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    const [facultyId, setFacultyId] = useState("");
    const [contentModalDelete, setContentModalDelete] = useState<React.JSX.Element>(<></>);

    const windowWidth = useWindowSize().width;
    const dataFilter = useAppSelector((state) => state.faculty.dataFilter);
    const dataFaculty = useAppSelector((state) => state.faculty.dataFaculty);
    const errorFaculty = useAppSelector((state) => state.faculty.errorFaculty);
    const faculties = useAppSelector((state) => state.faculty.faculties);

    const paginationListFaculties = useAppSelector(
        (state) => state.faculty.paginationListFaculties
    );
    const isLoadingTableFaculties = useAppSelector(
        (state) => state.faculty.isLoadingTableFaculties
    );
    const isLoadingBtnDelete = useAppSelector(
        (state) => state.faculty.isLoadingBtnDelete
    );
    const isLoadingBtnCreOrUpd = useAppSelector(
        (state) => state.faculty.isLoadingBtnCreOrUpd
    );
    const visibleModalDelete = useAppSelector(
        (state) => state.faculty.visibleModalDelete
    );
    const visibleModalCreOrUpd = useAppSelector(
        (state) => state.faculty.visibleModalCreOrUpd
    );

    const columns = [
        {
            title: "Mã cán bộ",
            dataIndex: "code",
            key: "code",
            showSorterTooltip: false,
            align: "center",
            width: 140,
            render: (text: string) =>
                text ? (
                    <b>{text}</b>
                ) : (
                    <span className={`italic`}>Đang cập nhật</span>
                ),
        },
        {
            title: "Họ đệm",
            dataIndex: "last_name",
            key: "last_name",
            width: 150,
            align: "center",
            sorter: true,
            showSorterTooltip: false,
            render: (text: string) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: "Tên",
            dataIndex: "first_name",
            key: "first_name",
            align: "center",
            sorter: true,
            width: 100,
            showSorterTooltip: false,
            render: (text: string) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            width: 150,
            align: 'center',
            showSorterTooltip: false,
            render: (text: any) =>
                text ? (
                    <span>{moment(text).format('DD/MM/YYYY')}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: "Quê quán",
            dataIndex: "hometown",
            key: "hometown",
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
            title: "Bộ môn",
            dataIndex: "department",
            key: "department",
            align: "center",
            width: 180,
            showSorterTooltip: false,
            render: (text: string) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
            align: "center",
            width: 250,
            showSorterTooltip: false,
            render: (text: string) => text ? (
                <span>{text}</span>
            ) : (
                <i className={`text-gray-60`}>Đang cập nhật</i>
            ),
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
                                 title={hasPermission([PERMISSIONS.DELETE.FACULTY_MANAGEMENT]) ? 'Chỉnh sửa' : 'Bạn không có quyền này'}>
                            <Button
                                className={"btn-edit"}
                                variant={"filled"}
                                disabled={!hasPermission([PERMISSIONS.EDIT.FACULTY_MANAGEMENT])}
                                onClick={() => openModalCreOrUpd(record)}
                            ><InlineSVG src={Edit} width={16}/></Button>
                        </Tooltip>
                        <Tooltip placement="bottomLeft"
                                 title={hasPermission([PERMISSIONS.DELETE.FACULTY_MANAGEMENT]) ? 'Xóa' : 'Bạn không có quyền này'}>
                            <Button
                                className={"btn-delete"}
                                variant={"filled"}
                                disabled={!hasPermission([PERMISSIONS.DELETE.FACULTY_MANAGEMENT])}
                                onClick={() => openModalDelete(record)}
                            ><InlineSVG src={Delete} width={14}/></Button>
                        </Tooltip>
                    </div>
                </div>
            ),
        },
    ];

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
                dispatch(getListFaculties(newDataFilter));
            },
            500,
            timeoutId
        );
        setTimeoutId(newTimeoutId);
    };

    const openModalDelete = (faculty: any) => {
        setFacultyId(faculty.id);
        setContentModalDelete(
            <span>
        Bạn có chắc chắn muốn xóa cán bộ{" "}<b>{faculty.last_name + " " + faculty.first_name}</b> không?
      </span>
        );
        dispatch(setVisibleModalDeleteFaculty(true));
    };

    const openModalCreOrUpd = (faculty: any) => {
        dispatch(setDataFaculty(faculty))
        dispatch(setVisibleModalCreOrUpdFaculty(true));
    };

    const handleChangeInputInfo = (value: any, type: string) => {
        let data = _.cloneDeep(dataFaculty);
        let dataError = _.cloneDeep(errorFaculty);
        data[type] = value;
        dataError[type] = '';
        dispatch(setDataFaculty(data));
        dispatch(setErrorFaculty(dataError));
    };

    const handleConfirmDelete = () => {
        dispatch(deleteFaculty(facultyId));
    };

    const handleConfirmCreOrUpd = (scheme: any, data: any) => {
        if (data && data.id) {
            validate(scheme, data, {
                onSuccess: (data: any) => {
                    dispatch(putUpdateFaculty(data.id, data))
                },
                onError: (error: any) => dispatch(setErrorFaculty(error)),
            });
        } else {
            validate(scheme, data, {
                onSuccess: (data: any) => {
                    dispatch(postCreateFaculty(data))
                },
                onError: (error: any) => dispatch(setErrorFaculty(error)),
            });
        }
    };

    const handleSelectLimitTable = (value: number) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter["page"] = 1;
        newDataFilter["perPage"] = value;
        dispatch(setDataFilter(newDataFilter));
        dispatch(getListFaculties(newDataFilter));
    };

    const handleChangeTable = (___: any, __: any, sorter: any) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        if (sorter.order && sorter.field) {
            newDataFilter.sortOrder = sorter.order === "descend" ? "desc" : "asc";
            newDataFilter.sortField = sorter.field;
            dispatch(setDataFilter(newDataFilter));
            dispatch(getListFaculties(newDataFilter));
        } else {
            dispatch(getListFaculties(initDataFilter));
        }

    };

    return {
        windowWidth,
        columns,
        faculties,
        dataFilter,
        paginationListFaculties,
        isLoadingTableFaculties,
        isLoadingBtnDelete,
        isLoadingBtnCreOrUpd,
        visibleModalDelete,
        visibleModalCreOrUpd,
        contentModalDelete,
        dataFaculty,
        errorFaculty,
        handleSearch,
        handleSelectPagination,
        handleChangeInputInfo,
        handleConfirmDelete,
        handleConfirmCreOrUpd,
        handleSelectLimitTable,
        handleChangeTable
    };
}
