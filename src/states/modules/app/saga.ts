import {
    all, fork, put, takeLatest
} from "redux-saga/effects";
import {setLocation} from "@/states/modules/app/index.ts";
import {initDataSeminar, initErrorSeminar, setDataSeminar, setErrorSeminars} from "@/states/modules/seminar";
import {initDataScience, initErrorScience, setDataScience, setErrorSciences} from "@/states/modules/science";
import {initDataPaper, initErrorPaper, setDataPaper, setErrorPapers} from "@/states/modules/paper";

function* loadRouteData() {
    yield takeLatest(setLocation, function* () {
        yield put(setDataSeminar(initDataSeminar))
        yield put(setErrorSeminars(initErrorSeminar))

        yield put(setDataScience(initDataScience))
        yield put(setErrorSciences(initErrorScience))

        yield put(setDataPaper(initDataPaper))
        yield put(setErrorPapers(initErrorPaper))
    });
}

function* handleActions() {
}

export default function* appSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
