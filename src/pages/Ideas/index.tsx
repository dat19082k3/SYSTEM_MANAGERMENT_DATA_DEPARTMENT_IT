import MainLayout from "@/layouts/MainLayout";
import styles from "@/pages/Sciences/styles.module.scss";
import {Button, Input} from "antd";
import IconSearch from "@/assets/images/icons/duotone/magnifying-glass.svg";
import TableDefault from "@/components/Table";
import Handle from "@/pages/Ideas/handle";
import './styles.scss'
import InlineSVG from "react-inlinesvg";
import Plus from "@/assets/images/icons/duotone/plus.svg";
import ExportEx from "@/assets/images/icons/duotone/pen-to-square.svg";
import {useAppDispatch} from "@/states/hooks.ts";
import {getDownloadExIdea} from "@/api/idea";
import ModalDeleteDefault from "@/components/ModalDelete";
import {initDataIdea, setDataIdea, setVisibleModalCreOrUpdIdea, setVisibleModalDeleteIdea} from "@/states/modules/idea";
import ModalDefault from "@/components/Modal";
import CreateOrUpdateIdea from "@/pages/Ideas/components/CreateOrUpdateIdea.tsx";
import {hasPermission} from "@/utils/helper.tsx";
import {PERMISSIONS} from "@/utils/constaints.ts";

function IdeaStudents() {
    const dispatch = useAppDispatch();
    const {
        windowWidth,
        columns,
        ideas,
        dataFilter,
        dataIdea,
        paginationListIdeas,
        isLoadingTableIdeas,
        visibleModalDelete,
        visibleModalCreOrUpd,
        isLoadingBtnDelete,
        contentModalDelete,
        isLoadingDownloadEx,
        handleSearch,
        handleChangeTable,
        handleSelectPagination,
        handleConfirmDelete,
        handleSelectLimitTable
    } = Handle();

    return (
        <MainLayout>
            <div className={styles.listWrap}>
                <div className={styles.filterWrap}>
                    <div className={styles.search}>
                        <Input
                            prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt=""/>}
                            className={`main-input`}
                            placeholder={'Nhập tên ý tưởng để tìm kiếm'}
                            value={dataFilter.search}
                            autoComplete="off"
                            onChange={(e) => handleSearch(e)}
                        />
                    </div>
                    <div className={"flex space-x-3"}>
                        {hasPermission([PERMISSIONS.ADD.IDEA_MANAGEMENT]) &&
                            <Button
                                type={"primary"}
                                size={"large"}
                                className={"text-white font-bold"}
                                icon={<InlineSVG src={Plus} width={14}/>}
                                onClick={() => {
                                    dispatch(setDataIdea(initDataIdea));
                                    dispatch(setVisibleModalCreOrUpdIdea(true))
                                }}
                            >Thêm mới</Button>
                        }
                        {hasPermission([PERMISSIONS.LIST.IDEA_MANAGEMENT]) &&
                        <Button
                            type={"default"}
                            size={"large"}
                            className={"bg-green-45 text-white font-bold"}
                            icon={<InlineSVG src={ExportEx} width={14}/>}
                            loading={isLoadingDownloadEx}
                            onClick={() => dispatch(getDownloadExIdea())}
                        >Xuất Excel</Button>
                        }
                    </div>
                </div>

                <div className={styles.tableWrap}>
                    <TableDefault
                        loading={isLoadingTableIdeas}
                        dataSource={ideas}
                        columns={columns}
                        onChange={handleChangeTable}
                        pagination={paginationListIdeas}
                        isPagination={true}
                        handleSelectPagination={(e: any) => handleSelectPagination(e)}
                        isFixed
                        extraClassName={'h-[calc(100vh-255px)]'}
                        scroll={{
                            x: 1200,
                            y: windowWidth <= 576 ? 'calc(100vh - 370px)' : windowWidth <= 1536 ? 'calc(100vh - 285px)' : 'calc(100vh - 310px)'
                        }}
                        rowKey={'id'}
                        limitTable={dataFilter.perPage}
                        handleSelectLimitTable={(e: any) => handleSelectLimitTable(e)}
                    />
                </div>
            </div>
            <ModalDeleteDefault
                content={contentModalDelete}
                contentBtn={"Xóa ý tưởng"}
                isModalOpen={visibleModalDelete}
                handleOk={() => dispatch(setVisibleModalDeleteIdea(false))}
                handleCancel={() => dispatch(setVisibleModalDeleteIdea(false))}
                handleConfirm={() => handleConfirmDelete()}
                loading={isLoadingBtnDelete}
            />
            <ModalDefault
                isModalOpen={visibleModalCreOrUpd}
                title={dataIdea.id ? "Cập nhật ý tưởng sinh viên" : "Thêm mới ý tưởng sinh viên"}
                handleCancel={() => {
                    dispatch(setDataIdea(initDataIdea))
                    dispatch(setVisibleModalCreOrUpdIdea(false))
                }}
            >
                <CreateOrUpdateIdea/>
            </ModalDefault>
        </MainLayout>
    )
}

export default IdeaStudents