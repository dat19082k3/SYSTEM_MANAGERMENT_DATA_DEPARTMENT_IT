import './styles.scss';
import AuthLayout from '@/layouts/AuthLayout';
import {Button, Flex, Input} from "antd";
import styles from './styles.module.scss';
import IconWarning from "@/assets/images/icons/light/warning.svg";
import InlineSVG from "react-inlinesvg";
import Handle from "./handle.ts";
import {PAGE_LOGIN} from '@/utils/constaints.ts';

function Login() {
    const {
        navigate,
        datFormLogin,
        errorLogin,
        isLoadingBtnLogin,
        handleChangeInput,
        handleConfirmLogin
    } = Handle();

    return (
        <AuthLayout title={PAGE_LOGIN.LOGIN} description={'Hệ thống quản lý tài liệu khoa công nghệ thông tin'}>
            <div className={'input-wrap'}>
                <Input
                    className={`main-input ${errorLogin && errorLogin.email.length > 0 ? 'error-input' : ''}`}
                    placeholder={'Email'}
                    value={datFormLogin.email}
                    onChange={(e) => handleChangeInput(e, 'email')}
                />
                {
                    errorLogin && errorLogin.email.length > 0 &&
                    <span className={`error !text-[13px]`}>
              <div className={`icon`}>
                <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
              </div>
                        {errorLogin.email}
            </span>
                }
            </div>

            <div className={'input-wrap mt-5'}>
                <Input.Password
                    className={`main-input !pt-[9px] !pb-[9px] ${errorLogin && errorLogin.password.length > 0 ? 'error-input' : ''}`}
                    placeholder={'Mật khẩu'}
                    value={datFormLogin.password}
                    onChange={(e) => handleChangeInput(e, 'password')}
                />
                {
                    errorLogin && errorLogin.password.length > 0 &&
                    <span className={'error !text-[13px]'}>
              <div className={'icon'}>
                <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
              </div>
                        {errorLogin.password}
            </span>
                }
            </div>

            <div className={styles.forgot}>
        <span onClick={() => navigate('/forgot-password')}>
          Quên mật khẩu?
        </span>
            </div>

            <Flex vertical gap="small">
                <Button
                    loading={isLoadingBtnLogin}
                    type="primary"
                    onClick={() => handleConfirmLogin()}
                    size={'large'}
                    className={`main-btn-primary`}
                    block
                >
                    Đăng nhập
                </Button>
            </Flex>

        </AuthLayout>
    );
}

export default Login;
