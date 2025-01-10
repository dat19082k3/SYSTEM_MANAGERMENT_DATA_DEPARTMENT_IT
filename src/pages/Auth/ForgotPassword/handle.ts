import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import _ from "lodash";
import {setErrorForgotPassword} from "@/states/modules/auth";
import {handleCheckValidateConfirm} from "@/utils/helper.tsx";
import {forgotPassword} from "@/api/auth";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";

export default function Handle() {
    const navigate = useNavigate();
    const [dataForgotPassword, setDataForgotPassword] = useState({
        email: ''
    });
    const errorForgotPassword = useAppSelector(state => state.auth.errorForgotPassword);
    const isLoadingBtnForgotPassword = useAppSelector(state => state.auth.isLoadingBtnForgotPassword);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setErrorForgotPassword({email: ''}))
    }, [dispatch])

    const handleChangeInput = (e: any, type: keyof typeof dataForgotPassword) => {
        let value = e.target.value;
        let data = _.cloneDeep(dataForgotPassword);
        data[type] = value
        setDataForgotPassword(data)
    }

    const handleKeyDown = (event: any) => {
        if (errorForgotPassword.email.length !== 0) {
            dispatch(setErrorForgotPassword({email: ''}))
        }

        if (event.key === 'Enter') {
            handleConfirmForgotPassword()
        }
    }

    const handleConfirmForgotPassword = () => {
        let validate = handleCheckValidateConfirm(dataForgotPassword, errorForgotPassword);
        dispatch(setErrorForgotPassword(validate.dataError))
        if (!validate.isError) {
            dispatch(forgotPassword(dataForgotPassword))
        }
    }

    return {
        navigate, dataForgotPassword, errorForgotPassword, isLoadingBtnForgotPassword,
        handleChangeInput, handleKeyDown, handleConfirmForgotPassword
    }
}
