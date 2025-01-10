import {
    all, fork, put, takeLatest, call
} from "redux-saga/effects";
import {goToPage, setBreadcrumb, setTitlePage} from "../app/index.js";
import {
    initDataScience,
    initErrorScience,
    initialState,
    requestBuListSciencesFail,
    requestBuListSciencesSuccess,
    requestDownloadExSciencesSuccess,
    requestDownloadExSciencesFail,
    requestUpdateScienceFail,
    requestUpdateScienceSuccess,
    setDataFilter,
    setDataScience,
    setErrorSciences,
    setErrorBackUp,
    requestDetailsScienceFail,
    requestCreateScienceSuccess,
    requestCreateScienceFail,
    setVisibleModalBuScience,
    setDataExport,
    initDataExport,
    setVisibleModalExScience,
    initErrorBackUp,
    initDataBackUp,
    setDataBackUp
} from "./index.js";
import {requestDeleteScienceFail, requestDeleteScienceSuccess} from "./index.js";
import {getNotification} from "@/utils/helper.tsx";
import {getListSciences} from "@/api/science";

function* loadRouteData() {
    yield put(setTitlePage('Quản lý đề tài NCKH'));
    yield put(setBreadcrumb([
        {
            path: '/sciences',
            name: 'Quản lý đề tài NCKH'
        },
    ]))
    yield put(setDataFilter(initialState.dataFilter))
    yield put(getListSciences())
}

function* handleActions() {

    yield takeLatest(requestDeleteScienceSuccess, function* () {

        yield call(getNotification, 'success', 'Xóa đề tài thành công.');
        yield put(getListSciences())
    });

    yield takeLatest(requestDeleteScienceFail, function* () {
        yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    });

    yield takeLatest(requestCreateScienceSuccess, function* () {

        yield call(getNotification, 'success', 'Tạo mới thành công.');
        yield put(getListSciences())
        yield put(setDataScience(initDataScience))
        yield put(setErrorSciences(initErrorScience))
        yield put(goToPage({
            path: '/sciences'
        }))

    });

    yield takeLatest(requestCreateScienceFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            if (action.payload.data.errors) {
                yield put(setErrorSciences(action.payload.data.errors));
            } else {
                const message = action.payload.data.message;
                yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        } else {
            const message = action.payload.data.message;
            yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });


    yield takeLatest(requestUpdateScienceSuccess, function* () {

        yield call(getNotification, 'success', 'Cập nhật thành công.');
        yield put(getListSciences())
        yield put(setDataScience(initDataScience))
        yield put(setErrorSciences(initErrorScience))
        yield put(goToPage({
            path: '/sciences'
        }))

    });

    yield takeLatest(requestUpdateScienceFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            if (action.payload.data.errors) {
                yield put(setErrorSciences(action.payload.data.errors));
            } else {
                const message = action.payload.data.message;
                yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        } else {
            const message = action.payload.data.message;
            yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });


    yield takeLatest(requestDetailsScienceFail, function* (action: any) {
        yield call(getNotification, 'error', action.payload.data.message);
        yield put(goToPage({
            path: '/sciences'
        }))
    });

    yield takeLatest(requestCreateScienceFail, function* () {
        yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    });

    yield takeLatest(requestBuListSciencesSuccess, function* () {
        yield call(getNotification, 'success', 'Sao lưu thành công.');
        yield put(getListSciences())
        yield put(setVisibleModalBuScience(false));
        yield put(setDataBackUp(initDataBackUp))
        yield put(setErrorBackUp(initErrorBackUp))
    });

    yield takeLatest(requestBuListSciencesFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            if (action.payload.data.errors) {
                yield put(setErrorBackUp(action.payload.data.errors));
            } else {
                yield call(getNotification, 'error', action.payload.data.message);
            }
        } else {
            yield call(getNotification, 'error', action.payload.data.message);
        }
        yield put(setDataBackUp(initDataBackUp))
        yield put(setErrorBackUp(initErrorBackUp))
    });

    yield takeLatest(requestDownloadExSciencesSuccess, function* (action: any) {
        const data = action.payload;
        const url = URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download', 'CNTT-Thống kê đề tài NCKH.xlsx'
        );
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        getNotification('success', 'Tải xuống thành công.');
        yield put(setDataExport(initDataExport))
        yield put(setVisibleModalExScience(false))
    })

    yield takeLatest(requestDownloadExSciencesFail, function* () {
        yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    });
}

export default function* loadScienceSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}