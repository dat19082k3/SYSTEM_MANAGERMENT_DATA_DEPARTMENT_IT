import callApi from "@/api/callApi.ts";
import {
    requestCreateStudentGraduateFail,
    requestCreateStudentGraduateSuccess,
    requestDeleteStudentGraduateFail,
    requestDeleteStudentGraduateSuccess,
    requestGetListStudentGraduatesFail,
    requestGetListStudentGraduatesSuccess,
    requestUpdateStudentGraduateFail,
    requestUpdateStudentGraduateSuccess,
    startRequestCreateStudentGraduate,
    startRequestDeleteStudentGraduate,
    startRequestGetListStudentGraduates,
    startRequestUpdateStudentGraduate
} from "@/states/modules/graduates";
import _ from "lodash";
import {DataFilterType} from "@/states/modules/science";

export const getListStudentGraduates: Function =
    (dataFilter?: DataFilterType) =>
        async (dispatch: any, getState: any) => {
            let path = `/graduates`;

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
                    startRequestGetListStudentGraduates,
                    requestGetListStudentGraduatesSuccess,
                    requestGetListStudentGraduatesFail,
                ],
                variables: {},
                dispatch,
                getState,
            });
        };

export const postCreateStudentGraduate: Function = (data: any) => async (dispatch: any, getState: any) => {

    return callApi({
        method: "post",
        apiPath: `/graduates`,
        actionTypes: [
            startRequestCreateStudentGraduate,
            requestCreateStudentGraduateSuccess,
            requestCreateStudentGraduateFail
        ],
        variables: data,
        dispatch,
        getState
    })
}

export const putUpdateStudentGraduate: Function = (id: any, data: any) => async (dispatch: any, getState: any) => {
    const dataUpdateStudentGraduate = _.cloneDeep(data);
    delete dataUpdateStudentGraduate.id;

    return callApi({
        method: "put",
        apiPath: `/graduates/${id}`,
        actionTypes: [
            startRequestUpdateStudentGraduate,
            requestUpdateStudentGraduateSuccess,
            requestUpdateStudentGraduateFail
        ],
        variables: dataUpdateStudentGraduate,
        dispatch,
        getState
    })
}

export const deleteStudentGraduate: Function = (studentGraduateId: string) => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'delete',
        apiPath: `graduates/${studentGraduateId}`,
        actionTypes: [
            startRequestDeleteStudentGraduate,
            requestDeleteStudentGraduateSuccess,
            requestDeleteStudentGraduateFail
        ],
        variables: {},
        dispatch,
        getState
    })
}

