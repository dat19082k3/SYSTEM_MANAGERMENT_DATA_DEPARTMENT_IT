import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {getAuthToken, removeAuthToken} from "@/utils/localStorage.ts";
import {requestGetMeFail} from "@/states/modules/auth";
import {getMe, logout} from "@/api/auth";
import {
    setDataChangePassword,
    setErrorChangePassword,
    setErrorInformation
} from "@/states/modules/profile";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";

export default function Handle() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isShowInformation, setIsShowInformation] = useState(false);
    const authUser = useAppSelector(state => state.auth.authUser);
    const errorInformation = useAppSelector(state => state.profile.errorInformation);
    const errorChangePassword = useAppSelector(state => state.profile.errorChangePassword);

    const handleConfirmLogout = () => {
        dispatch(logout(getAuthToken()))
        dispatch(requestGetMeFail())
        removeAuthToken();
        navigate('/login')
    }

    const handleResetError = () => {
        if (errorInformation.name.length !== 0 || errorInformation.name) {
            dispatch(setErrorInformation({
                ...errorInformation,
                name: '',
            }))
        }

        if (errorInformation.email.length !== 0 || errorInformation.email) {
            dispatch(setErrorInformation({
                ...errorInformation,
                email: '',
            }))
        }

        if (errorInformation.phone.length !== 0 || errorInformation.phone) {
            dispatch(setErrorInformation({
                ...errorInformation,
                phone: '',
            }))
        }

        if (
            errorChangePassword.password.length !== 0 ||
            errorChangePassword.confirm_password.length !== 0
        ) {
            dispatch(setErrorChangePassword({
                password: '',
                confirm_password: '',
            }))
            dispatch(setErrorInformation({
                name: '',
                email: ''
            }))
        }
    }

    const handleShowProfile = () => {
        handleResetError();
        dispatch(setDataChangePassword({
            password: '',
            confirm_password: '',
        }));
        dispatch(getMe());
        setIsShowInformation(true)
    }

    return {
        isShowInformation, setIsShowInformation, authUser,
        handleConfirmLogout, handleShowProfile, handleResetError
    }
}
