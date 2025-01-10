import _ from "lodash";
import {VALIDATE_PASSWORD_REGEX} from "@/utils/helper.tsx";
import {ChangePasswordType, setDataChangePassword, setErrorChangePassword} from "@/states/modules/profile";
import {changePassword} from "@/api/profile";
import Joi from "joi";
import {validate} from "@/utils/validates";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";

const changePasswordSchema = Joi.object({
    password: Joi.string().required().max(255).trim().label("Mật khẩu").regex(VALIDATE_PASSWORD_REGEX),
    confirm_password: Joi.string().required().max(255).trim().label("Nhập lại mật khẩu").regex(VALIDATE_PASSWORD_REGEX),
})

export default function Handle(props: any) {
    const {handleResetError} = props;
    const dataChangePassword = useAppSelector(state => state.profile.dataChangePassword);
    const {id} = useAppSelector(state => state.auth.authUser);
    const errorChangePassword = useAppSelector(state => state.profile.errorChangePassword);
    const isLoadingBtnChangePassword = useAppSelector(state => state.profile.isLoadingBtnChangePassword);
    const dispatch = useAppDispatch();

    const handleChangeInput = (e: any, type: keyof ChangePasswordType) => {
        handleResetError();
        let value = e.target.value;
        let data = _.cloneDeep(dataChangePassword);
        data[type] = value;
        dispatch(setDataChangePassword(data));
    }

    const handleConfirmChangePassword = () => {
        validate(changePasswordSchema, dataChangePassword, {
            onSuccess: (data: any) => {
                dispatch(changePassword(id, data))
            },
            onError: (err: any) => {
                dispatch(setErrorChangePassword({...errorChangePassword, ...err}))
            }
        })
    }

    return {
        dataChangePassword, errorChangePassword, isLoadingBtnChangePassword,
        handleChangeInput, handleConfirmChangePassword
    }
}
