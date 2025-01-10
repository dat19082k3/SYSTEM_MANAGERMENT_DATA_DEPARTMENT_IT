import {
    all, fork, put, takeLatest, call
} from "redux-saga/effects";
import {setBreadcrumb, setTitlePage} from "../app/index.js";
import {
    errorStudentGraduate, initDataStudentGraduate,
    requestCreateStudentGraduateFail,
    requestCreateStudentGraduateSuccess,
    requestDeleteStudentGraduateFail,
    requestDeleteStudentGraduateSuccess,
    requestGetDownloadExFail,
    requestGetDownloadExSuccess, requestUpdateStudentGraduateFail,
    requestUpdateStudentGraduateSuccess, setDataFilter, setDataStudentGraduate,
    setErrorStudentGraduate,
    setVisibleModalCreOrUpdStudentGraduate
} from "./index.js";
import {getNotification} from "@/utils/helper.tsx";
import {getListStudentGraduates} from "@/api/graduates";
import {initDataFilter} from "@/states/modules/faculties";

function* loadRouteData() {
    yield put(setTitlePage('Quản lý sinh viên tốt nghiệp'));
    yield put(setBreadcrumb([
        {
            path: '/graduates',
            name: 'Quản lý sinh viên tốt nghiệp'
        },
    ]))
    yield put(setDataFilter(initDataFilter))
    yield put(getListStudentGraduates(initDataFilter))
}

function* handleActions() {
    yield takeLatest(setVisibleModalCreOrUpdStudentGraduate, function* () {
        yield put(setErrorStudentGraduate(errorStudentGraduate))
    })

    yield takeLatest(requestCreateStudentGraduateSuccess, function* () {
        getNotification('success', 'Tạo mới sinh viên thành công.');
        yield put(setDataFilter(initDataFilter))
        yield put(getListStudentGraduates(initDataFilter))
        yield put(setDataStudentGraduate(initDataStudentGraduate));
        yield put(setErrorStudentGraduate(errorStudentGraduate));
    });

    yield takeLatest(requestCreateStudentGraduateFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            if (action.payload.data.errors) {
                yield put(setErrorStudentGraduate(action.payload.data.errors));
            } else {
                const message = action.payload.data.message;
                yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        } else {
            yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(requestUpdateStudentGraduateSuccess, function* () {
        getNotification('success', 'Cập nhật sinh viên thành công.');
        yield put(setDataFilter(initDataFilter))
        yield put(getListStudentGraduates(initDataFilter))
        yield put(setDataStudentGraduate(initDataStudentGraduate));
        yield put(setErrorStudentGraduate(errorStudentGraduate));
    });

    yield takeLatest(requestUpdateStudentGraduateFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            if (action.payload.data.errors) {
                yield put(setErrorStudentGraduate(action.payload.data.errors));
            } else {
                const message = action.payload.data.message;
                yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        } else {
            yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });
    yield takeLatest(requestDeleteStudentGraduateSuccess, function* () {
        getNotification('success', 'Xóa sinh viên thành công.');
        yield put(setDataFilter(initDataFilter))
        yield put(getListStudentGraduates(initDataFilter))
    });

    yield takeLatest(requestDeleteStudentGraduateFail, function* () {
        yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    });

    yield takeLatest(requestGetDownloadExSuccess, function* (action: any) {
        const data = action.payload;
        const url = URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download', 'CNTT - Thống kế sinh viên tốt nghiệp.xlsx'
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

export default function* loadStudentGraduateSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}