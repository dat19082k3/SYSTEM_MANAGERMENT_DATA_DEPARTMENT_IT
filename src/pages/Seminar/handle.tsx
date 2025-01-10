import React, {useState} from "react";
import useWindowSize from "@/utils/hooks/useWindowSize.ts";
import {deleteSeminar, getListSeminars, postBuListSeminars, postExportExSeminars} from "@/api/seminar";
import {
    ErrorBackUpSeminarType,
    setDataBackUp,
    setDataExport,
    setDataFilter, setErrorBackUp, setErrorExport,
    setVisibleModalDeleteSeminar
} from "@/states/modules/seminar";
import _ from "lodash";
import {handleSetTimeOut, hasPermission} from "@/utils/helper.tsx";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {Button, Tooltip} from "antd";
import {PERMISSIONS} from "@/utils/constaints.ts";
import InlineSVG from "react-inlinesvg";
import Link from "@/assets/images/icons/duotone/link.svg";
import Edit from "@/assets/images/icons/duotone/pen-to-square.svg";
import Delete from "@/assets/images/icons/duotone/trash-can.svg";
import {validate} from "@/utils/validates";
import {DataFilterType} from "@/states/modules/science";
import {
    DataBackUpSeminarType,
    DataExportSeminarType,
} from "@/states/modules/seminar";
import {initDataFilter} from "@/states/modules/faculties";

