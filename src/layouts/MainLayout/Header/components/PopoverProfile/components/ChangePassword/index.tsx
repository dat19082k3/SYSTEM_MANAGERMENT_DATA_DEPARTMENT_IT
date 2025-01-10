import {Button, Input} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "../../../../../../../assets/images/icons/light/warning.svg";
import Handle from "./handle.ts";

export default function ChangePassword(props: any) {
    const {
        dataChangePassword, errorChangePassword, isLoadingBtnChangePassword,
        handleChangeInput, handleConfirmChangePassword
    } = Handle(props);

    return (
        <div>
            <div className={`input-wrap mt-5`}>
                <div className={'label-wrap'}>
                    Mật khẩu mới <span className={'required'}>*</span>
                </div>
                <Input.Password
                    rootClassName={`main-input`}
                    placeholder={'Nhập mật khẩu'}
                    value={dataChangePassword.password}
                    onChange={(e) => handleChangeInput(e, 'password')}
                />
                {
                    errorChangePassword?.password && errorChangePassword.password.length > 0 ?
                        <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="14"/>
            </div>
                            {errorChangePassword.password}
          </span> : ''
                }
            </div>

            <div className={`input-wrap mt-5`}>
                <div className={'label-wrap'}>
                    Xác nhận mật khẩu mới <span className={'required'}>*</span>
                </div>
                <Input.Password
                    rootClassName={`main-input`}
                    placeholder={'Xác nhận mật khẩu'}
                    value={dataChangePassword.confirm_password}
                    onChange={(e) => handleChangeInput(e, 'confirm_password')}
                />
                {
                    errorChangePassword?.confirm_password && errorChangePassword.confirm_password.length > 0 ?
                        <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="14"/>
            </div>
                            {errorChangePassword.confirm_password}
          </span> : ''
                }
            </div>

            <div className={`flex justify-end`}>
                <Button
                    loading={isLoadingBtnChangePassword}
                    type="primary"
                    size={'large'}
                    className={`main-btn-primary !w-auto`}
                    block
                    onClick={() => handleConfirmChangePassword()}
                >Thay đổi mật khẩu
                </Button>
            </div>
        </div>
    )
}
