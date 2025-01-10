import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import _ from "lodash";
import {setErrorResetPassword} from "@/states/modules/auth";
import {handleCheckValidateConfirm} from "@/utils/helper.tsx";
import {resetPassword} from "@/api/profile";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";

export default function Handle() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [dataResetPassword, setDataResetPassword] = useState<any>({
        token: '',
        password: '',
        confirmPassword: ''
    });
    const errorResetPassword = useAppSelector(state => state.auth.errorRsPassword);
    const isLoadingBtnResetPassword = useAppSelector(state => state.auth.isLoadingBtnResetPassword);
    const location = useAppSelector(state => state.app.location);

    useEffect(() => {
        dispatch(setErrorResetPassword({
            password: '',
            confirmPassword: ''
        }))
    }, [dispatch])

    const handleChangeInput = (e: any, type: string) => {
        let value = e.target.value;
        let data = _.cloneDeep(dataResetPassword);
        data[type] = value
        setDataResetPassword(data)
    }

    const handleKeyDown = (event: any) => {
        if (errorResetPassword.password.length !== 0 || errorResetPassword.confirmPassword.length !== 0) {
            dispatch(setErrorResetPassword({
                password: '',
                confirmPassword: ''
            }))
        }

        if (event.key === 'Enter') {
            handleConfirmResetPassword()
        }
    }

    const handleConfirmResetPassword = () => {
        let validate = handleCheckValidateConfirm(dataResetPassword, errorResetPassword);
        dispatch(setErrorResetPassword(validate.dataError))
        if (!validate.isError) {
            dispatch(resetPassword({...dataResetPassword, token: location.query.token}));
        }
    }

    return {
        navigate, dataResetPassword, errorResetPassword, isLoadingBtnResetPassword,
        handleChangeInput, handleKeyDown, handleConfirmResetPassword
    }
}
