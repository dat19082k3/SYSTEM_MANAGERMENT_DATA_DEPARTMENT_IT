import MainLayout from "@/layouts/MainLayout";
import styles from "@/pages/Sciences/styles.module.scss";
import {Button, Input} from "antd";
import IconSearch from "@/assets/images/icons/duotone/magnifying-glass.svg";
import TableDefault from "@/components/Table";
import Handle from "@/pages/StudentGraduates/handle";
import './styles.scss'
import InlineSVG from "react-inlinesvg";
import Plus from "@/assets/images/icons/duotone/plus.svg";
import {useAppDispatch} from "@/states/hooks.ts";
import ModalDeleteDefault from "@/components/ModalDelete";
import {
    initDataStudentGraduate,
    setDataStudentGraduate,
    setVisibleModalCreOrUpdStudentGraduate,
    setVisibleModalDeleteStudentGraduate
} from "@/states/modules/graduates";
import ModalDefault from "@/components/Modal";
import CreateOrUpdateStudentGraduate from "@/pages/StudentGraduates/components/CreateOrUpdateStudentGraduate.tsx";
import {hasPermission} from "@/utils/helper.tsx";
import {PERMISSIONS} from "@/utils/constaints.ts";

function StudentGraduates() {
    const dispatch = useAppDispatch();
    const {
        windowWidth,
        columns,
        studentGraduates,
        dataFilter,
        dataStudentGraduate,
        paginationListStudentGraduates,
        isLoadingTableStudentGraduates,
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
                            placeholder={'Nhập tên sinh viên tốt nghiệp để tìm kiếm'}
                            value={dataFilter.search}
                            autoComplete="off"
                            onChange={(e) => handleSearch(e)}
                        />
                    </div>
                    <div className={"flex space-x-3"}>
                        {hasPermission([PERMISSIONS.ADD.GRADUATE_MANAGEMENT]) &&
                            <Button
                                type={"primary"}
                                size={"large"}
                                className={"text-white font-bold"}
                                icon={<InlineSVG src={Plus} width={14}/>}
                                onClick={() => {
                                    dispatch(setDataStudentGraduate(initDataStudentGraduate));
                                    dispatch(setVisibleModalCreOrUpdStudentGraduate(true))
                                }}
                            >Thêm mới</Button>
                        }
                    </div>
                </div>

                <div className={styles.tableWrap}>
                    <TableDefault
                        loading={isLoadingTableStudentGraduates}
                        dataSource={studentGraduates}
                        columns={columns}
                        onChange={handleChangeTable}
                        pagination={paginationListStudentGraduates}
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
                contentBtn={"Xóa sinh viên tốt nghiệp"}
                isModalOpen={visibleModalDelete}
                handleOk={() => dispatch(setVisibleModalDeleteStudentGraduate(false))}
                handleCancel={() => dispatch(setVisibleModalDeleteStudentGraduate(false))}
                handleConfirm={() => handleConfirmDelete()}
                loading={isLoadingBtnDelete}
            />
            <ModalDefault
                size={800}
                isModalOpen={visibleModalCreOrUpd}
                title={dataStudentGraduate.id ? "Cập nhật sinh viên tốt nghiệp" : "Thêm mới sinh viên tốt nghiệp"}
                handleCancel={() => {
                    dispatch(setDataStudentGraduate(initDataStudentGraduate))
                    dispatch(setVisibleModalCreOrUpdStudentGraduate(false))
                }}
            >
                <CreateOrUpdateStudentGraduate/>
            </ModalDefault>
        </MainLayout>
    )
}

export default StudentGraduates