import MainLayout from "@/layouts/MainLayout";
import IconSearch from '../../assets/images/icons/duotone/magnifying-glass.svg';
import styles from './styles.module.scss';
import {Button, Input} from "antd";
import Handle from "@/pages/Sciences/handle.tsx";
import TableDefault from '../../components/Table';
import {useAppDispatch} from "@/states/hooks.ts";
import ModalDeleteDefault from "@/components/ModalDelete";
import {
    initDataBackUp,
    setDataExport,
    setVisibleModalDeleteScience,
    setVisibleModalBuScience,
    setDataBackUp,
    initDataExport,
    setVisibleModalExScience,
    setErrorBackUp,
    initErrorBackUp,
    setErrorExport, initErrorExport
} from "@/states/modules/science";
import Backup from "../../assets/images/icons/duotone/layer-group.svg"
import ExportExIcon from "../../assets/images/icons/duotone/pen-to-square.svg"
import Plus from "../../assets/images/icons/duotone/plus.svg"
import InlineSVG from "react-inlinesvg";
import ModalDefault from "@/components/Modal";
import BackUp from "@/pages/Sciences/components/BackUp.tsx";
import ExportEx from "@/pages/Sciences/components/ExportEx.tsx";
import {hasPermission} from "@/utils/helper.tsx";
import {PERMISSIONS} from "@/utils/constaints.ts";


function Sciences() {
    const dispatch = useAppDispatch();

    const {
        windowWidth,
        columns,
        sciences,
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
                            placeholder={'Nhập mã đề tài, tên đề tài để tìm kiếm'}
                            value={dataFilter.search}
                            autoComplete="off"
                            onChange={(e) => handleSearch(e)}
                        />
                    </div>
                    <div className={"flex space-x-3"}>
                        {
                            hasPermission([PERMISSIONS.ADD.SCIENCE_MANAGEMENT])&&
                            <Button
                                size={"large"}
                                className={"font-bold bg-green-45 text-white"}
                                icon={<InlineSVG src={Plus} width={14}/>}
                                loading={isLoadingBtnEx}
                                onClick={() => handleMoveUpdatePage()}
                            >Thêm mới</Button>
                        }
                        {hasPermission([PERMISSIONS.EDIT.BACKUP_SCIENCE])&&
                            <Button
                            type={"primary"}
                            size={"large"}
                            className={"font-bold"}
                            icon={<InlineSVG src={Backup} width={14}/>}
                            loading={isLoadingBtnBu}
                            onClick={() => dispatch(setVisibleModalBuScience(true))}
                        >Sao lưu</Button>
                        }
                        {
                            hasPermission([PERMISSIONS.LIST.DOWNLOAD_EXCEL_SCIENCE])&&
                            <Button
                                size={"large"}
                                className={"text-white font-bold bg-green-45"}
                                icon={<InlineSVG src={ExportExIcon} width={14}/>}
                                loading={isLoadingBtnEx}
                                onClick={() => dispatch(setVisibleModalExScience(true))}
                            >Xuất Excel</Button>
                        }
                    </div>
                </div>

                <div className={styles.tableWrap}>
                    <TableDefault
                        loading={isLoadingTable}
                        dataSource={sciences}
                        columns={columns}
                        pagination={paginationList}
                        onChange={handleChangeTable}
                        isPagination={true}
                        handleSelectPagination={(e: any) => handleSelectPagination(e)}
                        isFixed
                        extraClassName={'h-[calc(100vh-255px)]'}
                        scroll={{
                            x: 1500,
                            y: windowWidth <= 576 ? 'calc(100vh - 370px)' : windowWidth <= 1536 ? 'calc(100vh - 315px)' : 'calc(100vh - 310px)'
                        }}
                        rowKey={(record: any) => record.code}
                        limitTable={dataFilter.perPage}
                        handleSelectLimitTable={(e: any) => handleSelectLimitTable(e)}
                    />
                </div>
            </div>
            <ModalDeleteDefault
                content={contentModalDelete}
                contentBtn={"Xóa đề tài NCKH"}
                isModalOpen={visibleModalDeleteScience}
                handleOk={() => dispatch(setVisibleModalDeleteScience(false))}
                handleCancel={() => dispatch(setVisibleModalDeleteScience(false))}
                handleConfirm={() => handleConfirmDelete()}
                loading={isLoadingBtnDelete}
            />
            <ModalDefault
                isModalOpen={visibleModalBuScience}
                title={"Sao lưu dữ liệu"}
                handleCancel={() => {
                    dispatch(setDataBackUp(initDataBackUp))
                    dispatch(setErrorBackUp(initErrorBackUp))
                    dispatch(setVisibleModalBuScience(false))
                }}
            >
                <BackUp/>
            </ModalDefault>
            <ModalDefault
                isModalOpen={visibleModalExScience}
                title={"Xuất dữ liệu"}
                handleCancel={() => {
                    dispatch(setDataExport(initDataExport))
                    dispatch(setErrorExport(initErrorExport))
                    dispatch(setVisibleModalExScience(false))
                }}
            >
                <ExportEx/>
            </ModalDefault>
        </MainLayout>
    )
}

export default Sciences