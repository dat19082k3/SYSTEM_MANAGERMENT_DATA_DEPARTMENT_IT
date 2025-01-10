import Handle from "./handle";
import NoData from '../NoData/index.js';
import Loading from '../Loading/index.js';
import HandleParent from "../handle.js";
import InlineSVG from 'react-inlinesvg';
import styles from "./styles.module.scss";
import ModalDeleteDefault from '@/components/ModalDelete';
import Delete from "@/assets/images/icons/duotone/trash-can.svg";
import IconWarning from "@/assets/images/icons/light/warning.svg";
import { Button, Select, Tooltip } from 'antd';
import { updateEmployeeOfRoleSchema } from './schema.js';
import { setVisibleModalDeleteEmployeeOfRole } from '@/states/modules/permissions';
import { PERMISSIONS } from '@/utils/constaints.ts';
import { hasPermission } from '@/utils/helper';

export default function AddEmployeeOfRole() {
  const {
    employeeIdsErr,
    employeeOption,
    infoEmployeeIds,
    queryEmployeeWithoutRole,
    isLoadingListEmployeeOfRole,
    isLoadingBtnAddEmployeeOfRole,
    contentModalDeleteEmployeeOfRole,
    visibleModalDeleteEmployeeOfRole,
    isLoadingBtnDeleteEmployeeOfRole,
    dispatch,
    filterOption,
    handleSearch,
    handleClear,
    handlePopupScroll,
    handleFocusEmployeeOfRole,
    handleSubmitEmployeeOfRole,
    openModalDeleteEmployeeOfRole,
    handleConfirmDeleteEmployeeOfRole,
    handleChangeSelectEmployeeOfRole,
  } = Handle();

  const {
    employeeOfRoleList
  } = HandleParent();

  return (
    <div className={`container`}>
      <div className={`form`}>
        <div className={`input-wrap`}>
          <div style={{ display: 'flex' }}>
            <Select
              allowClear
              mode="multiple"
              placeholder="Chọn nhân viên"
              popupClassName="dropdownEmploy"
              className={'main-select w-full !h-[36px]'}
              showSearch={true}
              options={employeeOption}
              value={infoEmployeeIds.employee_ids}
              searchValue={queryEmployeeWithoutRole.q}
              onClear={handleClear}
              onSearch={handleSearch}
              filterOption={filterOption}
              onPopupScroll={handlePopupScroll}
              onFocus={() => handleFocusEmployeeOfRole('employee_ids')}
              notFoundContent={
                <div className={styles.noDataEmployeeWithoutRole}>
                  <NoData description={'Không có dữ liệu !'} />
                </div>
              }
              onChange={(value) => handleChangeSelectEmployeeOfRole(value, 'employee_ids')}
            />
            <Button
              loading={isLoadingBtnAddEmployeeOfRole}
              className={`main-btn-primary ml-3`} type={"primary"} size={'large'}
              onClick={() => handleSubmitEmployeeOfRole(updateEmployeeOfRoleSchema, infoEmployeeIds)}
            >Thêm</Button>
          </div>
          {
            employeeIdsErr && employeeIdsErr.employee_ids ?
              <span className={'error'}>
                <div className={'icon'}>
                  <InlineSVG src={IconWarning} width={14} height="auto" />
                </div>
                {employeeIdsErr.employee_ids}
              </span> : ''
          }
        </div>
      </div>
      {
        isLoadingListEmployeeOfRole ?
          <div className={styles.employeesInWrapLoading}>
            <Loading />
          </div> :
          <div className={styles.employeesInWrap}>
            {employeeOfRoleList.length > 0 ? (
              employeeOfRoleList.map((item) => (
                <div className={styles.employees} key={item.id}>
                  <div className={styles.employeesContent}>
                    <div className={styles.employeesWrap}>
                      <div className={styles.employeesInfo}>

                        <div className={styles.employeesNameWrap}>
                          <div className={styles.employeesName}>{item.name}
                          </div>
                          <div>{item.email}</div>
                        </div>

                      </div>
                      <div
                        className={styles.employeesDelete}
                        onClick={() => openModalDeleteEmployeeOfRole(item)}
                      >
                        {
                          hasPermission([PERMISSIONS.DELETE.USER_WITH_ROLE]) &&
                          <Tooltip placement="top" title="Xoá nhân viên khỏi vai trò">
                            <div>
                              <InlineSVG
                                  src={Delete}
                                  width={14}
                                  className={`btn-delete ${styles.iconDelete}`}
                              />
                            </div>
                          </Tooltip>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.nodataWrap}>
                <div className={styles.nodata}>
                  <div className={styles.nodataContent}>
                    <NoData description={'Không có nhân viên nào !'} />
                  </div>
                </div>
              </div>
            )}
          </div>
      }
      <ModalDeleteDefault
        content={contentModalDeleteEmployeeOfRole}
        contentBtn={<span className='ml-2 mr-2'>Xóa</span>}
        isModalOpen={visibleModalDeleteEmployeeOfRole}
        handleOk={() => dispatch(setVisibleModalDeleteEmployeeOfRole(false))}
        handleCancel={() => dispatch(setVisibleModalDeleteEmployeeOfRole(false))}
        handleConfirm={() => handleConfirmDeleteEmployeeOfRole()}
        loading={isLoadingBtnDeleteEmployeeOfRole}
      />
    </div>
  )
}