export default function Handle() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    const [seminarId, setSeminarId] = useState('');
    const [contentModalDelete, setContentModalDelete] = useState<React.JSX.Element>(<></>);

    const windowWidth = useWindowSize().width;
    const dataFilter = useAppSelector((state) => state.seminar.dataFilter);
    const seminars = useAppSelector((state) => state.seminar.seminars);
    const dataExport = useAppSelector(state => state.seminar.dataExport);
    const errorExport = useAppSelector(state => state.seminar.errorExport);
    const dataBackUp = useAppSelector(state => state.seminar.dataBackUp)
    const errorBackUp = useAppSelector(state => state.seminar.errorBackUp)
    const paginationList = useAppSelector((state) => state.seminar.paginationListSeminars);
    const isLoadingTable = useAppSelector((state) => state.seminar.isLoadingTableSeminars);
    const isLoadingBtnDelete = useAppSelector((state) => state.seminar.isLoadingBtnDelete);
    const isLoadingBtnBu = useAppSelector((state) => state.seminar.isLoadingBtnBu);
    const isLoadingBtnEx = useAppSelector((state) => state.seminar.isLoadingBtnEx);
    const visibleModalDeleteSeminar = useAppSelector((state) => state.seminar.visibleModalDeleteSeminar);
    const visibleModalBuSeminar = useAppSelector((state) => state.seminar.visibleModalBuSeminar);
    const visibleModalExSeminar = useAppSelector((state) => state.seminar.visibleModalExSeminar);

    const columns = [
        {
            title: 'Tên hội thảo',
            dataIndex: 'name',
            key: 'name',
            width: 350,
            align: "center",
            sorter: true,
            showSorterTooltip: false,
            render: (text: any) => (
                <span className={`font-bold`}>
        {text}{' '}
        </span>
            ),
        },
        {
            title: 'Loại hội thảo',
            dataIndex: 'field',
            key: 'field',
            showSorterTooltip: false,
            align: 'center',
            width: 200,
            render: (text: any) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'start_date',
            key: 'start_date',
            align: 'center',
            width: 150,
            sorter: true,
            showSorterTooltip: false,
            render: (text: any) =>
                text ? (
                    <span>{moment(text).format('DD/MM/YYYY')}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'end_date',
            key: 'end_date',
            width: 150,
            align: 'center',
            sorter: true,
            showSorterTooltip: false,
            render: (text: any) =>
                text ? (
                    <span>{moment(text).format('DD/MM/YYYY')}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Số đại biểu',
            dataIndex: 'delegates',
            key: 'delegates',
            align: 'center',
            width: 120,
            sorter: true,
            showSorterTooltip: false,
            render: (text: any) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Địa điểm',
            dataIndex: 'place',
            key: 'place',
            showSorterTooltip: false,
            align: 'center',
            width: 200,
            render: (text: any) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Đơn vị chủ trì',
            dataIndex: 'unit_host',
            key: 'unit_host',
            showSorterTooltip: false,
            align: 'center',
            width: 200,
            render: (text: any) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Đơn vị phối hợp',
            dataIndex: 'unit_partner',
            key: 'unit_partner',
            showSorterTooltip: false,
            align: 'center',
            width: 200,
            render: (text: any) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Tác giả',
            dataIndex: 'authors',
            key: 'authors',
            showSorterTooltip: false,
            align: 'center',
            width: 280,
            render: (text: any) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Người tạo',
            dataIndex: 'creator',
            key: 'creator',
            showSorterTooltip: false,
            align: 'center',
            width: 200,
            render: (text: any) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'creation_date',
            key: 'creation_date',
            width: 140,
            align: 'center',
            showSorterTooltip: false,
            sorter: true,
            render: (text:any) => (
                <span className={""}>
            {moment(text).format('DD/MM/YYYY')}
            </span>
            ),
        },
        {
            title: 'Link hội thảo',
            dataIndex: 'url',
            key: 'url',
            align: 'center',
            width: 140,
            showSorterTooltip: false,
            render: (text: any) => (
                text ?
                    <Tooltip placement="bottom" title={'Đường dẫn'}>
                        <Button
                            href={text}
                            target={"_blank"}
                        >
                            <InlineSVG src={Link} width={20}/>

                        </Button>
                    </Tooltip> : <i className={`text-gray-60`}>Đang cập nhật</i>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 150,
            showSorterTooltip: false,
            render: (text: any) => (
                text ?
                    <p>{text}</p> :
                    <i className={`text-gray-60`}>Đang cập nhật</i>
            )
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            align: 'center',
            width: 150,
            showSorterTooltip: false,
            render: (text: string) => text ? (
                <span>{text}</span>
            ) : (
                <i className={`text-gray-60`}>Đang cập nhật</i>
            )
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            width: 110,
            fixed: 'right',
            align: 'center',
            render: (_: any, record: any) => (
                <div>
                    <div className={`btn-action flex space-x-2`}>
                        <Tooltip placement="bottom"
                                 title={hasPermission([PERMISSIONS.EDIT.SEMINAR_MANAGEMENT]) ? 'Chỉnh sửa' : 'Bạn không có quyền này'}>
                            <Button
                                className={"btn-edit"}
                                variant={"filled"}
                                disabled={!hasPermission([PERMISSIONS.EDIT.SEMINAR_MANAGEMENT])}
                                onClick={() => {
                                    handleMoveUpdatePage(record.id)
                                }}
                            ><InlineSVG src={Edit} width={16}/></Button>
                        </Tooltip>
                        <Tooltip placement="bottomLeft"
                                 title={hasPermission([PERMISSIONS.DELETE.SEMINAR_MANAGEMENT]) ? 'Xóa' : 'Bạn không có quyền này'}>
                            <Button
                                className={"btn-delete"}
                                color={"danger"}
                                variant={"filled"}
                                disabled={!hasPermission([PERMISSIONS.DELETE.SEMINAR_MANAGEMENT])}
                                onClick={() => openModalDelete(record)}
                            ><InlineSVG src={Delete} width={14}/></Button>
                        </Tooltip>
                    </div>
                </div>
            ),
        }
        ,];

    const handleSelectPagination = (value: any) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter.page = value;
        dispatch(setDataFilter(newDataFilter));
        dispatch(getListSeminars(newDataFilter));
    };

    const handleMoveUpdatePage = (id?: number) => {
        if (id){
            navigate(`/seminars/seminar/${id}`)
        }else {
            navigate(`/seminars/seminar`)
        }
    }

    const handleSearch = (e: any) => {
        let newDataFilter: DataFilterType = _.cloneDeep(dataFilter);
        newDataFilter.search = e.target.value;
        newDataFilter.page = 1;
        dispatch(setDataFilter(newDataFilter));
        let newTimeoutId = handleSetTimeOut(
            () => {
                dispatch(getListSeminars(newDataFilter));
            },
            500,
            timeoutId
        );
        setTimeoutId(newTimeoutId);
    };

    const openModalDelete = (seminar: any) => {
        setSeminarId(seminar.id);
        setContentModalDelete(
            <span>
                    Bạn có chắc chắn muốn xóa hội thảo{' '}
                <b>{seminar.name}</b> không?
            </span>
        );
        dispatch(setVisibleModalDeleteSeminar(true));
    };

    const handleConfirmDelete = () => {
        dispatch(deleteSeminar(seminarId));
    };

    const handleConfirmBackup = (schema: any, data: any) => {
        validate(schema, data, {
            onSuccess: (data: any) => {
                dispatch(postBuListSeminars(data));
            },
            onError: (errors: any) => dispatch(setErrorBackUp(errors))
        })
    }

    const handleConfirmExportEx = (schema: any, data: any) => {
        validate(schema, data, {
            onSuccess: (data: any) => {
                dispatch(postExportExSeminars(data));
            },
            onError: (errors: any) => dispatch(setErrorExport(errors))
        })
    }

    const handleSelectLimitTable = (value: any) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter['page'] = 1;
        newDataFilter['perPage'] = value;
        dispatch(setDataFilter(newDataFilter));
        dispatch(getListSeminars(newDataFilter));
    }

    const handleChangeInputEx = (value: any, type: keyof DataExportSeminarType) => {
        let data = _.cloneDeep(dataExport);
        let dataError = _.cloneDeep(errorExport);
        data[type] = value;
        dataError[type] = '';
        dispatch(setDataExport(data));
        dispatch(setErrorExport(dataError));
    };

    const handleChangeInputBu = <K extends keyof DataBackUpSeminarType>(value: DataBackUpSeminarType[K], type: K) => {
        let data: DataBackUpSeminarType = _.cloneDeep(dataBackUp);
        let dataError: ErrorBackUpSeminarType = _.cloneDeep(errorBackUp);
        data[type] = value;
        dataError[type] = '';
        dispatch(setDataBackUp(data));
        dispatch(setErrorBackUp(dataError));
    };
    const handleChangeTable = (___: any, __: any, sorter: any) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        if (sorter.order && sorter.field) {
            newDataFilter.sortOrder = sorter.order === "descend" ? "desc" : "asc";
            newDataFilter.sortField = sorter.field;
            dispatch(setDataFilter(newDataFilter));
            dispatch(getListSeminars(newDataFilter));
        } else {
            dispatch(getListSeminars(initDataFilter));
        }
    };

    return {
        windowWidth,
        columns,
        seminars,
        dataExport,
        errorExport,
        dataBackUp,
        errorBackUp,
        dataFilter,
        paginationList,
        isLoadingTable,
        isLoadingBtnDelete,
        isLoadingBtnBu,
        isLoadingBtnEx,
        contentModalDelete,
        visibleModalDeleteSeminar,
        visibleModalBuSeminar,
        visibleModalExSeminar,
        handleSearch,
        handleSelectPagination,
        handleConfirmDelete,
        handleMoveUpdatePage,
        openModalDelete,
        handleSelectLimitTable,
        handleChangeInputEx,
        handleChangeInputBu,
        handleConfirmBackup,
        handleConfirmExportEx,
        handleChangeTable,
    };
}