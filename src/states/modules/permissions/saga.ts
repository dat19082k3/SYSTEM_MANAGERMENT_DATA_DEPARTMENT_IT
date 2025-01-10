import {all, fork, put, takeLatest, call, select} from 'redux-saga/effects';
import {setBreadcrumb, setTitlePage} from '../app/index.js';
import {getNotification} from '@/utils/helper.tsx';
import {
    setEmployeeIds,
    setErrorEmployeeIds,
    requestCreateRoleFail,
    requestCreateRoleSuccess,
    requestDeleteEmployeeOfRoleFail,
    requestDeleteEmployeeOfRoleSuccess,
    requestDeleteRoleSuccess,
    requestDeleteRoleFail,
    requestUpdateEmployeeOfRoleFail,
    requestUpdateEmployeeOfRoleSuccess,
    requestUpdateRoleFail,
    requestUpdateRoleSuccess,
    requestUpdateUpdatePermissionRoleFail,
    requestUpdateUpdatePermissionRoleSuccess,
    setErrorCreateOrUpdateRole,
    setQueryEmployeeWithoutRole,
    initialQueryEmployeeWithoutRole,
    setVisibleModalCreateOrUpdateRole,
    setVisibleModalAddEmployeeOfRole,
    setVisibleModalDeleteEmployeeOfRole,
    setVisibleModalDeleteRole,
    setInfoRoleSelected,
} from './index.ts';
import _ from 'lodash';
import {
    handleEmployeeWithoutRole,
    handleGetEmployeeOfRole,
    handleGetPermissionOfRole, handleGetRoles,
} from '@/api/permission/index.ts';

function* loadRouteData() {
    yield put(setTitlePage('Quản lý vai trò'));
    yield put(
        setBreadcrumb([
            {
                path: '/permissions-management',
                name: 'Quản lý vai trò',
            },
        ])
    );
    yield put(handleGetRoles());
    yield put(setVisibleModalDeleteRole(false));
    yield put(setVisibleModalAddEmployeeOfRole(false));
    yield put(setVisibleModalCreateOrUpdateRole(false));
    yield put(setVisibleModalDeleteEmployeeOfRole(false));
    yield put(setInfoRoleSelected({name: "", description: ""}));
}

function* handleActions() {
    //Role
    yield takeLatest(requestCreateRoleSuccess, function* () {
        getNotification('success', 'Tạo mới vai trò thành công.');
        yield put(handleGetRoles());
    });

    yield takeLatest(requestCreateRoleFail, function* (action: any) {
        let statusError = action.payload.statusCode;
        if (statusError === 400) {
            let errors = action.payload.data.errors;
            yield put(
                setErrorCreateOrUpdateRole({
                    name: _.get(errors, 'name', ''),
                    description: _.get(errors, 'description', ''),
                })
            );
        } else if (statusError === 401) {
            getNotification('error', 'Thông tin không hợp lệ.');
        } else {
            getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(requestUpdateRoleSuccess, function* () {
        getNotification('success', 'Cập nhật vai trò thành công.');
        yield put(handleGetRoles());
    });

    yield takeLatest(requestUpdateRoleFail, function* (action: any) {
        let statusError = action.payload.statusCode;
        if (statusError === 400) {
            let errors = action.payload.data.errors;
            yield put(
                setErrorCreateOrUpdateRole({
                    name: _.get(errors, 'name', ''),
                    description: _.get(errors, 'description', ''),
                })
            );
        } else if (statusError === 401) {
            getNotification('error', 'Thông tin không hợp lệ.');
        } else {
            getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(requestDeleteRoleSuccess, function* () {
        getNotification('success', 'Xóa vai trò thành công.');
        yield put(setInfoRoleSelected({
            name: "",
            description: ""
        }));
        yield put(handleGetRoles());
    });

    yield takeLatest(requestDeleteRoleFail, function* () {
        yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    });

    //Employee Of Role
    yield takeLatest(requestUpdateEmployeeOfRoleSuccess, function* (): Generator<any, void> {
        const idRoleSelected = yield select((state: any) => state.permission.infoRoleSelected);

        yield setEmployeeIds({employee_ids: []});
        yield setErrorEmployeeIds({employee_ids: ''});
        yield put(handleGetEmployeeOfRole(idRoleSelected.id));
        yield put(handleEmployeeWithoutRole(idRoleSelected.id));
        yield (setQueryEmployeeWithoutRole(initialQueryEmployeeWithoutRole));
        yield call(getNotification, 'success', 'Cập nhật thành công.');
    });

    yield takeLatest(requestUpdateEmployeeOfRoleFail, function* (action: any) {
        let statusError = action.payload.statusCode;
        if (statusError === 400) {
            let errors = action.payload.data.errors;
            yield put(
                setErrorEmployeeIds({
                    employee_ids: _.get(errors, 'employee_ids', ''),
                })
            );
        } else if (statusError === 401) {
            getNotification('error', 'Thông tin không hợp lệ.');
        } else {
            getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(requestDeleteEmployeeOfRoleSuccess, function* (): Generator<any, void> {
        const idRoleSelected = yield select((state) => state.permission.infoRoleSelected);

        yield put(handleEmployeeWithoutRole(idRoleSelected.id));
        yield put(handleGetEmployeeOfRole(idRoleSelected.id));
        yield call(getNotification, 'success', 'Xóa nhân viên khỏi vai trò thành công.');
    });

    yield takeLatest(requestDeleteEmployeeOfRoleFail, function* () {
        yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    });

    //Update permission role
    yield takeLatest(requestUpdateUpdatePermissionRoleSuccess, function* (): Generator<any, void> {
        const idRoleSelected = yield select((state: any) => state.permission.infoRoleSelected);

        yield put(handleGetPermissionOfRole(idRoleSelected.id));
        yield call(getNotification, 'success', 'Cập nhật quyền hạn thành công.');
    });

    yield takeLatest(requestUpdateUpdatePermissionRoleFail, function* () {
        yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    });
}

export default function* loadUserSaga() {
    yield all([fork(loadRouteData), fork(handleActions)]);
}
