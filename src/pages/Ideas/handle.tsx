import React, {useState} from "react";
import useWindowSize from "@/utils/hooks/useWindowSize.ts";
import {deleteIdea, getListIdeas, postCreateIdea, putUpdateIdea} from "@/api/idea";
import InlineSVG from "react-inlinesvg";
import {Button, Tooltip} from "antd";
import Delete from "@/assets/images/icons/duotone/trash-can.svg";
import _ from "lodash";
import {handleSetTimeOut, hasPermission} from "@/utils/helper.tsx";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";
import {
    setDataFilter, setDataIdea, setErrorIdea, setVisibleModalCreOrUpdIdea,
    setVisibleModalDeleteIdea,
} from "@/states/modules/idea";
import Edit from "@/assets/images/icons/duotone/pen-to-square.svg";
import {validate} from "@/utils/validates";
import {DataFilterType} from "@/states/modules/science";
import {PERMISSIONS} from "@/utils/constaints.ts";
import {initDataFilter} from "@/states/modules/faculties";

export default function Handle() {
    const dispatch = useAppDispatch();
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    const [ideaId, setIdeaId] = useState("");
    const [contentModalDelete, setContentModalDelete] = useState<React.JSX.Element>(<></>);

    const windowWidth = useWindowSize().width;
    const dataFilter = useAppSelector((state) => state.idea.dataFilter);
    const dataIdea = useAppSelector((state) => state.idea.dataIdea);
    const errorIdea = useAppSelector((state) => state.idea.errorIdea);
    const ideas = useAppSelector((state) => state.idea.ideas);

    const paginationListIdeas = useAppSelector(
        (state) => state.idea.paginationListIdeas
    );
    const isLoadingTableIdeas = useAppSelector(
        (state) => state.idea.isLoadingTableIdeas
    );
    const isLoadingBtnDelete = useAppSelector(
        (state) => state.idea.isLoadingBtnDelete
    );
    const isLoadingBtnCreOrUpd = useAppSelector(
        (state) => state.idea.isLoadingBtnCreOrUpd
    );
    const isLoadingDownloadEx = useAppSelector(
        (state) => state.idea.isLoadingDownloadEx
    );
    const visibleModalDelete = useAppSelector(
        (state) => state.idea.visibleModalDelete
    );
    const visibleModalCreOrUpd = useAppSelector(
        (state) => state.idea.visibleModalCreOrUpd
    );

    const columns = [
        {
            title: "Tên đề tài",
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
            title: "Nhóm",
            dataIndex: "group",
            key: "group",
            width: 160,
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
            title: "Lớp",
            dataIndex: "class",
            key: "class",
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
            title: "Giáo viên hướng dẫn",
            dataIndex: "guide",
            key: "guide",
            width: 190,
            align: "center",
            showSorterTooltip: false,
            render: (_: any, record: any) => <span>{record.guide}</span>,
        },
        {
            title: "Năm thực hiện",
            dataIndex: "year",
            key: "year",
            width: 150,
            align: "center",
            sorter: true,
            showSorterTooltip: false,
            render: (text: number) => <span>{text}</span>,
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
            width: 250,
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
                                 title={hasPermission([PERMISSIONS.EDIT.IDEA_MANAGEMENT]) ? 'Chỉnh sửa' : 'Bạn không quyền này'}>
                            <Button
                                className={"btn-edit"}
                                variant={"filled"}
                                disabled={!hasPermission([PERMISSIONS.EDIT.IDEA_MANAGEMENT])}
                                onClick={() => openModalCreOrUpd(record)}
                            ><InlineSVG src={Edit} width={16}/></Button>
                        </Tooltip>
                        <Tooltip placement="bottomLeft"
                                 title={hasPermission([PERMISSIONS.DELETE.IDEA_MANAGEMENT]) ? 'Xóa' : 'Bạn không có quyền này'}>
                            <Button
                                className={"btn-delete"}
                                color={"danger"}
                                variant={"filled"}
                                disabled={!hasPermission([PERMISSIONS.DELETE.IDEA_MANAGEMENT])}
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
                dispatch(getListIdeas(newDataFilter));
            },
            500,
            timeoutId
        );
        setTimeoutId(newTimeoutId);
    };

    const openModalDelete = (idea: any) => {
        setIdeaId(idea.id);
        setContentModalDelete(
            <span>
        Bạn có chắc chắn muốn xóa ý tưởng{" "}<b>{idea.name}</b> không?
      </span>
        );
        dispatch(setVisibleModalDeleteIdea(true));
    };

    const openModalCreOrUpd = (idea: any) => {
        dispatch(setDataIdea(idea))
        dispatch(setVisibleModalCreOrUpdIdea(true));
    };

    const handleChangeInputInfo = (value: any, type: string) => {
        let data = _.cloneDeep(dataIdea);
        let dataError = _.cloneDeep(errorIdea);
        data[type] = value;
        dataError[type] = '';
        dispatch(setDataIdea(data));
        dispatch(setErrorIdea(dataError));
    };

    const handleConfirmDelete = () => {
        dispatch(deleteIdea(ideaId));
    };

    const handleConfirmCreOrUpd = (scheme: any, data: any) => {
        if (data && data.id) {
            validate(scheme, data, {
                onSuccess: (data: any) => {
                    dispatch(putUpdateIdea(data.id, data))
                },
                onError: (error: any) => dispatch(setErrorIdea(error)),
            });
        } else {
            validate(scheme, data, {
                onSuccess: (data: any) => {
                    dispatch(postCreateIdea(data))
                },
                onError: (error: any) => dispatch(setErrorIdea(error)),
            });
        }
    };

    const handleSelectLimitTable = (value: number) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter["page"] = 1;
        newDataFilter["perPage"] = value;
        dispatch(setDataFilter(newDataFilter));
        dispatch(getListIdeas(newDataFilter));
    };

    const handleChangeTable = (___: any, __: any, sorter: any) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        if (sorter.order && sorter.field) {
            newDataFilter.sortOrder = sorter.order === "descend" ? "desc" : "asc";
            newDataFilter.sortField = sorter.field;
            dispatch(setDataFilter(newDataFilter));
            dispatch(getListIdeas(newDataFilter));
        } else {
            dispatch(getListIdeas(initDataFilter));
        }

    };

    return {
        windowWidth,
        columns,
        ideas,
        dataFilter,
        paginationListIdeas,
        isLoadingTableIdeas,
        isLoadingBtnDelete,
        isLoadingBtnCreOrUpd,
        visibleModalDelete,
        visibleModalCreOrUpd,
        contentModalDelete,
        dataIdea,
        errorIdea,
        isLoadingDownloadEx,
        handleSearch,
        handleSelectPagination,
        handleChangeInputInfo,
        handleConfirmDelete,
        handleConfirmCreOrUpd,
        handleSelectLimitTable,
        handleChangeTable
    };
}
