import "./styles.scss";
import NoData from './NoData';
import Handle from "./handle.tsx";
import TreeList from './TreeList';
import {Button, Tooltip} from 'antd';
import styles from "./styles.module.scss";
import ModalDefault from "@/components/Modal";
import MainLayout from '@/layouts/MainLayout';
import TablePermission from './TablePermission';
import AddEmployeeOfRole from './AddEmployeeOfRole';
import ModalDeleteDefault from "@/components/ModalDelete";
import {PERMISSIONS, PROTECTED, TYPE_SUBMIT} from "@/utils/constaints.ts";
import {PlusOutlined, SettingFilled} from "@ant-design/icons";
import CreateOrUpdatePermission from "./CreateOrUpdatePermission";
import {
    setVisibleModalAddEmployeeOfRole,
    setVisibleModalCreateOrUpdateRole,
    setVisibleModalDeleteRole
} from "@/states/modules/permissions";
import {hasPermission} from "@/utils/helper";

export default function PermissionsManagement() {
    const {
        dataRole,
        rolesList,
        configModal,
        infoRoleSelected,
        employeeOfRoleList,
        contentModalDelete,
        isLoadingBtnDeleteRole,
        visibleModalDeleteRole,
        visibleModalCreateOrUpdateRole,
        visibleModalAddEmployeeOfRole,
        dispatch,
        openModalCreate,
        handleConfirmDelete,
        openModalAddEmployeeRole,
        handleToggleVisibleModalCreateOrUpdate,
    } = Handle();

    return (
        <MainLayout>
            <div className={styles.pageWrap}>
                <div className={styles.permissionWrap}>
                    <div className={styles.permissionTitle}>
                        <div className={styles.rolesName}>
                            <p>Vai trò</p>
                            {
                                hasPermission([PERMISSIONS.ADD.ROLE_MANAGEMENT]) &&
                                <Tooltip title="Tạo mới vai trò" placement="top">
                                    <div className={styles.modalPermission}
                                         onClick={() => openModalCreate(TYPE_SUBMIT.CREATE)}>
                                        <PlusOutlined className={styles.iconAdd}/>
                                        <div className={styles.contentadd}>Tạo mới</div>
                                    </div>
                                </Tooltip>
                            }
                        </div>
                    </div>
                                    {
                                        rolesList?.length > 0 ?
                                            <div className={styles.permissionContent}>
                                                <TreeList data={dataRole}/>
                                            </div>
                                            :
                                            <div className={styles.permissionNoContent}>
                                                <NoData description={'Không có dữ liệu !'}/>
                                            </div>
                                    }
                </div>
                <div className={styles.permissionMain}>
                    {infoRoleSelected?.id && hasPermission([PERMISSIONS.LIST.PERMISSION_MANAGEMENT]) ? (
                        <div className={styles.mainWrap}>
                            <div className={styles.mainTitle}>
                                <p>Quyền hạn</p>
                            </div>

                            <div className={styles.mainContent}>
                                <div className={`${styles.headerPermission} mt-4`}>
                                        <span
                                            className={`
                                                ${infoRoleSelected.protected === PROTECTED.PROTECTED ? 'mt-2 mb-2' : ''}
                                                ${!hasPermission([PERMISSIONS.EDIT.PERMISSION_MANAGEMENT]) ? 'mt-2 mb-2' : ''}
                                            `}
                                        >
                                            <span className={styles.roleName}>Vai trò</span>
                                            <span className={`${styles.strong}`}> {infoRoleSelected.name}</span>
                                            {
                                                infoRoleSelected.protected === PROTECTED.PROTECTED ? '' :
                                                    <>
                                                        {
                                                            employeeOfRoleList.length > 0 ?
                                                                <>
                                                                    {
                                                                        hasPermission([PERMISSIONS.EDIT.USER_WITH_ROLE]) &&
                                                                        <>
                                                                            <span> gồm có </span>
                                                                            <Tooltip title="Xem nhân viên"
                                                                                     placement="top">
                                                                                <span
                                                                                    className='text-blue-55 cursor-pointer'
                                                                                    onClick={() => openModalAddEmployeeRole()}
                                                                                > {employeeOfRoleList.length} nhân viên.</span>
                                                                            </Tooltip>
                                                                        </>
                                                                    }
                                                                </>
                                                                : <>
                                                                    {
                                                                        hasPermission([PERMISSIONS.EDIT.USER_WITH_ROLE]) &&
                                                                        <span> chưa có nhân viên nào. </span>
                                                                    }
                                                                </>
                                                        }
                                                    </>
                                            }
                                        </span>
                                    {
                                        infoRoleSelected.protected === PROTECTED.PROTECTED ? '' :
                                            <>
                                                {
                                                    hasPermission([PERMISSIONS.EDIT.USER_WITH_ROLE]) &&
                                                    <Button
                                                        className={`main-btn-primary ml-3`}
                                                        type={"primary"}
                                                        size={'large'}
                                                        onClick={() => openModalAddEmployeeRole()}
                                                    >Thêm nhân viên</Button>
                                                }
                                            </>
                                    }
                                </div>
                                <div className={"w-full overflow-x-auto"}>
                                    <TablePermission/>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.container}>
                            <div className={styles.iconContainer}>
                                <SettingFilled className={styles.iconSetting}/>
                                {
                                    hasPermission([PERMISSIONS.LIST.PERMISSION_MANAGEMENT]) ?
                                        <p>Chọn vai trò để thiết lập quyền hạn</p> :
                                        <p>Bạn không có quyền thiết lập quyền hạn!</p>
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ModalDefault
                title={configModal.type === TYPE_SUBMIT.CREATE ? configModal.title : configModal.title}
                isModalOpen={visibleModalCreateOrUpdateRole}
                handleOk={() => handleToggleVisibleModalCreateOrUpdate()}
                handleCancel={() => dispatch(setVisibleModalCreateOrUpdateRole(false))}
            >
                <CreateOrUpdatePermission/>

            </ModalDefault>

            <ModalDeleteDefault
                contentBtn={"Xóa vai trò"}
                content={contentModalDelete}
                loading={isLoadingBtnDeleteRole}
                isModalOpen={visibleModalDeleteRole}
                handleConfirm={() => handleConfirmDelete()}
                handleOk={() => dispatch(setVisibleModalDeleteRole(false))}
                handleCancel={() => dispatch(setVisibleModalDeleteRole(false))}
            />

            <ModalDefault
                isModalOpen={visibleModalAddEmployeeOfRole}
                title={`Nhân viên với vai trò ${infoRoleSelected.name}`}
                onCancel={setVisibleModalAddEmployeeOfRole(false)}
                handleCancel={() => dispatch(setVisibleModalAddEmployeeOfRole(false))}
            >
                <AddEmployeeOfRole/>
            </ModalDefault>
        </MainLayout>
    )
}
