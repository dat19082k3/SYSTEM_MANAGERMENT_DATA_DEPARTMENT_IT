import React, {useState} from "react";
import useWindowSize from "@/utils/hooks/useWindowSize.ts";
import {deleteScience, getListSciences, postBuListSciences, postDownloadExSciences} from "@/api/science";
import {
    DataBackUpScienceType,
    DataExportScienceType,
    DataFilterType, setDataBackUp,
    setDataExport,
    setDataFilter, setErrorBackUp, setErrorExport,
    setVisibleModalDeleteScience
} from "@/states/modules/science";
import _ from "lodash";
import {formatHour, formatMoney, handleSetTimeOut, hasPermission} from "@/utils/helper.tsx";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {Button, Tag, Tooltip} from "antd";
import {
    handleFillStatus,
    handleFillStatusColor, MANAGER_OPTIONS_LEVEL,
    PERMISSIONS,
    TOPIC_OPTIONS_TYPE
} from "@/utils/constaints.ts";
import InlineSVG from "react-inlinesvg";
import Link from "@/assets/images/icons/duotone/link.svg";
import Edit from "@/assets/images/icons/duotone/pen-to-square.svg";
import Delete from "@/assets/images/icons/duotone/trash-can.svg";
import {validate} from "@/utils/validates";
import {initDataFilter} from "@/states/modules/faculties";

