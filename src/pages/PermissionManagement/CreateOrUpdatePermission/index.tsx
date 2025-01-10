import NoData from '../NoData/index.js';
import Handle from "./handle.ts";
import HandleParent from "../handle.js";
import InlineSVG from "react-inlinesvg";
import styles from "../styles.module.scss";
import { TYPE_SUBMIT } from '@/utils/constaints.ts';
import { Button, Input, TreeSelect } from "antd";
import IconWarning from "@/assets/images/icons/light/warning.svg";
import { createPermissionSchema, updatePermissionSchema } from './schema.ts';

const { TextArea } = Input;

export default function CreateOrUpdatePermission() {
  const {
    infoRole,
    configModal,
    treeDataOption,
    updatedTreeData,
    errorCreateOrUpdateRole,
    isLoadingBtnCreateOrUpdatePermission,
    handleSubmitForm,
    handleChangeInput,
  } = Handle();

  const {
    handleToggleVisibleModalCreateOrUpdate
  } = HandleParent();

  return (
    <div className={`container`}>
      <div className={`form`}>
        <div className={`input-wrap`}>
          <div className={'label-wrap'}>Vai trò cha</div>
          <TreeSelect
            allowClear
            showSearch={false}
            treeDefaultExpandAll
            treeData={configModal.type === TYPE_SUBMIT.CREATE ? treeDataOption : updatedTreeData}
            className="main-select w-full"
            notFoundContent={
              <div className='mt-4 mb-4'>
                <NoData description={'Không có dữ liệu !'} />
              </div>
            }
            placeholder="Chọn nhóm vai trò cha"
            disabled={configModal.type === TYPE_SUBMIT.UPDATE && !!infoRole.parent_id}
            value={infoRole.parent_id || null}
            onChange={(value) => handleChangeInput(value, 'parent_id')}
          />
        </div>
        <div className={`input-wrap`}>
          <div className={'label-wrap'}>
            Tên vai trò <span className={'required'}>*</span>
          </div>
          <Input
            className={`main-input`}
            placeholder={'Nhập tên vai trò'}
            value={infoRole.name}
            onChange={(e) => handleChangeInput(e.target.value, 'name')}
          />
          {
            errorCreateOrUpdateRole && errorCreateOrUpdateRole.name ?
              <span className={'error'}>
                <div className={'icon'}>
                  <InlineSVG src={IconWarning} width={14} height="auto" />
                </div>
                {errorCreateOrUpdateRole.name}
              </span> : ''
          }
        </div>
        <div className={`input-wrap`}>
          <div className={'label-wrap'}>
            Mô tả
          </div>
          <TextArea
            rows={3}
            className={`main-input`}
            placeholder={'Nhập mô tả'}
            value={infoRole.description}
            onChange={(e) => handleChangeInput(e.target.value, 'description')}
          />
          {
            errorCreateOrUpdateRole && errorCreateOrUpdateRole.description ?
              <span className={'error'}>
                <div className={'icon'}>
                  <InlineSVG src={IconWarning} width={14} height="auto" />
                </div>
                {errorCreateOrUpdateRole.description}
              </span> : ''
          }
        </div>

      </div>
      <div className={styles.btnWrap}>
        <div>
          <Button
            className={`main-btn-close`}
            size={'large'}
            onClick={() => handleToggleVisibleModalCreateOrUpdate()}
          >
            Đóng
          </Button>
          {
            configModal.type === TYPE_SUBMIT.CREATE ?
              <Button
                loading={isLoadingBtnCreateOrUpdatePermission}
                className={`main-btn-primary`} type={"primary"} size={'large'}
                onClick={() => handleSubmitForm(TYPE_SUBMIT.CREATE, createPermissionSchema, infoRole)}
              >
                Tạo mới
              </Button> :
              <Button
                loading={isLoadingBtnCreateOrUpdatePermission}
                className={`main-btn-primary`} type={"primary"} size={'large'}
                onClick={() => handleSubmitForm(TYPE_SUBMIT.UPDATE, updatePermissionSchema, infoRole)}
              >
                Cập nhật
              </Button>
          }
        </div>
      </div>
    </div>
  )
}