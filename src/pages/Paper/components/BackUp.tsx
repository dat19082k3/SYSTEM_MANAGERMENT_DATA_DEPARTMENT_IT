import Joi from "joi";
import {VALIDATE_PASSWORD_REGEX} from "@/utils/helper.tsx";
import {useAppDispatch} from "@/states/hooks.ts";
import Handle from "@/pages//Paper/handle.tsx";
import {Button, Input, Select} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "@/assets/images/icons/light/warning.svg";
import {
    changeObjToOptions, PAPER_TYPE_OPTIONS
} from "@/utils/constaints.ts";
import {setVisibleModalBuPaper} from "@/states/modules/paper";

const exportBuSchema = Joi.object({
    username: Joi.string().required().trim().label("tài khoản"),
    password: Joi.string().required().trim().regex(VALIDATE_PASSWORD_REGEX).label("mật khẩu"),
    type: Joi.number().empty(null).required().label("loại bài báo")
})

function BackUp() {
    const dispatch = useAppDispatch();
    const {
        dataBackUp,
        errorBackUp,
        handleChangeInputBu,
        isLoadingBtnBu,
        handleConfirmBackup
    } = Handle();

    return (
        <div className={"flex-row space-y-4"}>
            <div>
                <label className="text-sm font-semibold">Tên tài khoản
                    <span className={'required'}>*</span>
                </label>
                <Input
                    className={`main-input !pt-[9px] !pb-[9px] ${errorBackUp && errorBackUp.username && errorBackUp.username.length > 0 ? 'error-input' : ''}`}
                    placeholder={'Nhập tên tài khoản'}
                    value={dataBackUp.username}
                    onChange={(e) => handleChangeInputBu(e.target.value, 'username')}
                />
                {errorBackUp && errorBackUp.username && (
                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                        {errorBackUp.username}
                                </span>
                )}
            </div>
            <div>
                <label className="text-sm font-semibold">Mật khẩu
                    <span className={'required'}>*</span>
                </label>
                <Input.Password
                    className={`main-input !pt-[9px] !pb-[9px] ${errorBackUp && errorBackUp.password && errorBackUp.password.length > 0 ? 'error-input' : ''}`}
                    placeholder={'Nhập mật khẩu'}
                    value={dataBackUp.password}
                    onChange={(e) => handleChangeInputBu(e.target.value, 'password')}
                />
                {errorBackUp && errorBackUp.password && (
                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                        {errorBackUp.password}
                                </span>
                )}
            </div>
            <div>
                <label className="text-sm font-semibold">Loại bài báo
                    <span className={'required'}>*</span>
                </label>
                <Select
                    size={"large"}
                    className={"w-full"}
                    value={dataBackUp.type}
                    options={changeObjToOptions(PAPER_TYPE_OPTIONS)}
                    onChange={(v) => {
                        handleChangeInputBu(v, 'type')
                    }}
                    placeholder={"Chọn loại bài báo"}
                />
                {errorBackUp && errorBackUp.type && (
                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                        {errorBackUp.type}
                                </span>
                )}
            </div>
            <div className={"flex justify-end pt-3 space-x-3"}>
                <Button
                    size={"large"}
                    onClick={() => {
                        dispatch(setVisibleModalBuPaper(false))
                    }}
                >
                    Hủy
                </Button>
                <Button
                    type={"primary"}
                    size={"large"}
                    loading={isLoadingBtnBu}
                    onClick={() => handleConfirmBackup(exportBuSchema, dataBackUp)}
                >Chấp nhận</Button>
            </div>
        </div>

    )
}

export default BackUp