export default function Handle() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    const [scienceId, setScienceId] = useState('');
    const [contentModalDelete, setContentModalDelete] = useState<React.JSX.Element>(<></>);

    const windowWidth = useWindowSize().width;
    const dataFilter = useAppSelector((state) => state.science.dataFilter);
    const sciences = useAppSelector((state) => state.science.sciences);
    const dataExport = useAppSelector(state => state.science.dataExport)
    const errorExport = useAppSelector(state => state.science.errorExport)
    const dataBackUp = useAppSelector(state => state.science.dataBackUp)
    const errorBackUp = useAppSelector(state => state.science.errorBackUp)
    const paginationList = useAppSelector((state) => state.science.paginationListSciences);
    const isLoadingTable = useAppSelector((state) => state.science.isLoadingTableSciences);
    const isLoadingBtnDelete = useAppSelector((state) => state.science.isLoadingBtnDelete);
    const isLoadingBtnBu = useAppSelector((state) => state.science.isLoadingBtnBu);
    const isLoadingBtnEx = useAppSelector((state) => state.science.isLoadingBtnEx);
    const visibleModalDeleteScience = useAppSelector((state) => state.science.visibleModalDeleteScience);
    const visibleModalBuScience = useAppSelector((state) => state.science.visibleModalBuScience);
    const visibleModalExScience = useAppSelector((state) => state.science.visibleModalExScience);

    const columns = [
        {
            title: 'Mã đề tài',
            dataIndex: 'code',
            key: 'code',
            width: 120,
            sorter: true,
            showSorterTooltip: false,
            render: (text: any) => (
                <span className={`font-bold`}>
        {text}{' '}
        </span>
            ),
        },
        {
            title: 'Tên đề tài',
            dataIndex: 'name',
            key: 'name',
            showSorterTooltip: false,
            align: 'center',
            width: 250,
            sorter: true,
            render: (text: any) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Cấp đề tài',
            dataIndex: 'level',
            key: 'level',
            showSorterTooltip: false,
            align: 'center',
            width: 150,
            sorter: true,
            render: (text: keyof typeof MANAGER_OPTIONS_LEVEL) =>
                text ? (
                    <span>{MANAGER_OPTIONS_LEVEL[text]}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Loại đề tài',
            dataIndex: 'type',
            key: 'type',
            showSorterTooltip: false,
            align: 'center',
            width: 200,
            sorter: true,
            render: (text: keyof typeof TOPIC_OPTIONS_TYPE) =>
                text ? (
                    <span>{TOPIC_OPTIONS_TYPE[text]}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Danh sách thành viên',
            children: [
                {
                    title: 'Chủ nhiệm',
                    dataIndex: 'leader',
                    key: 'leader',
                    width: 150,
                    align: 'center',
                    showSorterTooltip: false,
                    render: (text: any) => (text ?
                        <span>{text}</span> :
                        <i className={`text-gray-60`}>Đang cập nhật</i>),
                },
                {
                    title: 'Số thành viên',
                    dataIndex: 'member_count',
                    key: 'member_count',
                    width: 150,
                    align: 'center',
                    showSorterTooltip: false,
                    render: (text: any) => (text ? <span>{text}</span> :
                        <i className={`text-gray-60`}>Đang cập nhật</i>),
                }
            ]
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'start_date',
            key: 'start_date',
            width: 140,
            align: 'center',
            showSorterTooltip: false,
            sorter: true,
            render: (_: any, record: any) => (
                <span className={""}>
            {moment(record.start_date).format('DD/MM/YYYY')}
            </span>
            ),
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'end_date',
            key: 'end_date',
            width: 145,
            align: 'center',
            sorter: true,
            showSorterTooltip: false,
            render: (_: any, record: any) => (
                <span className={""}>
            {moment(record.end_date).format('DD/MM/YYYY')}
            </span>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 150,
            showSorterTooltip: false,
            render: (text: any) => (
                <Tag
                    color={handleFillStatusColor(text)}>{handleFillStatus(text!, 'label')}</Tag>
            )
        },
        {
            title: "Sản phẩm đã đạt được",
            children: [
                {
                    title: 'Loại',
                    dataIndex: 'product_type',
                    key: 'Product_type',
                    width: 170,
                    align: 'center',
                    showSorterTooltip: false,
                    render: (text: any) => (
                        <div className={"flex-row space-y-1"}>{
                            text?.length > 0 ?
                                <span>
                                    {text.join(", ")}
                                </span> :
                                <i className={`text-gray-60`}>Đang cập nhật</i>
                        }</div>
                    )
                },
                {
                    title: 'URL sản phẩm',
                    dataIndex: 'product_url',
                    key: 'product_url',
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
            ]
        },
        {
            title: "Tổng kinh phí đề tài",
            children: [
                {
                    title: 'Tên nguồn',
                    dataIndex: 'source',
                    key: 'source',
                    align: 'center',
                    width: 130,
                    showSorterTooltip: false,
                    render: (text: any) => (
                        text ? <span>{text}</span> :
                            <i className={`text-gray-60`}>Đang cập nhật</i>)
                },
                {
                    title: 'Kinh phí',
                    dataIndex: 'budget',
                    key: 'budget',
                    align: 'center',
                    width: 110,
                    showSorterTooltip: false,
                    render: (text: any) => (
                        text ? <span>{formatMoney(text)}</span> :
                            <i className={`text-gray-60`}>Đang cập nhật</i>)
                },
                {
                    title: 'Tổng tiền',
                    dataIndex: 'total',
                    key: 'total',
                    align: 'center',
                    width: 140,
                    showSorterTooltip: false,
                    render: (text: any, record: any) => (
                        text ?
                            <span>{formatMoney(record.total)}</span> :
                            <i className={`text-gray-60`}>Đang cập nhật</i>)
                },
            ]
        },
        {
            title: "Tính giờ nghiên cứu khoa học",
            children: [
                {
                    title: 'Chủ nhiệm',
                    dataIndex: 'leader_hour',
                    key: 'leader_hour',
                    align: 'center',
                    width: 110,
                    showSorterTooltip: false,
                    render: (text: any) => (
                        text ? <span>{formatHour(text)}</span> :
                            <i className={`text-gray-60`}>Đang cập nhật</i>)
                },
                {
                    title: 'Thành viên',
                    dataIndex: 'member_hour',
                    key: 'member_hour',
                    align: 'center',
                    width: 107,
                    showSorterTooltip: false,
                    render: (text: any) => (
                        text ? <span>{formatHour(text)}</span> :
                            <i className={`text-gray-60`}>Đang cập nhật</i>)
                },
                {
                    title: 'Tổng giờ',
                    dataIndex: 'total_hour',
                    key: 'total_hour',
                    align: 'center',
                    width: 100,
                    showSorterTooltip: false,
                    render: (text: any) => (
                        text ? <span>{formatHour(text)}</span> :
                            <i className={`text-gray-60`}>Đang cập nhật</i>)
                },
            ]
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
                                 title={hasPermission([PERMISSIONS.EDIT.SCIENCE_MANAGEMENT]) ? 'Chỉnh sửa' : 'Bạn không có quyền này'}>
                            <Button
                                className={"btn-edit"}
                                variant={"filled"}
                                disabled={!hasPermission([PERMISSIONS.EDIT.SCIENCE_MANAGEMENT])}
                                onClick={() => {
                                    handleMoveUpdatePage(record.id)
                                }}
                            ><InlineSVG src={Edit} width={16}/></Button>
                        </Tooltip>
                        <Tooltip placement="bottomLeft"
                                 title={hasPermission([PERMISSIONS.DELETE.SCIENCE_MANAGEMENT]) ? 'Xóa' : 'Bạn không có quyền này'}>
                            <Button
                                className={"btn-delete"}
                                color={"danger"}
                                variant={"filled"}
                                disabled={!hasPermission([PERMISSIONS.DELETE.SCIENCE_MANAGEMENT])}
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
        dispatch(getListSciences(newDataFilter));
    };

    const handleMoveUpdatePage = (id?: number) => {
        if(id){
            navigate(`/sciences/science/${id}`)
        }else {
            navigate(`/sciences/science`)
        }

    }

    const handleSearch = (e: any) => {
        let newDataFilter: DataFilterType = _.cloneDeep(dataFilter);
        newDataFilter.search = e.target.value;
        newDataFilter.page = 1;
        dispatch(setDataFilter(newDataFilter));
        let newTimeoutId = handleSetTimeOut(
            () => {
                dispatch(getListSciences(newDataFilter));
            },
            500,
            timeoutId
        );
        setTimeoutId(newTimeoutId);
    };

    const openModalDelete = (science: any) => {
        setScienceId(science.id);
        setContentModalDelete(
            <span>
                    Bạn có chắc chắn muốn xóa đề tài{' '}
                <b>{science.code}</b> không?
            </span>
        );
        dispatch(setVisibleModalDeleteScience(true));
    };

    const handleConfirmDelete = () => {
        dispatch(deleteScience(scienceId));
    };

    const handleConfirmBackup = (schema: any, data: any) => {
        validate(schema, data, {
            onSuccess: (data: any) => {
                dispatch(postBuListSciences(data));
            },
            onError: (errors: any) => dispatch(setErrorBackUp(errors))
        })
    }

    const handleConfirmExportEx = (schema: any, data: any) => {
        validate(schema, data, {
            onSuccess: (data: any) => {
                dispatch(postDownloadExSciences(data));
            },
            onError: (errors: any) => dispatch(setErrorExport(errors))
        })
    }


    const handleSelectLimitTable = (value: any) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter['page'] = 1;
        newDataFilter['perPage'] = value;
        dispatch(setDataFilter(newDataFilter));
        dispatch(getListSciences(newDataFilter));
    }

    const handleChangeInputEx = (value: any, type: keyof DataExportScienceType) => {
        let data = _.cloneDeep(dataExport);
        let dataError = _.cloneDeep(errorExport);
        data[type] = value;
        dataError[type] = '';
        dispatch(setDataExport(data));
        dispatch(setErrorExport(dataError));
    };

    const handleChangeInputBu = <K extends keyof DataBackUpScienceType>(value: DataBackUpScienceType[K], type: K) => {
        let data = _.cloneDeep(dataBackUp);
        let dataError = _.cloneDeep(errorBackUp);
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
            dispatch(getListSciences(newDataFilter));
        } else {
            dispatch(getListSciences(initDataFilter))
        }

    };

    return {
        windowWidth,
        columns,
        sciences,
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
        visibleModalDeleteScience,
        visibleModalBuScience,
        visibleModalExScience,
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