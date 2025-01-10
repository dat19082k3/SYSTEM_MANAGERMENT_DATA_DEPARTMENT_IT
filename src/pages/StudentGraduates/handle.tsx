import React, {useState} from "react";
import useWindowSize from "@/utils/hooks/useWindowSize.ts";
import {
    deleteStudentGraduate,
    getListStudentGraduates,
    postCreateStudentGraduate,
    putUpdateStudentGraduate
} from "@/api/graduates";
import InlineSVG from "react-inlinesvg";
import {Button, Tooltip} from "antd";
import Delete from "@/assets/images/icons/duotone/trash-can.svg";
import _ from "lodash";
import {handleSetTimeOut, hasPermission} from "@/utils/helper.tsx";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";
import {
    setDataFilter, setDataStudentGraduate, setErrorStudentGraduate, setVisibleModalCreOrUpdStudentGraduate,
    setVisibleModalDeleteStudentGraduate,
} from "@/states/modules/graduates";
import Edit from "@/assets/images/icons/duotone/pen-to-square.svg";
import {validate} from "@/utils/validates";
import {DataFilterType} from "@/states/modules/science";
import moment from "moment/moment";
import {PERMISSIONS} from "@/utils/constaints.ts";
import {initDataFilter} from "@/states/modules/faculties";

export default function Handle() {
    const dispatch = useAppDispatch();
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    const [studentGraduateId, setStudentGraduateId] = useState("");
    const [contentModalDelete, setContentModalDelete] = useState<React.JSX.Element>(<></>);

    const windowWidth = useWindowSize().width;
    const dataFilter = useAppSelector((state) => state.studentGraduate.dataFilter);
    const dataStudentGraduate = useAppSelector((state) => state.studentGraduate.dataStudentGraduate);
    const errorStudentGraduate = useAppSelector((state) => state.studentGraduate.errorStudentGraduate);
    const studentGraduates = useAppSelector((state) => state.studentGraduate.studentGraduates);

    const paginationListStudentGraduates = useAppSelector(
        (state) => state.studentGraduate.paginationListStudentGraduates
    );
    const isLoadingTableStudentGraduates = useAppSelector(
        (state) => state.studentGraduate.isLoadingTableStudentGraduates
    );
    const isLoadingBtnDelete = useAppSelector(
        (state) => state.studentGraduate.isLoadingBtnDelete
    );
    const isLoadingBtnCreOrUpd = useAppSelector(
        (state) => state.studentGraduate.isLoadingBtnCreOrUpd
    );
    const visibleModalDelete = useAppSelector(
        (state) => state.studentGraduate.visibleModalDelete
    );
    const visibleModalCreOrUpd = useAppSelector(
        (state) => state.studentGraduate.visibleModalCreOrUpd
    );

    const columns = [
        {
            title: "Mã sinh viên",
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
            width: 80,
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
            width: 108,
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
            width: 200,
            showSorterTooltip: false,
            render: (text: string) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: "Lớp",
            dataIndex: "class",
            key: "class",
            align: "center",
            width: 120,
            showSorterTooltip: false,
            render: (text: string) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: "Khóa học",
            dataIndex: "course",
            key: "course",
            align: "center",
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
            title: "Chuyên ngành",
            dataIndex: "major",
            key: "major",
            align: "center",
            width: 190,
            showSorterTooltip: false,
            render: (text: string) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: "Năm tháng tốt nghiệp",
            dataIndex: "graduate_date",
            key: "graduate_date",
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
            width: 150,
            align: "center",
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
                                 title={hasPermission([PERMISSIONS.EDIT.GRADUATE_MANAGEMENT]) ? 'Chỉnh sửa' : "Bạn không có quyền này"}>
                            <Button
                                className={"btn-edit"}
                                variant={"filled"}
                                disabled={!hasPermission([PERMISSIONS.EDIT.GRADUATE_MANAGEMENT])}
                                onClick={() => openModalCreOrUpd(record)}
                            ><InlineSVG src={Edit} width={16}/></Button>
                        </Tooltip>
                        <Tooltip placement="bottom"
                                 title={hasPermission([PERMISSIONS.DELETE.GRADUATE_MANAGEMENT]) ? 'Xóa' : 'Bạn không có quyền này'}>
                            <Button
                                className={"btn-delete"}
                                color={"danger"}
                                variant={"filled"}
                                disabled={!hasPermission([PERMISSIONS.DELETE.GRADUATE_MANAGEMENT])}
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
                dispatch(getListStudentGraduates(newDataFilter));
            },
            500,
            timeoutId
        );
        setTimeoutId(newTimeoutId);
    };

    const openModalDelete = (studentGraduate: any) => {
        setStudentGraduateId(studentGraduate.id);
        setContentModalDelete(
            <span>
        Bạn có chắc chắn muốn xóa sinh viên tốt nghiệp{" "}<b>{studentGraduate.last_name + " " + studentGraduate.first_name}</b> không?
      </span>
        );
        dispatch(setVisibleModalDeleteStudentGraduate(true));
    };

    const openModalCreOrUpd = (studentGraduate: any) => {
        dispatch(setDataStudentGraduate(studentGraduate))
        dispatch(setVisibleModalCreOrUpdStudentGraduate(true));
    };

    const handleChangeInputInfo = (value: any, type: string) => {
        let data = _.cloneDeep(dataStudentGraduate);
        let dataError = _.cloneDeep(errorStudentGraduate);
        data[type] = value;
        dataError[type] = '';
        dispatch(setDataStudentGraduate(data));
        dispatch(setErrorStudentGraduate(dataError));
    };

    const handleConfirmDelete = () => {
        dispatch(deleteStudentGraduate(studentGraduateId));
    };

    const handleConfirmCreOrUpd = (scheme: any, data: any) => {
        if (data && data.id) {
            validate(scheme, data, {
                onSuccess: (data: any) => {
                    dispatch(putUpdateStudentGraduate(data.id, data))
                },
                onError: (error: any) => dispatch(setErrorStudentGraduate(error)),
            });
        } else {
            validate(scheme, data, {
                onSuccess: (data: any) => {
                    dispatch(postCreateStudentGraduate(data))
                },
                onError: (error: any) => dispatch(setErrorStudentGraduate(error)),
            });
        }
    };

    const handleSelectLimitTable = (value: number) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter["page"] = 1;
        newDataFilter["perPage"] = value;
        dispatch(setDataFilter(newDataFilter));
        dispatch(getListStudentGraduates(newDataFilter));
    };

    const handleChangeTable = (___: any, __: any, sorter: any) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        if (sorter.order && sorter.field) {
            newDataFilter.sortOrder = sorter.order === "descend" ? "desc" : "asc";
            newDataFilter.sortField = sorter.field;
            dispatch(setDataFilter(newDataFilter));
            dispatch(getListStudentGraduates(newDataFilter));
        } else {
            dispatch(getListStudentGraduates(initDataFilter));
        }

    };

    return {
        windowWidth,
        columns,
        studentGraduates,
        dataFilter,
        paginationListStudentGraduates,
        isLoadingTableStudentGraduates,
        isLoadingBtnDelete,
        isLoadingBtnCreOrUpd,
        visibleModalDelete,
        visibleModalCreOrUpd,
        contentModalDelete,
        dataStudentGraduate,
        errorStudentGraduate,
        handleSearch,
        handleSelectPagination,
        handleChangeInputInfo,
        handleConfirmDelete,
        handleConfirmCreOrUpd,
        handleSelectLimitTable,
        handleChangeTable
    };
}
