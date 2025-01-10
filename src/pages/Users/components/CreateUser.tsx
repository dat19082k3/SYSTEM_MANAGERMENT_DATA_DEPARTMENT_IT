import {Button, Input, TreeSelect} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "@/assets/images/icons/light/warning.svg";
import Handle from "@/pages/Users/handle.tsx";
import Joi from "joi";
import {VALIDATE_EMAIL_REGEX, VALIDATE_PASSWORD_REGEX, VALIDATE_PHONE_REGEX_RULE} from "@/utils/helper.tsx";
import {useAppDispatch} from "@/states/hooks.ts";
import {
    initDataUser,
    initErrorUser,
    setDataUser,
    setErrorDataUser,
    setVisibleModalCreOrUpdUser
} from "@/states/modules/user";
import TreeData from "@/pages/PermissionManagement/CreateOrUpdatePermission/handle.ts"
import NoData from "@/pages/PermissionManagement/NoData";

const createUserSchema = Joi.object({
    name: Joi.string().required().max(50).trim().label("họ tên"),
    email: Joi.string().required().max(255).trim().regex(VALIDATE_EMAIL_REGEX).label("email"),
    phone: Joi.string().empty("").length(10).trim().regex(VALIDATE_PHONE_REGEX_RULE).label("số điện thoại"),
    role_ids: Joi.array().label("vai trò"),
    password: Joi.string().required().min(6).max(255).trim().regex(VALIDATE_PASSWORD_REGEX).label("mật khẩu"),
})


const updateUserSchema = Joi.object({
    id: Joi.any(),
    name: Joi.string().required().max(50).trim().label("họ tên"),
    email: Joi.string().required().max(255).trim().regex(VALIDATE_EMAIL_REGEX).label("Email"),
    role_ids: Joi.array().label("Vai trò"),
    phone: Joi.string().empty(null).length(10).trim().regex(VALIDATE_PHONE_REGEX_RULE).label("Số điện thoại"),
})


function CreateUser() {
    const dispatch = useAppDispatch();
    const {
        handleChangeInputInfo,
        handleConfirm,
        dataUser,
        errorUser,
        isLoadingBtnCreOrUpd
    } = Handle()

    return (
        <div className={"flex-row space-y-4"}>
            <div className={"space-y-4"}>
                <div>
                    <label className="text-sm font-semibold">
                        Họ Tên
                        <span className={'required'}>*</span>
                    </label>
                    <Input
                        className={`main-input`}
                        value={dataUser.name}
                        onChange={(e) => handleChangeInputInfo(e.target.value, 'name')}
                        size={"large"}
                        count={{
                            show: true,
                            max: 255,
                        }}
                        placeholder={"Nhập họ tên"}
                    />
                    {errorUser && errorUser.name && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorUser.name}
                                </span>
                    )}
                </div>
                <div>
                    <label className="text-sm font-semibold">
                        Email
                        <span className={'required'}>*</span>
                    </label>
                    <Input
                        className={`main-input`}
                        value={dataUser.email}
                        onChange={(e) => handleChangeInputInfo(e.target.value, 'email')}
                        size={"large"}
                        count={{
                            show: true,
                            max: 255,
                        }}
                        placeholder={"Nhập địa chỉ email"}
                    />
                    {errorUser && errorUser.email && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorUser.email}
                                </span>
                    )}
                </div>
                <div>
                    <label className="text-sm font-semibold">
                        Số điện thoại
                    </label>
                    <Input
                        className={`main-input`}
                        value={dataUser.phone}
                        onChange={(e) => handleChangeInputInfo(e.target.value, 'phone')}
                        size={"large"}
                        count={{
                            show: true,
                            max: 10,
                        }}
                        placeholder={"Nhập số điện thoại"}
                    />
                    {errorUser && errorUser.phone && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorUser.phone}
                                </span>
                    )}
                </div>
                <div>
                    <label className="text-sm font-semibold">
                        Vai trò
                    </label>
                    <TreeSelect
                        allowClear
                        showSearch={false}
                        treeData={TreeData().treeDataOption}
                        className="w-full h-[36px]"
                        notFoundContent={
                            <div className='mt-4 mb-4'>
                                <NoData description={'Không có dữ liệu !'} />
                            </div>
                        }
                        multiple={true}
                        placeholder="Chọn nhóm vai trò cha"
                        value={dataUser.role_ids || null}
                        onChange={(value) => handleChangeInputInfo(value, 'role_ids')}
                    />
                    {errorUser && errorUser.role_ids && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorUser.role_ids}
                                </span>
                    )}
                </div>
                {
                    dataUser && !dataUser.id &&
                    <>
                        <div>
                            <label className="text-sm font-semibold">Mật khẩu
                                <span className={'required'}>*</span>
                            </label>
                            <Input.Password
                                className={`main-input !pt-[9px] !pb-[9px] ${errorUser && errorUser.password && errorUser.password.length > 0 ? 'error-input' : ''}`}
                                placeholder={'Mật khẩu'}
                                value={dataUser.password}
                                onChange={(e) => handleChangeInputInfo(e.target.value, 'password')}
                            />
                            {errorUser && errorUser.password && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorUser.password}
                                </span>
                            )}
                        </div>
                    </>
                }
            </div>
            <div className={"flex justify-end pt-3 space-x-3"}>
                <Button
                    size={"large"}
                    onClick={() => {
                        dispatch(setVisibleModalCreOrUpdUser(false))
                        dispatch(setDataUser(initDataUser))
                        dispatch(setErrorDataUser(initErrorUser))
                    }}
                >
                    Hủy
                </Button>
                <Button
                    type={"primary"}
                    size={"large"}
                    loading={isLoadingBtnCreOrUpd}
                    onClick={() => handleConfirm(dataUser?.id ? updateUserSchema : createUserSchema, dataUser)}
                >{dataUser.id ? "Cập nhật" : "Thêm mới"}</Button>
            </div>
        </div>

    )
}

export default CreateUser