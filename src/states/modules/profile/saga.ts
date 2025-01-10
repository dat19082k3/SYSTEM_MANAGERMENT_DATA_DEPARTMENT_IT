import {
    all, fork, takeLatest, put
} from "redux-saga/effects";
import {
    requestChangePasswordFail,
    requestChangePasswordSuccess, setDataChangePassword,
    setErrorInformation, setErrorChangePassword,
    startRequestUpdateInformationFail, startRequestUpdateInformationSuccess
} from "./index.js";
import {getNotification} from "@/utils/helper.tsx";
import _ from "lodash";
import {getMe} from "@/api/auth";
import {goToPage} from "@/states/modules/app";

function* loadRouteData() {
    //
}

function* handleActions() {
    yield takeLatest(startRequestUpdateInformationSuccess, function* () {
        getNotification('success', 'Cập nhật thông tin thành công.');
        yield put(getMe());
    })

    yield takeLatest(startRequestUpdateInformationFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            let errors = action.payload.data.errors
            yield put(setErrorInformation({
                name: _.get(errors, 'name', ''),
                email: _.get(errors, 'email', ''),
                phone: _.get(errors, 'phone', ''),
            }));
        } else if (statusError === 401) {
            const message = action.payload.data.message;
            getNotification('error', (message ? message : 'Thông tin không hợp lệ.'));
        } else {
            getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(requestChangePasswordSuccess, function* () {
        getNotification('success', 'Thay đổi mật khẩu thành công.');
        yield put(setDataChangePassword({
            password: '',
            confirm_password: '',
        }));
        yield put(goToPage({
            path: "/login"
        }))
    })

    yield takeLatest(requestChangePasswordFail, function* (action: any) {
        let statusError = action.payload.statusCode
        if (statusError === 400) {
            let errors = action.payload.data.errors
            yield put(setErrorChangePassword({
                password: _.get(errors, 'password', ''),
                confirm_password: _.get(errors, 'confirm_password', ''),
            }));
        } else if (statusError === 401) {
            const message = action.payload.data.message;
            const errors = action.payload.data.errors;
            if (errors) {
                yield put(setErrorChangePassword({
                    password: _.get(errors, 'password', ''),
                    confirm_password: _.get(errors, 'confirm_password', ''),
                }));
            } else {
                getNotification('error', (message ? message : 'Thông tin không hợp lệ.'));
            }
        } else {
            getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });
}

export default function* loadProfileSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
