import {all, fork, takeLatest} from "redux-saga/effects";
import {ROUTE_SAGAS} from "@/router/rootSaga.js";
import {initialSaga} from "./index.js";

export function* watchRouteSagas() {
    let routeSagas = ROUTE_SAGAS;
    yield takeLatest(initialSaga, function* (action: any) {
        const sagaToRun = routeSagas[action.payload];
        if (sagaToRun) {
            yield fork(sagaToRun);
        }
    });
}

export default function* routes() {
    yield all([
        fork(watchRouteSagas),
    ]);
}
