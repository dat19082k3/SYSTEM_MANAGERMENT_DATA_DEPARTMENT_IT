import {all, call, fork, put, takeLatest} from "redux-saga/effects";
import {setBreadcrumb, setTitlePage} from "../app";
import {getListUsers} from "@/api/user";
import {
    changePasswordUserFail,
    changePasswordUserSuccess,
    changeStatusUserSuccess, creOrUpdUserFail, creOrUpdUserSuccess,
    deleteUserFail,
    deleteUserSuccess, initDataUser, initErrorUser, setDataChangePassUser, setDataUser,
    setErrorDataChangePassUser,
    setErrorDataUser,
    setVisibleModalChangePass, setVisibleModalCreOrUpdUser,
    setVisibleModalDeleteUser,
} from ".";
import {getNotification} from "@/utils/helper";
import {handleGetAllRoles} from "@/api/permission";
import {initDataFilter} from "@/states/modules/faculties";
import {setDataFilter} from "@/states/modules/graduates";

function* loadRouteData() {
    yield put(setTitlePage("Quản lý người dùng"));
    yield put(setBreadcrumb([
        {
            path: '/papers',
            name: 'Quản lý người dùng'
        },
    ]))
    yield put(handleGetAllRoles());
    yield put(setDataFilter(initDataFilter))
    yield put(getListUsers(initDataFilter))
}

function* handleActions() {
    yield takeLatest(changeStatusUserSuccess, function* () {
        yield put(setDataFilter(initDataFilter))
        yield put(getListUsers(initDataFilter))
        getNotification("success", "Thay đổi trạng thái thành công.");
    });

    yield takeLatest(creOrUpdUserSuccess, function* (action: any) {
        yield put(setVisibleModalCreOrUpdUser(false));
        yield put(setDataFilter(initDataFilter))
        yield put(getListUsers(initDataFilter))
        getNotification("success", typeof action.payload.data === "string" ? action.payload.data : "Cập nhật thành công");
        yield put(setDataUser(initDataUser));
        yield put(setErrorDataUser(initErrorUser));
    });

    yield takeLatest(creOrUpdUserFail, function* (action: any) {
            let status = action.payload.status;
            if (status === 400) {
                if (action.payload.data.errors) {
                    let errors = action.payload.data.errors;
                    yield put(
                        setErrorDataUser({
                            ...errors,
                        })
                    );
                } else {
                    const message = action.payload.data.message;
                    yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
                }
            } else {
                const message = action.payload.data.message;
                yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        }
    );

    yield takeLatest(changePasswordUserSuccess, function* () {
        getNotification("success", "Thay đổi mật khẩu thành công.");
        yield put(setVisibleModalChangePass(false));
        yield put(setDataChangePassUser({
            new_password: "",
            confirm_password: "",
        }));
        yield put(setErrorDataChangePassUser({
            new_password: "",
            confirm_password: "",
        }));
    });

    yield takeLatest(changePasswordUserFail, function* (action: any) {
        let status = action.payload.status;
        if (status === 400) {
            let errors = action.payload.data.detail;
            yield put(
                setErrorDataChangePassUser({
                    ...errors,
                })
            );
        }
        getNotification("error", "Thay đổi mật khẩu thất bại.");
    });

    yield takeLatest(deleteUserSuccess, function* () {
        getNotification("success", "Xoá người dùng thành công.");
        yield put(setVisibleModalDeleteUser(false));
        yield put(setDataFilter(initDataFilter))
        yield put(getListUsers(initDataFilter))
    });

    yield takeLatest(deleteUserFail, function* () {
        yield call(getNotification, "error", "Xoá người dùng thất bại.");
    });
}

export default function* userSaga() {
    yield all([fork(loadRouteData), fork(handleActions)]);
}
