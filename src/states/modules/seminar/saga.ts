import {
    all, fork, put, takeLatest, call
} from "redux-saga/effects";
import {goToPage, setBreadcrumb, setTitlePage} from "../app/index.js";
import {
    initDataSeminar,
    initErrorSeminar,
    requestBuListSeminarsFail,
    requestBuListSeminarsSuccess,
    requestDownloadExSeminarsSuccess,
    requestDownloadExSeminarsFail,
    requestUpdateSeminarSuccess,
    setDataSeminar,
    setErrorSeminars,
    setVisibleModalBuSeminar,
    setVisibleModalExSeminar,
    requestUpdateSeminarFail,
    requestCreateSeminarFail,
    requestCreateSeminarSuccess,
    setDataBackUp,
    initDataBackUp,
    setErrorBackUp,
    initErrorBackUp, setDataExport, initDataExport
} from "./index.ts";
import {requestDeleteSeminarFail, requestDeleteSeminarSuccess} from "./index.ts";
import {getNotification} from "@/utils/helper.tsx";
import {getListSeminars} from "@/api/seminar";

function* loadRouteData() {
    yield put(setTitlePage('Quản lý hội thảo'));
    yield put(setBreadcrumb([
        {
            path: '/papers',
            name: 'Quản lý hội thảo'
        },
    ]))
    yield put(getListSeminars())
}

function* handleActions() {

    yield takeLatest(requestDeleteSeminarSuccess, function* () {

        yield call(getNotification, 'success', 'Xóa hội thảo thành công.');
        yield put(getListSeminars())
    });

    yield takeLatest(requestDeleteSeminarFail, function* () {
        yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    });

    yield takeLatest(requestCreateSeminarSuccess, function* () {
        yield call(getNotification, 'success', 'Tạo mới thành công.');
        yield put(getListSeminars())
        yield put(setDataSeminar(initDataSeminar))
        yield put(setErrorSeminars(initErrorSeminar))
        yield put(goToPage({
            path: '/seminars'
        }))

    });

    yield takeLatest(requestCreateSeminarFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            if (action.payload.data.errors) {
                yield put(setErrorSeminars(action.payload.data.errors));
            } else {
                const message = action.payload.data.message;
                yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        } else {
            const message = action.payload.data.message;
            yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(requestUpdateSeminarSuccess, function* () {

        yield call(getNotification, 'success', 'Cập nhật thành công.');
        yield put(getListSeminars())
        yield put(setDataSeminar(initDataSeminar))
        yield put(setErrorSeminars(initErrorSeminar))
        yield put(goToPage({
            path: '/seminars'
        }))

    });

    yield takeLatest(requestUpdateSeminarFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            if (action.payload.data.errors) {
                yield put(setErrorSeminars(action.payload.data.errors));
            } else {
                const message = action.payload.data.message;
                yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        } else {
            const message = action.payload.data.message;
            yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });


    yield takeLatest(requestBuListSeminarsSuccess, function* () {

        yield call(getNotification, 'success', 'Sao lưu thành công.');
        yield put(setVisibleModalBuSeminar(false))
        yield put(setDataBackUp(initDataBackUp))
        yield put(setErrorBackUp(initErrorBackUp))
    });

    yield takeLatest(requestBuListSeminarsFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            if (action.payload.data.errors) {
                yield put(setErrorBackUp(action.payload.data.errors));
            } else {
                const message = action.payload.data.message;
                yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        } else {
            const message = action.payload.data.message;
            yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');

        }
        yield put(setDataBackUp(initDataBackUp))
        yield put(setErrorBackUp(initErrorBackUp))
    });

    yield takeLatest(requestDownloadExSeminarsSuccess, function* (action: any) {
        const data = action.payload;
        const url = URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download', 'CNTT-Thống kê hội thảo.xlsx'
        );
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        yield call(getNotification, 'success', "Tải xuống thành công!");
        yield put(setDataExport(initDataExport));
        yield put(setVisibleModalExSeminar(false));
    })

    yield takeLatest(requestDownloadExSeminarsFail, function* () {
        getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    });
}

export default function* loadSeminarSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}