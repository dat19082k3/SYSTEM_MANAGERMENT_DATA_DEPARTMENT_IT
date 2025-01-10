import MainLayout from "@/layouts/MainLayout";
import IconSearch from '../../assets/images/icons/duotone/magnifying-glass.svg';
import styles from './styles.module.scss';
import {Button, Input} from "antd";
import TableDefault from '../../components/Table';
import {useAppDispatch} from "@/states/hooks.ts";
import ModalDeleteDefault from "@/components/ModalDelete";
import Backup from "../../assets/images/icons/duotone/layer-group.svg"
import ExportExIcon from "../../assets/images/icons/duotone/pen-to-square.svg"
import InlineSVG from "react-inlinesvg";
import ModalDefault from "@/components/Modal";
import Handle from "@/pages/Paper/handle.tsx";
import BackUp from "@/pages/Paper/components/BackUp.tsx";
import {
    initDataBackUp,
    initDataExport,
    initErrorBackUp,
    initErrorExport,
    setDataBackUp,
    setDataExport,
    setErrorBackUp,
    setErrorExport,
    setVisibleModalBuPaper,
    setVisibleModalDeletePaper,
    setVisibleModalExPaper
} from "@/states/modules/paper";
import ExportEx from "@/pages/Paper/components/ExportEx.tsx";
import {hasPermission} from "@/utils/helper.tsx";
import {PERMISSIONS} from "@/utils/constaints.ts";
import Plus from "@/assets/images/icons/duotone/plus.svg";


function Papers() {
    const dispatch = useAppDispatch();

    const {
        windowWidth,
        columns,
        papers,
        dataFilter,
        paginationList,
        isLoadingTable,
        isLoadingBtnDelete,
        contentModalDelete,
        visibleModalDeletePaper,
        visibleModalBuPaper,
        visibleModalExPaper,
        handleSearch,
        handleSelectPagination,
        handleConfirmDelete,
        handleSelectLimitTable,
        handleChangeTable,
        handleMoveUpdatePage
    } = Handle();

    return (
        <MainLayout>
            <div className={styles.listWrap}>
                <div className={styles.filterWrap}>
                    <div className={styles.search}>
                        <Input
                            prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt=""/>}
                            className={`main-input`}
                            placeholder={'Nhập tên bài báo để tìm kiếm'}
                            value={dataFilter.search}
                            autoComplete="off"
                            onChange={(e) => handleSearch(e)}
                        />
                    </div>
                    <div className={"flex space-x-3"}>
                        {
                            hasPermission([PERMISSIONS.ADD.PAPER_MANAGEMENT])&&
                            <Button
                                size={"large"}
                                className={"text-white font-bold bg-green-45"}
                                icon={<InlineSVG src={Plus} width={14}/>}
                                onClick={() => handleMoveUpdatePage()}
                            >Thêm mới</Button>
                        }
                        {hasPermission([PERMISSIONS.EDIT.BACKUP_PAPER])&&
                            <Button
                                type={"primary"}
                                size={"large"}
                                className={"font-bold"}
                                icon={<InlineSVG src={Backup} width={14}/>}
                                onClick={() => dispatch(setVisibleModalBuPaper(true))}
                            >Sao lưu</Button>
                        }

                        {hasPermission([PERMISSIONS.LIST.DOWNLOAD_EXCEL_PAPER])&&
                            <Button
                                size={"large"}
                                className={"text-white font-bold bg-green-45"}
                                icon={<InlineSVG src={ExportExIcon} width={14}/>}
                                onClick={() => dispatch(setVisibleModalExPaper(true))}
                            >Xuất Excel</Button>
                        }
                    </div>
                </div>

                <div className={styles.tableWrap}>
                    <TableDefault
                        loading={isLoadingTable}
                        dataSource={papers}
                        columns={columns}
                        pagination={paginationList}
                        isPagination={true}
                        handleSelectPagination={(e: any) => handleSelectPagination(e)}
                        onChange={handleChangeTable}
                        extraClassName={'h-[calc(100vh-255px)]'}
                        isFixed
                        scroll={{
                            x: 1500,
                            y: windowWidth <= 576 ? 'calc(100vh - 370px)' : windowWidth <= 1536 ? 'calc(100vh - 285px)' : 'calc(100vh - 310px)'
                        }}
                        rowKey={(record: any) => record.id}
                        limitTable={dataFilter.perPage}
                        handleSelectLimitTable={(e:any) => handleSelectLimitTable(e)}
                    />
                </div>
            </div>
            <ModalDeleteDefault
                content={contentModalDelete}
                contentBtn={"Xóa bài báo"}
                isModalOpen={visibleModalDeletePaper}
                handleOk={() => dispatch(setVisibleModalDeletePaper(false))}
                handleCancel={() => dispatch(setVisibleModalDeletePaper(false))}
                handleConfirm={() => handleConfirmDelete()}
                loading={isLoadingBtnDelete}
            />
            <ModalDefault
                isModalOpen={visibleModalBuPaper}
                title={"Sao lưu dữ liệu"}
                handleCancel={() => {
                    dispatch(setDataBackUp(initDataBackUp))
                    dispatch(setErrorBackUp(initErrorBackUp))
                    dispatch(setVisibleModalBuPaper(false))
                }}
            >
                <BackUp/>
            </ModalDefault>
            <ModalDefault
                isModalOpen={visibleModalExPaper}
                title={"Xuất dữ liệu"}
                handleCancel={() => {
                    dispatch(setDataExport(initDataExport))
                    dispatch(setErrorExport(initErrorExport))
                    dispatch(setVisibleModalExPaper(false))
                }}
            >
                <ExportEx/>
            </ModalDefault>
        </MainLayout>
    )
}

export default Papers