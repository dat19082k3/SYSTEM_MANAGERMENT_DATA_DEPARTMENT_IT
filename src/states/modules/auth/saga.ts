import {
    all, fork, takeLatest, put
} from "redux-saga/effects";
import {
    setErrorForgotPassword, setErrorLogin, setErrorResetPassword,
    requestForgotPasswordFail, requestForgotPasswordSuccess, requestGetMeFail,
    requestLoginFail, requestLoginSuccess,
    requestResetPasswordFail, requestResetPasswordSuccess
} from "./index.js";
import {setAuthToken} from "@/utils/localStorage.ts";
import {getNotification} from "@/utils/helper.tsx";
import _ from "lodash";
import {goToPage} from "../app/index.js";

function* loadRouteData() {
    //
}

function* handleActions() {
    yield takeLatest(requestLoginSuccess, function* (action: any) {
        let token = action.payload.data.access_token;
        setAuthToken(token);
        yield put(goToPage({
            path: "/login"
        }))
    });

    yield takeLatest(requestLoginFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            yield put(setErrorLogin(action.payload.data.message));
        } else if (statusError === 401) {
            getNotification('error', action.payload.data?.message ? action.payload.data.message : 'Email hoặc mật khẩu không đúng.');
        } else {
            getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(requestGetMeFail, function* (action: any) {
        let status = action.payload.data.email
        if (status === 401) {
            getNotification('error', action.payload.data.message)
        }
    });

    yield takeLatest(requestForgotPasswordSuccess, function* () {
        getNotification('success', 'Vui lòng kiểm tra email.');
    });

    yield takeLatest(requestForgotPasswordFail, function* (action: any) {
        let statusError = action.payload.status
        if (statusError === 400) {
            if (action.payload.data.errors){
                let errors = action.payload.data.errors
                yield put(setErrorForgotPassword({
                    email: _.get(errors, 'email', ''),
                }));
            }else {
                const message = action.payload.data.message;
                getNotification('error', (message ? message : 'Thông tin mật khẩu không hợp lệ.'));
            }

        } else if (statusError === 401) {
            getNotification('error', 'Thông tin email không chính xác.');
        } else {
            getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(requestResetPasswordSuccess, function* () {
        getNotification('success', 'Đặt lại mật khẩu thành công.');
        yield put(goToPage({
            path: "/sciences"
        }))
    });

    yield takeLatest(requestResetPasswordFail, function* (action: any) {
        let statusError = action.payload.status
        if (statusError === 400) {
            if (action.payload.data.errors){
                let errors = action.payload.data.errors
                yield put(setErrorResetPassword({
                    password: _.get(errors, 'password[0]', ''),
                    confirmPassword: _.get(errors, 'password_confirmation[0]', ''),
                }));
            }else {
                const message = action.payload.data.message;
                getNotification('error', (message ? message : 'Thông tin mật khẩu không hợp lệ.'));
            }
        } else if (statusError === 401) {
            const message = action.payload.data.message;
            getNotification('error', (message ? message : 'Thông tin mật khẩu không hợp lệ.'));
        } else {
            getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });
}

export default function* loadAuthSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
