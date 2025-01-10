import {
    DataFilterType,
    requestBuListSciencesFail,
    requestBuListSciencesSuccess, requestCreateScienceFail, requestCreateScienceSuccess,
    requestDeleteScienceFail,
    requestDeleteScienceSuccess, requestDetailsScienceFail,
    requestDetailsScienceSuccess,
    requestDownloadExSciencesFail,
    requestDownloadExSciencesSuccess,
    requestGetListSciencesFail,
    requestGetListSciencesSuccess,
    requestUpdateScienceFail,
    requestUpdateScienceSuccess,
    startRequestBuListSciences, startRequestCreateScience,
    startRequestDeleteScience,
    startRequestDetailsScience,
    startRequestDownloadExSciences,
    startRequestGetListSciences,
    startRequestUpdateScience
} from "@/states/modules/science";
import callApi from "@/api/callApi.ts";
import _ from "lodash";

export const getListSciences: Function =
    (dataFilter?: DataFilterType) =>
        async (dispatch: any, getState: any) => {
            let path = `/sciences`;

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
                    startRequestGetListSciences,
                    requestGetListSciencesSuccess,
                    requestGetListSciencesFail,
                ],
                variables: {},
                dispatch,
                getState,
            });
        };

export const getDetailsScience: Function =
    (id: number) =>
        async (dispatch: any, getState: any) => {
            let path = `/sciences/${id}`;

            await callApi({
                method: 'get',
                apiPath: path,
                actionTypes: [
                    startRequestDetailsScience,
                    requestDetailsScienceSuccess,
                    requestDetailsScienceFail,
                ],
                variables: {},
                dispatch,
                getState,
            });
        };


export const postBuListSciences: Function = (data: any) => async (dispatch: any, getState: any) => {
    let path = `/sciences/backup`;

    return callApi({
        method: 'post',
        apiPath: path,
        actionTypes: [
            startRequestBuListSciences,
            requestBuListSciencesSuccess,
            requestBuListSciencesFail
        ],
        variables: data,
        dispatch,
        getState
    })
}

export const postDownloadExSciences: Function = (data: any) => async (dispatch: any, getState: any) => {
    let path = `/sciences/download`;

    for (const key in data) {
        if (data[key] === null || data[key] === undefined || data[key] === "") {
            delete data[key];
        }
    }

    return callApi({
        method: 'post',
        apiPath: path,
        actionTypes: [
            startRequestDownloadExSciences,
            requestDownloadExSciencesSuccess,
            requestDownloadExSciencesFail
        ],
        variables: data,
        dispatch,
        getState,
        responseType: 'blob'
    })
}

export const postCreateScience: Function = (data: any) => async (dispatch: any, getState: any) => {
    const dataUpdateScience = _.cloneDeep(data);

    for (const key in dataUpdateScience) {
        if (dataUpdateScience[key] === null || dataUpdateScience[key] === undefined || dataUpdateScience[key] === "") {
            delete dataUpdateScience[key];
        }
    }

    return callApi({
        method: "post",
        apiPath: `/sciences`,
        actionTypes: [
            startRequestCreateScience,
            requestCreateScienceSuccess,
            requestCreateScienceFail
        ],
        variables: {
            ...dataUpdateScience,
        },
        dispatch,
        getState
    })
}


export const putUpdateScience: Function = (id: number, data: any) => async (dispatch: any, getState: any) => {
    const dataUpdateScience = _.cloneDeep(data);
    delete dataUpdateScience.id;

    for (const key in dataUpdateScience) {
        if (dataUpdateScience[key] === null || dataUpdateScience[key] === undefined || dataUpdateScience[key] === "") {
            delete dataUpdateScience[key];
        }
    }

    return callApi({
        method: "put",
        apiPath: `/sciences/${id}`,
        actionTypes: [
            startRequestUpdateScience,
            requestUpdateScienceSuccess,
            requestUpdateScienceFail
        ],
        variables: {
            ...dataUpdateScience,
        },
        dispatch,
        getState
    })
}

export const deleteScience: Function = (scienceId: string) => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'delete',
        apiPath: `sciences/${scienceId}`,
        actionTypes: [
            startRequestDeleteScience,
            requestDeleteScienceSuccess,
            requestDeleteScienceFail
        ],
        variables: {},
        dispatch,
        getState
    })
}

