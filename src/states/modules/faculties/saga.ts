import {
    all, fork, put, takeLatest, call
} from "redux-saga/effects";
import {setBreadcrumb, setTitlePage} from "../app/index.js";
import {
    errorFaculty, initDataFaculty, initDataFilter, requestCreateFacultyFail, requestCreateFacultySuccess,
    requestDeleteFacultyFail,
    requestDeleteFacultySuccess,
    requestGetDownloadExFail,
    requestGetDownloadExSuccess, requestUpdateFacultyFail, requestUpdateFacultySuccess, setDataFaculty,
    setDataFilter, setErrorFaculty, setVisibleModalCreOrUpdFaculty
} from "./index.js";
import {getNotification} from "@/utils/helper.tsx";
import {getListFaculties} from "@/api/faculties";

function* loadRouteData() {
    yield put(setTitlePage('Quản lý cán bộ'));
    yield put(setBreadcrumb([
        {
            path: '/faculties',
            name: 'Quản lý cán bộ'
        },
    ]))
    yield put(setDataFilter(initDataFilter))
    yield put(getListFaculties(initDataFilter))
}

function* handleActions() {
    yield takeLatest(setVisibleModalCreOrUpdFaculty, function* () {
        yield put(setErrorFaculty(errorFaculty))
    })

    yield takeLatest(requestCreateFacultySuccess, function* () {
        getNotification('success', 'Tạo mới cán bộ thành công.');
        yield put(setDataFilter(initDataFilter))
        yield put(getListFaculties(initDataFilter))
        yield put(setDataFaculty(initDataFaculty));
        yield put(setErrorFaculty(errorFaculty));
    });

    yield takeLatest(requestCreateFacultyFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            if (action.payload.data.errors) {
                yield put(setErrorFaculty(action.payload.data.errors));
            } else {
                yield call(getNotification, 'error', action.payload.data.message ? action.payload.data.message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        } else {
            yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(requestUpdateFacultySuccess, function* () {
        getNotification('success', 'Cập nhật cán bộ thành công.');
        yield put(setDataFilter(initDataFilter))
        yield put(getListFaculties(initDataFilter))
        yield put(setErrorFaculty(initDataFaculty));
        yield put(setErrorFaculty(errorFaculty));
    });

    yield takeLatest(requestUpdateFacultyFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            if (action.payload.data.errors) {
                yield put(setErrorFaculty(action.payload.data.errors));
            } else {
                yield call(getNotification, 'error', action.payload.data.message ? action.payload.data.message : 'Có lỗi xảy ra, vui lòng thử lại sau.');

            }
        } else {
            yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(requestDeleteFacultySuccess, function* () {
        getNotification('success', 'Xóa cán bộ thành công.');
        yield put(setDataFilter(initDataFilter))
        yield put(getListFaculties(initDataFilter))
    });

    yield takeLatest(requestDeleteFacultyFail, function* () {
        yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    });

    yield takeLatest(requestGetDownloadExSuccess, function* (action: any) {
        const data = action.payload;
        const url = URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download', 'CNTT - Thống kế cán bộ.xlsx'
        );
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        getNotification('success', 'Tải xuống thành công.');
    })

    yield takeLatest(requestGetDownloadExFail, function* () {
        yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    });
}

export default function* loadFacultySaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}