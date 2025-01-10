import {createSlice} from "@reduxjs/toolkit";

export type ErrorInformationType = {
    name: string,
    email: string,
    phone: string
}

export type ChangePasswordType = {
    password: string,
    confirm_password: string,
}

export type ErrorChangePassword = {
    password: string,
    confirm_password: string,
}

export type ProfileType = {
    errorInformation: ErrorInformationType,
    isLoadingBtnInformation: boolean,
    dataChangePassword: ChangePasswordType,
    errorChangePassword: ErrorChangePassword,
    isLoadingBtnChangePassword: boolean,
}

export const initialState: ProfileType = {
    errorInformation: {
        name: '',
        email: '',
        phone: ''
    },
    isLoadingBtnInformation: false,
    dataChangePassword: {
        password: '',
        confirm_password: '',
    },
    errorChangePassword: {
        password: '',
        confirm_password: '',
    },
    isLoadingBtnChangePassword: false,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setErrorInformation: (state, action) => ({
            ...state,
            errorInformation: action.payload
        }),
        startRequestUpdateInformation: state => ({
            ...state,
            isLoadingBtnInformation: true
        }),
        startRequestUpdateInformationSuccess: state => ({
            ...state,
            isLoadingBtnInformation: false
        }),
        startRequestUpdateInformationFail: state => ({
            ...state,
            isLoadingBtnInformation: false
        }),
        setErrorChangePassword: (state, action) => ({
            ...state,
            errorChangePassword: action.payload
        }),
        setDataChangePassword: (state, action) => ({
            ...state,
            dataChangePassword: action.payload
        }),
        startRequestChangePassword: state => ({
            ...state,
            isLoadingBtnChangePassword: true
        }),
        requestChangePasswordSuccess: state => ({
            ...state,
            isLoadingBtnChangePassword: false
        }),
        requestChangePasswordFail: state => ({
            ...state,
            isLoadingBtnChangePassword: false
        }),
    }
})

export const {
    setErrorInformation, setErrorChangePassword, setDataChangePassword,
    startRequestUpdateInformation, startRequestUpdateInformationSuccess, startRequestUpdateInformationFail,
    startRequestChangePassword, requestChangePasswordSuccess, requestChangePasswordFail
} = profileSlice.actions

export default profileSlice.reducer;
