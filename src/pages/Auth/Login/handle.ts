import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import _ from "lodash";
import {setErrorLogin} from "@/states/modules/auth/index.js";
import {VALIDATE_EMAIL_REGEX} from "@/utils/helper.js";
import {login} from "@/api/auth/index.js";
import Joi from "joi";
import {validate} from "@/utils/validates/index.js";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";

const loginValidateSchema = Joi.object({
    email: Joi.string()
        .required()
        .max(255)
        .label("địa chỉ email")
        .trim()
        .regex(VALIDATE_EMAIL_REGEX),
    password: Joi.string()
        .min(6)
        .max(255)
        .required()
        .trim()
        .label("mật khẩu")
});

export default function Handle() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [datFormLogin, setDatFormLogin] = useState<{
        email: string,
        password: string
    }>({
        email: '',
        password: ''
    })
    const errorLogin = useAppSelector(state => state.auth.errorLogin);
    const isLoadingBtnLogin = useAppSelector(state => state.auth.isLoadingBtnLogin);

    useEffect(() => {
        dispatch(setErrorLogin({
            email: '',
            password: ''
        }))
    }, [dispatch])

    const handleChangeInput = (e: any, type: keyof typeof datFormLogin) => {
        let value = e.target.value;
        let data = _.cloneDeep(datFormLogin);
        let dataError = _.cloneDeep(errorLogin);
        data[type] = value;
        dataError[type] = "";
        setDatFormLogin(data);
        dispatch(setErrorLogin(dataError));
    }

    const handleConfirmLogin = () => {
        validate(loginValidateSchema, datFormLogin, {
            onSuccess: (data: any) => {
                dispatch(login(data));
            },
            onError: (err: any) => {
                dispatch(setErrorLogin({...errorLogin, ...err}));
            }
        })
    }

    return {
        navigate,
        datFormLogin,
        errorLogin,
        isLoadingBtnLogin,
        handleChangeInput,
        handleConfirmLogin
    }
}
