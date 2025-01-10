import callApi from "@/api/callApi.ts";
import {
    requestCreateFacultyFail,
    requestCreateFacultySuccess,
    requestDeleteFacultyFail,
    requestDeleteFacultySuccess,
    requestGetListFacultiesFail,
    requestGetListFacultiesSuccess, requestUpdateFacultyFail, requestUpdateFacultySuccess, startRequestCreateFaculty,
    startRequestDeleteFaculty,
    startRequestGetListFaculties, startRequestUpdateFaculty
} from "@/states/modules/faculties";
import _ from "lodash";
import {DataFilterType} from "@/states/modules/science";

export const getListFaculties: Function =
    (dataFilter?: DataFilterType) =>
        async (dispatch: any, getState: any) => {
            let path = `/faculties`;

            if (dataFilter?.perPage && dataFilter?.page) {
                path += `?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

                if (dataFilter.search) {
                    path += `&search=${dataFilter.search}`;
                }
            }

            if (dataFilter?.sortOrder) {
                path += `&sort_order=${dataFilter.sortOrder}&sort_field=${dataFilter.sortField}`
            }

            await callApi({
                method: 'get',
                apiPath: path,
                actionTypes: [
                    startRequestGetListFaculties,
                    requestGetListFacultiesSuccess,
                    requestGetListFacultiesFail,
                ],
                variables: {},
                dispatch,
                getState,
            });
        };

export const postCreateFaculty: Function = (data: any) => async (dispatch: any, getState: any) => {

    return callApi({
        method: "post",
        apiPath: `/faculties`,
        actionTypes: [
            startRequestCreateFaculty,
            requestCreateFacultySuccess,
            requestCreateFacultyFail
        ],
        variables: data,
        dispatch,
        getState
    })
}

export const putUpdateFaculty: Function = (id: any, data: any) => async (dispatch: any, getState: any) => {
    const dataUpdateFaculty = _.cloneDeep(data);
    delete dataUpdateFaculty.id;

    return callApi({
        method: "put",
        apiPath: `/faculties/${id}`,
        actionTypes: [
            startRequestUpdateFaculty,
            requestUpdateFacultySuccess,
            requestUpdateFacultyFail
        ],
        variables: dataUpdateFaculty,
        dispatch,
        getState
    })
}

export const deleteFaculty: Function = (studentGraduateId: string) => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'delete',
        apiPath: `faculties/${studentGraduateId}`,
        actionTypes: [
            startRequestDeleteFaculty,
            requestDeleteFacultySuccess,
            requestDeleteFacultyFail
        ],
        variables: {},
        dispatch,
        getState
    })
}

