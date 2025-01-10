import {
    all, fork, put, takeLatest, call
} from "redux-saga/effects";
import {setBreadcrumb, setTitlePage} from "../app/index.js";
import {
    errorIdea, initDataIdea, requestCreateIdeaFail, requestCreateIdeaSuccess,
    requestDeleteIdeaFail,
    requestDeleteIdeaSuccess,
    requestGetDownloadExFail,
    requestGetDownloadExSuccess, requestUpdateIdeaFail, requestUpdateIdeaSuccess,
    setDataIdea, setErrorIdea, setVisibleModalCreOrUpdIdea
} from "./index.js";
import {getNotification} from "@/utils/helper.tsx";
import {getListIdeas} from "@/api/idea";

function* loadRouteData() {
    yield put(setTitlePage('Quản lý ý tưởng sinh viên'));
    yield put(setBreadcrumb([
        {
            path: '/ideas',
            name: 'Quản lý ý tưởng sinh viên sáng tạo'
        },
    ]))
    yield put(getListIdeas())
}

function* handleActions() {
    yield takeLatest(setVisibleModalCreOrUpdIdea, function* () {
        yield put(setErrorIdea(errorIdea))
    })

    yield takeLatest(requestCreateIdeaSuccess, function* () {
        getNotification('success', 'Tạo ý tưởng thành công.');
        yield put(getListIdeas())
        yield put(setDataIdea(initDataIdea))
        yield put(setErrorIdea(errorIdea))
    });

    yield takeLatest(requestCreateIdeaFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            if (action.payload.data.errors) {
                yield put(setErrorIdea(action.payload.data.errors));
            } else {
                const message = action.payload.data.message;
                yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        } else {
            const message = action.payload.data.message;
            yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(requestUpdateIdeaSuccess, function* () {
        getNotification('success', 'Cập nhật ý tưởng thành công.');
        yield put(getListIdeas())
        yield put(setDataIdea(initDataIdea))
        yield put(setErrorIdea(errorIdea))
    });

    yield takeLatest(requestUpdateIdeaFail, function* (action: any) {
        let statusError = action.payload.data.statusCode
        if (statusError === 400) {
            if (action.payload.data.errors) {
                yield put(setErrorIdea(action.payload.data.errors));
            } else {
                const message = action.payload.data.message;
                yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        } else {
            const message = action.payload.data.message;
            yield call(getNotification, 'error', message ? message : 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(requestDeleteIdeaSuccess, function* () {
        getNotification('success', 'Xóa ý tưởng thành công.');
        yield put(getListIdeas())
    });

    yield takeLatest(requestDeleteIdeaFail, function* () {
        yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    });

    yield takeLatest(requestGetDownloadExSuccess, function* (action: any) {
        const data = action.payload;
        const url = URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download', 'CNTT - Thống kế đề tài YTSV.xlsx'
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

export default function* loadIdeaSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}