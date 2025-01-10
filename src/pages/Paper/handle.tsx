import React, {useState} from "react";
import useWindowSize from "@/utils/hooks/useWindowSize.ts";
import {deletePaper, getListPapers, postBuListPapers, postExportExPapers} from "@/api/paper";
import {
    DataBackUpType,
    DataExportType,
    setDataBackUp,
    setDataExport,
    setDataFilter, setErrorBackUp, setErrorExport,
    setVisibleModalDeletePaper
} from "@/states/modules/paper";
import _ from "lodash";
import {handleSetTimeOut, hasPermission} from "@/utils/helper.tsx";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {Button, Tooltip} from "antd";
import {PAPER_TYPE, PERMISSIONS} from "@/utils/constaints.ts";
import InlineSVG from "react-inlinesvg";
import Link from "@/assets/images/icons/duotone/link.svg";
import Edit from "@/assets/images/icons/duotone/pen-to-square.svg";
import Delete from "@/assets/images/icons/duotone/trash-can.svg";
import {validate} from "@/utils/validates";
import {DataFilterType} from "@/states/modules/science";
import {initDataFilter} from "@/states/modules/faculties";

export default function Handle() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    const [paperId, setPaperId] = useState('');
    const [contentModalDelete, setContentModalDelete] = useState<React.JSX.Element>(<></>);

    const windowWidth = useWindowSize().width;
    const dataFilter = useAppSelector((state) => state.paper.dataFilter);
    const papers = useAppSelector((state) => state.paper.papers);
    const dataExport = useAppSelector(state => state.paper.dataExport);
    const errorExport = useAppSelector(state => state.paper.errorExport);
    const dataBackUp = useAppSelector(state => state.paper.dataBackUp)
    const errorBackUp = useAppSelector(state => state.paper.errorBackUp)
    const paginationList = useAppSelector((state) => state.paper.paginationListPapers);
    const isLoadingTable = useAppSelector((state) => state.paper.isLoadingTablePapers);
    const isLoadingBtnDelete = useAppSelector((state) => state.paper.isLoadingBtnDelete);
    const isLoadingBtnBu = useAppSelector((state) => state.paper.isLoadingBtnBu);
    const isLoadingBtnEx = useAppSelector((state) => state.paper.isLoadingBtnEx);
    const visibleModalDeletePaper = useAppSelector((state) => state.paper.visibleModalDeletePaper);
    const visibleModalBuPaper = useAppSelector((state) => state.paper.visibleModalBuPaper);
    const visibleModalExPaper = useAppSelector((state) => state.paper.visibleModalExPaper);

    const columns = [
        {
            title: 'Tên bài báo',
            dataIndex: 'article_title',
            key: 'article_title',
            width: 400,
            align: "center",
            showSorterTooltip: false,
            sorter: true,
            render: (text: any) => (
                <span className={`font-bold`}>
        {text}{' '}
        </span>
            ),
        },
        {
            title: 'Tên tạp chí',
            dataIndex: 'journal_name',
            key: 'journal_name',
            showSorterTooltip: false,
            align: 'center',
            width: 240,
            sorter: true,
            render: (text: any) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Loại bài báo',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            width: 150,
            showSorterTooltip: false,
            render: (text: keyof typeof PAPER_TYPE) => (
                text ?
                    <p>{PAPER_TYPE[text]}</p> :
                    <i className={`text-gray-60`}>Đang cập nhật</i>
            )
        },
        {
            title: 'Năm xuất bản',
            dataIndex: 'year',
            key: 'year',
            width: 150,
            align: 'center',
            showSorterTooltip: false,
            sorter: true,
            render: (text: any) => (
                <span className={""}>
            {text}
            </span>
            ),
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit',
            key: 'unit',
            showSorterTooltip: false,
            align: 'center',
            width: 150,
            render: (text: any) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Quốc gia',
            dataIndex: 'country',
            key: 'country',
            showSorterTooltip: false,
            align: 'center',
            width: 160,
            render: (text: any) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Lĩnh vực',
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
            title: 'Tác giả',
            dataIndex: 'authors',
            key: 'authors',
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
            title: 'Số lượng tác giả',
            dataIndex: 'author_count',
            key: 'author_count',
            showSorterTooltip: false,
            align: 'center',
            width: 200,
            sorter: true,
            render: (text: any) =>
                text ? (
                    <span>{text}</span>
                ) : (
                    <i className={`text-gray-60`}>Đang cập nhật</i>
                ),
        },
        {
            title: 'Tính giờ',
            dataIndex: 'hour',
            key: 'hour',
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
            render: (_: any, record: any) => (
                <span className={""}>
            {moment(record.creation_date).format('DD/MM/YYYY')}
            </span>
            ),
        },
        {
            title: 'Link bài báo',
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
                                 title={hasPermission([PERMISSIONS.EDIT.PAPER_MANAGEMENT]) ? 'Chỉnh sửa' : 'Bạn không có quyền này'}>
                            <Button
                                className={"btn-edit"}
                                variant={"filled"}
                                disabled={!hasPermission([PERMISSIONS.EDIT.PAPER_MANAGEMENT])}
                                onClick={() => {
                                    handleMoveUpdatePage(record.id)
                                }}
                            ><InlineSVG src={Edit} width={16}/></Button>
                        </Tooltip>
                        <Tooltip placement="bottom"
                                 title={hasPermission([PERMISSIONS.DELETE.PAPER_MANAGEMENT]) ? 'Xóa' : 'Bạn không có quyền này'}>
                            <Button
                                className={"btn-delete"}
                                color={"danger"}
                                variant={"filled"}
                                disabled={!hasPermission([PERMISSIONS.DELETE.PAPER_MANAGEMENT])}
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
        dispatch(getListPapers(newDataFilter));
    };

    const handleMoveUpdatePage = (id?: number) => {
        if (id){
            navigate(`/papers/paper/${id}`)
        }else {
            navigate(`/papers/paper`)
        }
    }

    const handleSearch = (e: any) => {
        let newDataFilter: DataFilterType = _.cloneDeep(dataFilter);
        newDataFilter.search = e.target.value;
        newDataFilter.page = 1;
        dispatch(setDataFilter(newDataFilter));
        let newTimeoutId = handleSetTimeOut(
            () => {
                dispatch(getListPapers(newDataFilter));
            },
            500,
            timeoutId
        );
        setTimeoutId(newTimeoutId);
    };

    const openModalDelete = (paper: any) => {
        setPaperId(paper.id);
        setContentModalDelete(
            <span>
                    Bạn có chắc chắn muốn xóa bài báo{' '}
                <b>{paper.article_title}</b> không?
            </span>
        );
        dispatch(setVisibleModalDeletePaper(true));
    };

    const handleConfirmDelete = () => {
        dispatch(deletePaper(paperId));
    };

    const handleConfirmBackup = (schema: any, data: any) => {
        validate(schema, data, {
            onSuccess: (data: any) => {
                dispatch(postBuListPapers(data));
            },
            onError: (errors: any) => dispatch(setErrorBackUp(errors))
        })
    }

    const handleConfirmExportEx = (schema: any, data: any) => {
        validate(schema, data, {
            onSuccess: (data: any) => {
                dispatch(postExportExPapers(data));
            },
            onError: (errors: any) => dispatch(setErrorExport(errors))
        })
    }

    const handleSelectLimitTable = (value: any) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter['page'] = 1;
        newDataFilter['perPage'] = value;
        dispatch(setDataFilter(newDataFilter));
        dispatch(getListPapers(newDataFilter));
    }

    const handleChangeInputEx = (value: any, type: keyof DataExportType) => {
        let data = _.cloneDeep(dataExport);
        let dataError = _.cloneDeep(errorExport);
        data[type] = value;
        dataError[type] = '';
        dispatch(setDataExport(data));
        dispatch(setErrorExport(dataError));
    };

    const handleChangeInputBu = <K extends keyof DataBackUpType>(value: DataBackUpType[K], type: K) => {
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
            dispatch(getListPapers(newDataFilter));
        } else {
            dispatch(getListPapers(initDataFilter));
        }
    };

    return {
        windowWidth,
        columns,
        papers,
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
        visibleModalDeletePaper,
        visibleModalBuPaper,
        visibleModalExPaper,
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