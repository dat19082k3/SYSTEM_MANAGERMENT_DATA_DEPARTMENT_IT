import {
    all, fork, put, takeLatest, call
} from "redux-saga/effects";
import {goToPage, setBreadcrumb, setTitlePage} from "../app/index.js";
import {
    initDataPaper,
    initErrorPaper,
    requestBuListPapersFail,
    requestBuListPapersSuccess,
    requestDownloadExPapersSuccess,
    requestDownloadExPapersFail,
    requestUpdatePaperSuccess,
    setDataPaper,
    setErrorPapers,
    setVisibleModalBuPaper,
    setDataExport,
    initDataExport,
    setVisibleModalExPaper,
    requestUpdatePaperFail,
    requestCreatePaperSuccess,
    requestCreatePaperFail,
    setDataBackUp,
    initDataBackUp,
    setErrorBackUp, initErrorBackUp
} from "./index.js";
import {requestDeletePaperFail, requestDeletePaperSuccess} from "./index.js";
import {getNotification} from "@/utils/helper.tsx";
import {getListPapers} from "@/api/paper";

function* loadRouteData() {
    yield put(setTitlePage('Quản lý bài báo'));
    yield put(setBreadcrumb([
        {
            path: '/papers',
            name: 'Quản lý bài báo'
        },
    ]))
    yield put(getListPapers())
}

function* handleActions() {

    yield takeLatest(requestDeletePaperSuccess, function* () {

        yield call(getNotification, 'success', 'Xóa bài báo thành công.');
        yield put(getListPapers())
    });

    yield takeLatest(requestDeletePaperFail, function* () {
        yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    });

    yield takeLatest(requestUpdatePaperSuccess, function* () {
        yield call(getNotification, 'success', 'Cập nhật thành công.');
        yield put(getListPapers())
        yield put(setDataPaper(initDataPaper))
        yield put(setErrorPapers(initErrorPaper))
        yield put(goToPage({
            path: '/papers'
        }))
    });

    yield takeLatest(requestUpdatePaperFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            if (action.payload.data.errors) {
                yield put(setErrorPapers(action.payload.data.errors));
            } else {
                const message = action.payload.data.message;
                yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        } else {
            const message = action.payload.data.message;
            yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(requestCreatePaperSuccess, function* () {
        yield call(getNotification, 'success', 'Tạo mới thành công.');
        yield put(getListPapers())
        yield put(setDataPaper(initDataPaper))
        yield put(setErrorPapers(initErrorPaper))
        yield put(goToPage({
            path: '/papers'
        }))

    });

    yield takeLatest(requestCreatePaperFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            if (action.payload.data.errors) {
                yield put(setErrorPapers(action.payload.data.errors));
            } else {
                const message = action.payload.data.message;
                yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        } else {
            const message = action.payload.data.message;
            yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(requestBuListPapersSuccess, function* () {
        yield call(getNotification, 'success', 'Sao lưu thành công.')
        yield put(getListPapers())
        yield put(setVisibleModalBuPaper(false));
        yield put(setDataBackUp(initDataBackUp))
        yield put(setErrorBackUp(initErrorBackUp))
    });

    yield takeLatest(requestBuListPapersFail, function* (action: any) {
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

    yield takeLatest(requestDownloadExPapersSuccess, function* (action: any) {
        const data = action.payload;
        const url = URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download', 'CNTT-Thống kê bài báo.xlsx'
        );
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        yield call(getNotification, 'success', "Tải xuống thành công!");
        yield put(setDataExport(initDataExport))
        yield put(setVisibleModalExPaper(false))
    })

    yield takeLatest(requestDownloadExPapersFail, function* () {
        getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        yield put(setDataExport(initDataExport))
    });
}

export default function* loadPaperSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}