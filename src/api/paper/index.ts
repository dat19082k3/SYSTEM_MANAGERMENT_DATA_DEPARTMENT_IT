import {
    requestBuListPapersFail,
    requestBuListPapersSuccess,
    requestDeletePaperFail,
    requestDeletePaperSuccess,
    requestDownloadExPapersFail,
    requestDownloadExPapersSuccess,
    requestGetListPapersFail,
    requestGetListPapersSuccess,
    requestUpdatePaperFail,
    requestUpdatePaperSuccess,
    startRequestBuListPapers,
    startRequestDeletePaper,
    startRequestDownloadExPapers,
    startRequestGetListPapers,
    startRequestUpdatePaper,
    startRequestDetailsPaper,
    requestDetailsPaperSuccess,
    requestDetailsPaperFail, requestCreatePaperSuccess, startRequestCreatePaper, requestCreatePaperFail
} from "@/states/modules/paper";
import callApi from "@/api/callApi.ts";
import _ from "lodash";
import {
    DataFilterType,
} from "@/states/modules/science";

export const getListPapers: Function =
    (dataFilter?: DataFilterType) =>
        async (dispatch: any, getState: any) => {
            let path = `/papers`;

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
                    startRequestGetListPapers,
                    requestGetListPapersSuccess,
                    requestGetListPapersFail,
                ],
                variables: {},
                dispatch,
                getState,
            });
        };

export const getDetailsPaper: Function =
    (id: number) =>
        async (dispatch: any, getState: any) => {
            let path = `/papers/${id}`;

            await callApi({
                method: 'get',
                apiPath: path,
                actionTypes: [
                    startRequestDetailsPaper,
                    requestDetailsPaperSuccess,
                    requestDetailsPaperFail,
                ],
                variables: {},
                dispatch,
                getState,
            });
        };


export const postBuListPapers: Function = (data: any) => async (dispatch: any, getState: any) => {
    let path = `/papers/backup`;

    for (const key in data) {
        if (data[key] === null || data[key] === undefined || data[key] === "") {
            delete data[key];
        }
    }

    return callApi({
        method: 'post',
        apiPath: path,
        actionTypes: [
            startRequestBuListPapers,
            requestBuListPapersSuccess,
            requestBuListPapersFail
        ],
        variables: data,
        dispatch,
        getState
    })
}

export const postExportExPapers: Function = (data: any) => async (dispatch: any, getState: any) => {
    let path = `/papers/download`;

    for (const key in data) {
        if (data[key] === null || data[key] === undefined || data[key] === "") {
            delete data[key];
        }
    }

    return callApi({
        method: 'post',
        apiPath: path,
        actionTypes: [
            startRequestDownloadExPapers,
            requestDownloadExPapersSuccess,
            requestDownloadExPapersFail
        ],
        variables: data,
        dispatch,
        getState,
        responseType: 'blob'
    })
}

export const postCreatePaper: Function = (data: any) => async (dispatch: any, getState: any) => {
    const dataUpdatePaper = _.cloneDeep(data);

    for (const key in dataUpdatePaper) {
        if (dataUpdatePaper[key] === null || dataUpdatePaper[key] === undefined || dataUpdatePaper[key] === "") {
            delete dataUpdatePaper[key];
        }
    }

    return callApi({
        method: "post",
        apiPath: `/papers`,
        actionTypes: [
            startRequestCreatePaper,
            requestCreatePaperSuccess,
            requestCreatePaperFail
        ],
        variables: {
            ...dataUpdatePaper,
        },
        dispatch,
        getState
    })
}


export const putUpdatePaper: Function = (id: number, data: any) => async (dispatch: any, getState: any) => {
    const dataUpdatePaper = _.cloneDeep(data);
    delete dataUpdatePaper.id;

    return callApi({
        method: "put",
        apiPath: `/papers/${id}`,
        actionTypes: [
            startRequestUpdatePaper,
            requestUpdatePaperSuccess,
            requestUpdatePaperFail
        ],
        variables: {
            ...dataUpdatePaper,
        },
        dispatch,
        getState
    })
}

export const deletePaper: Function = (id: number) => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'delete',
        apiPath: `papers/${id}`,
        actionTypes: [
            startRequestDeletePaper,
            requestDeletePaperSuccess,
            requestDeletePaperFail
        ],
        variables: {},
        dispatch,
        getState
    })
}

