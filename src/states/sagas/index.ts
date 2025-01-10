import {all, fork} from 'redux-saga/effects'
import appSaga from "@/states/modules/app/saga.ts";
import profileSaga from "@/states/modules/profile/saga.ts";
import routeSaga from "@/states/modules/routing/saga.ts"

export default function* sagas() {
    yield all([
        fork(routeSaga),
        fork(profileSaga),
        fork(appSaga),
    ])
}