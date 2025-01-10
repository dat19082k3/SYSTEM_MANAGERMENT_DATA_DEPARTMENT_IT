import MainLayout from "@/layouts/MainLayout";
import styles from "@/pages/Sciences/styles.module.scss";
import {Button, Input} from "antd";
import IconSearch from "@/assets/images/icons/duotone/magnifying-glass.svg";
import TableDefault from "@/components/Table";
import Handle from "@/pages/Faculties/handle";
import './styles.scss'
import InlineSVG from "react-inlinesvg";
import Plus from "@/assets/images/icons/duotone/plus.svg";
import {useAppDispatch} from "@/states/hooks.ts";
import ModalDeleteDefault from "@/components/ModalDelete";
import {
    initDataFaculty,
    setDataFaculty,
    setVisibleModalCreOrUpdFaculty,
    setVisibleModalDeleteFaculty
} from "@/states/modules/faculties";
import ModalDefault from "@/components/Modal";
import CreateOrUpdateFaculty from "@/pages/Faculties/components/CreateOrUpdateFaculty.tsx";
import {hasPermission} from "@/utils/helper.tsx";
import {PERMISSIONS} from "@/utils/constaints.ts";

function Faculties() {
    const dispatch = useAppDispatch();
    const {
        windowWidth,
        columns,
        faculties,
        dataFilter,
        dataFaculty,
        paginationListFaculties,
        isLoadingTableFaculties,
        visibleModalDelete,
        visibleModalCreOrUpd,
        isLoadingBtnDelete,
        contentModalDelete,
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
                            placeholder={'Nhập mã, tên cán bộ để tìm kiếm'}
                            value={dataFilter.search}
                            autoComplete="off"
                            onChange={(e) => handleSearch(e)}
                        />
                    </div>
                    <div className={"flex space-x-3"}>
                        {hasPermission([PERMISSIONS.ADD.FACULTY_MANAGEMENT]) &&
                            <Button
                                type={"primary"}
                                size={"large"}
                                className={"text-white font-bold"}
                                icon={<InlineSVG src={Plus} width={14}/>}
                                onClick={() => {
                                    dispatch(setDataFaculty(initDataFaculty));
                                    dispatch(setVisibleModalCreOrUpdFaculty(true))
                                }}
                            >Thêm mới</Button>
                        }
                    </div>
                </div>

                <div className={styles.tableWrap}>
                    <TableDefault
                        loading={isLoadingTableFaculties}
                        dataSource={faculties}
                        columns={columns}
                        onChange={handleChangeTable}
                        pagination={paginationListFaculties}
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
                contentBtn={"Xóa cán bộ"}
                isModalOpen={visibleModalDelete}
                handleOk={() => dispatch(setVisibleModalDeleteFaculty(false))}
                handleCancel={() => dispatch(setVisibleModalDeleteFaculty(false))}
                handleConfirm={() => handleConfirmDelete()}
                loading={isLoadingBtnDelete}
            />
            <ModalDefault
                isModalOpen={visibleModalCreOrUpd}
                title={dataFaculty.id ? "Cập nhật cán bộ" : "Thêm mới cán bộ"}
                handleCancel={() => {
                    dispatch(setDataFaculty(initDataFaculty))
                    dispatch(setVisibleModalCreOrUpdFaculty(false))
                }}
            >
                <CreateOrUpdateFaculty/>
            </ModalDefault>
        </MainLayout>
    )
}

export default Faculties