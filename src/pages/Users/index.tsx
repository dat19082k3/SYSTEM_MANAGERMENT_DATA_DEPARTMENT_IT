import MainLayout from "@/layouts/MainLayout";
import styles from "@/pages/Sciences/styles.module.scss";
import {Button, Input} from "antd";
import IconSearch from "@/assets/images/icons/duotone/magnifying-glass.svg";
import TableDefault from "@/components/Table";
import Handle from "@/pages/Users/handle";
import './styles.scss'
import InlineSVG from "react-inlinesvg";
import Plus from "@/assets/images/icons/duotone/plus.svg";
import {useAppDispatch} from "@/states/hooks.ts";
import ModalDeleteDefault from "@/components/ModalDelete";
import ModalDefault from "@/components/Modal";
import CreateUser from "@/pages/Users/components/CreateUser.tsx";
import {
    initDataUser, initErrorUser,
    setDataChangePassUser,
    setDataUser, setErrorDataChangePassUser, setErrorDataUser,
    setVisibleModalChangePass,
    setVisibleModalCreOrUpdUser, setVisibleModalDeleteUser
} from "@/states/modules/user";
import ChangePass from "@/pages/Users/components/ChangePass.tsx";
import {hasPermission} from "@/utils/helper.tsx";
import {PERMISSIONS} from "@/utils/constaints.ts";

function User() {
    const dispatch = useAppDispatch();
    const {
        windowWidth,
        columns,
        users,
        dataFilter,
        dataUser,
        paginationListUsers,
        isLoadingTableUsers,
        visibleModalDelete,
        visibleModalCreOrUpd,
        visibleModalChangePass,
        isLoadingBtnDelete,
        contentModalDelete,
        handleSearch,
        handleChangeTable,
        handleSelectPagination,
        handleConfirmDelete,
        handleSelectLimitTable,
    } = Handle();

    return (
        <MainLayout>
            <div className={styles.listWrap}>
                <div className={styles.filterWrap}>
                    <div className={styles.search}>
                        <Input
                            prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt=""/>}
                            className={`main-input`}
                            placeholder={'Tìm kiếm theo tên, email hoặc số điện thoại'}
                            value={dataFilter.search}
                            autoComplete="off"
                            onChange={(e) => handleSearch(e)}
                        />
                    </div>
                    <div className={"flex space-x-3"}>
                        {hasPermission([PERMISSIONS.ADD.USER_MANAGEMENT]) &&
                            <Button
                                type={"primary"}
                                size={"large"}
                                className={" text-white font-bold"}
                                icon={<InlineSVG className={"fill-white"} src={Plus} width={14}/>}
                                onClick={() => {
                                    dispatch(setDataUser(initDataUser));
                                    dispatch(setVisibleModalCreOrUpdUser(true))
                                }}
                            >Thêm mới</Button>
                        }
                    </div>
                </div>

                <div className={styles.tableWrap}>
                    <TableDefault
                        loading={isLoadingTableUsers}
                        dataSource={users}
                        columns={columns}
                        onChange={handleChangeTable}
                        pagination={paginationListUsers}
                        isPagination={true}
                        handleSelectPagination={(e: any) => handleSelectPagination(e)}
                        isFixed
                        extraClassName={'h-[calc(100vh-255px)]'}
                        scroll={{
                            x: 1200,
                            y: windowWidth <= 576 ? 'calc(100vh - 410px)' : windowWidth <= 1536 ? 'calc(100vh - 285px)' : 'calc(100vh - 310px)'
                        }}
                        rowKey={'id'}
                        limitTable={dataFilter.perPage}
                        handleSelectLimitTable={(e: any) => handleSelectLimitTable(e)}
                    />
                </div>
            </div>
            <ModalDeleteDefault
                content={contentModalDelete}
                contentBtn={"Xóa người dùng"}
                isModalOpen={visibleModalDelete}
                handleOk={() => dispatch(setVisibleModalDeleteUser(false))}
                handleCancel={() => dispatch(setVisibleModalDeleteUser(false))}
                handleConfirm={() => handleConfirmDelete()}
                loading={isLoadingBtnDelete}
            />
            <ModalDefault
                isModalOpen={visibleModalCreOrUpd}
                title={dataUser && dataUser.id ? "Cập nhật tài khoản" : "Thêm mới tài khoản"}
                handleCancel={() => {
                    dispatch(setDataUser(initDataUser))
                    dispatch(setVisibleModalCreOrUpdUser(false))
                    dispatch(setErrorDataUser(initErrorUser))
                }}
            >
                <CreateUser/>
            </ModalDefault>
            <ModalDefault
                isModalOpen={visibleModalChangePass}
                title={"Thay đổi mật khẩu"}
                handleCancel={() => {
                    dispatch(setDataChangePassUser({
                        new_password: "",
                        confirm_password: "",
                    }))
                    dispatch(setErrorDataChangePassUser({
                        new_password: "",
                        confirm_password: "",
                    }))
                    dispatch(setVisibleModalChangePass(false))
                }}
            >
                <ChangePass/>
            </ModalDefault>
        </MainLayout>
    )
}

export default User