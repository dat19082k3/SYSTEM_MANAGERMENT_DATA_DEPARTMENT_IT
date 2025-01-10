import {
    requestBuListSeminarsFail,
    requestBuListSeminarsSuccess,
    requestDeleteSeminarFail,
    requestDeleteSeminarSuccess,
    requestDownloadExSeminarsFail,
    requestDownloadExSeminarsSuccess,
    requestGetListSeminarsFail,
    requestGetListSeminarsSuccess,
    requestUpdateSeminarFail,
    requestUpdateSeminarSuccess,
    startRequestBuListSeminars,
    startRequestDeleteSeminar,
    startRequestDownloadExSeminars,
    startRequestGetListSeminars,
    startRequestUpdateSeminar,
    startRequestDetailsSeminar,
    requestDetailsSeminarSuccess,
    requestDetailsSeminarFail, requestCreateSeminarFail, requestCreateSeminarSuccess, startRequestCreateSeminar
} from "@/states/modules/seminar";
import callApi from "@/api/callApi.ts";
import _ from "lodash";
import {
    DataFilterType,
} from "@/states/modules/science";

export const getListSeminars: Function =
    (dataFilter?: DataFilterType) =>
        async (dispatch: any, getState: any) => {
            let path = `/seminars`;

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
                    startRequestGetListSeminars,
                    requestGetListSeminarsSuccess,
                    requestGetListSeminarsFail,
                ],
                variables: {},
                dispatch,
                getState,
            });
        };

export const getDetailsSeminar: Function =
    (id: number) =>
        async (dispatch: any, getState: any) => {
            let path = `/seminars/${id}`;

            await callApi({
                method: 'get',
                apiPath: path,
                actionTypes: [
                    startRequestDetailsSeminar,
                    requestDetailsSeminarSuccess,
                    requestDetailsSeminarFail,
                ],
                variables: {},
                dispatch,
                getState,
            });
        };


export const postBuListSeminars: Function = (data: any) => async (dispatch: any, getState: any) => {
    let path = `/seminars/backup`;

    return callApi({
        method: 'post',
        apiPath: path,
        actionTypes: [
            startRequestBuListSeminars,
            requestBuListSeminarsSuccess,
            requestBuListSeminarsFail
        ],
        variables: data,
        dispatch,
        getState
    })
}

export const postExportExSeminars: Function = (data: any) => async (dispatch: any, getState: any) => {
    let path = `/seminars/download`;

    for (const key in data) {
        if (data[key] === null || data[key] === undefined || data[key] === "") {
            delete data[key];
        }
    }

    return callApi({
        method: 'post',
        apiPath: path,
        actionTypes: [
            startRequestDownloadExSeminars,
            requestDownloadExSeminarsSuccess,
            requestDownloadExSeminarsFail
        ],
        variables: data,
        dispatch,
        getState,
        responseType: "blob"
    })
}

export const postCreateSeminar: Function = (data: any) => async (dispatch: any, getState: any) => {
    const dataUpdateSeminar = _.cloneDeep(data);

    for (const key in dataUpdateSeminar) {
        if (dataUpdateSeminar[key] === null || dataUpdateSeminar[key] === undefined || dataUpdateSeminar[key] === "") {
            delete dataUpdateSeminar[key];
        }
    }

    return callApi({
        method: "post",
        apiPath: `/seminars`,
        actionTypes: [
            startRequestCreateSeminar,
            requestCreateSeminarSuccess,
            requestCreateSeminarFail
        ],
        variables: {
            ...dataUpdateSeminar,
        },
        dispatch,
        getState
    })
}

export const putUpdateSeminar: Function = (id: number, data: any) => async (dispatch: any, getState: any) => {
    const dataUpdateSeminar = _.cloneDeep(data);
    delete dataUpdateSeminar.id;

    return callApi({
        method: "put",
        apiPath: `/seminars/${id}`,
        actionTypes: [
            startRequestUpdateSeminar,
            requestUpdateSeminarSuccess,
            requestUpdateSeminarFail
        ],
        variables: {
            ...dataUpdateSeminar,
        },
        dispatch,
        getState
    })
}

export const deleteSeminar: Function = (id: string) => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'delete',
        apiPath: `seminars/${id}`,
        actionTypes: [
            startRequestDeleteSeminar,
            requestDeleteSeminarSuccess,
            requestDeleteSeminarFail
        ],
        variables: {},
        dispatch,
        getState
    })
}

