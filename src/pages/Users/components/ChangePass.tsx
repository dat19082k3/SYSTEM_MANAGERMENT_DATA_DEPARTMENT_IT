import Joi from "joi";
import {VALIDATE_PASSWORD_REGEX} from "@/utils/helper.tsx";
import {useAppDispatch} from "@/states/hooks.ts";
import Handle from "@/pages/Users/handle.tsx";
import {Button, Input} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "@/assets/images/icons/light/warning.svg";
import {setDataChangePassUser, setErrorDataChangePassUser, setVisibleModalChangePass} from "@/states/modules/user";

const changePassUserSchema = Joi.object({
    id: Joi.number().required(),
    new_password: Joi.string().required().min(6).max(255).trim().regex(VALIDATE_PASSWORD_REGEX).label("mật khẩu"),
    confirm_password: Joi.string().required().min(6).max(255).trim().regex(VALIDATE_PASSWORD_REGEX)
        .label("nhập lại mật khẩu")
})

function ChangePass() {
    const dispatch = useAppDispatch();
    const {
        handleChangeInputPass,
        handleChangePass,
        dataChangePass,
        errorChangePassUser,
        isLoadingBtnChangePassword
    } = Handle()

    return (
        <div className={"flex-row space-y-4"}>
            <div>
                <label className="text-sm font-semibold">Mật khẩu mới
                    <span className={'required'}>*</span>
                </label>
                <Input.Password
                    className={`main-input !pt-[9px] !pb-[9px] ${errorChangePassUser && errorChangePassUser.new_password && errorChangePassUser.new_password.length > 0 ? 'error-input' : ''}`}
                    placeholder={'Mật khẩu mới'}
                    value={dataChangePass.new_password}
                    onChange={(e) => handleChangeInputPass(e.target.value, 'new_password')}
                />
                {errorChangePassUser && errorChangePassUser.new_password && (
                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                        {errorChangePassUser.new_password}
                                </span>
                )}
            </div>
            <div>
                <label className="text-sm font-semibold">Nhập lại mật khẩu
                    <span className={'required'}>*</span>
                </label>
                <Input.Password
                    className={`main-input !pt-[9px] !pb-[9px] ${errorChangePassUser && errorChangePassUser.confirm_password && errorChangePassUser.confirm_password.length > 0 ? 'error-input' : ''}`}
                    placeholder={'Nhập lại mật khẩu'}
                    value={dataChangePass.confirm_password}
                    onChange={(e) => handleChangeInputPass(e.target.value, 'confirm_password')}
                />
                {errorChangePassUser && errorChangePassUser.confirm_password && (
                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                        {errorChangePassUser.confirm_password}
                                </span>
                )}
            </div>
            <div className={"flex justify-end pt-3 space-x-3"}>
                <Button
                    size={"large"}
                    onClick={() => {
                        dispatch(setVisibleModalChangePass(false))
                        dispatch(setErrorDataChangePassUser({
                            new_password: "",
                            confirm_password: "",
                        }))
                        dispatch(setDataChangePassUser({
                            new_password: "",
                            confirm_password: "",
                        }))
                    }}
                >
                    Hủy
                </Button>
                <Button
                    type={"primary"}
                    size={"large"}
                    loading={isLoadingBtnChangePassword}
                    onClick={() => {
                        handleChangePass(changePassUserSchema, dataChangePass)
                    }}
                >Thay đổi</Button>
            </div>
        </div>

    )
}

export default ChangePass