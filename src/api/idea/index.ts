import callApi from "@/api/callApi.ts";
import {
    requestCreateIdeaFail,
    requestCreateIdeaSuccess,
    requestDeleteIdeaFail,
    requestDeleteIdeaSuccess,
    requestGetDownloadExFail,
    requestGetDownloadExSuccess,
    requestGetListIdeasFail,
    requestGetListIdeasSuccess, requestUpdateIdeaFail, requestUpdateIdeaSuccess, startRequestCreateIdea,
    startRequestDeleteIdea,
    startRequestDownloadEx,
    startRequestGetListIdeas, startRequestUpdateIdea
} from "@/states/modules/idea";
import _ from "lodash";
import {DataFilterType} from "@/states/modules/science";

export const getListIdeas: Function =
    (dataFilter?: DataFilterType) =>
        async (dispatch: any, getState: any) => {
            let path = `/ideas`;

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
                    startRequestGetListIdeas,
                    requestGetListIdeasSuccess,
                    requestGetListIdeasFail,
                ],
                variables: {},
                dispatch,
                getState,
            });
        };

export const getDownloadExIdea: Function = () => async (dispatch: any, getState: any) => {
    let path = `/ideas/download-file-excel`;

    return callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [
            startRequestDownloadEx,
            requestGetDownloadExSuccess,
            requestGetDownloadExFail
        ],
        variables: {},
        dispatch,
        getState,
        responseType: 'blob'
    })
}

export const postCreateIdea: Function = (data: any) => async (dispatch: any, getState: any) => {

    for (const key in data) {
        if (data[key] === null || data[key] === undefined || data[key] === "") {
            delete data[key];
        }
    }

    return callApi({
        method: "post",
        apiPath: `/ideas`,
        actionTypes: [
            startRequestCreateIdea,
            requestCreateIdeaSuccess,
            requestCreateIdeaFail
        ],
        variables: data,
        dispatch,
        getState
    })
}

export const putUpdateIdea: Function = (id: any, data: any) => async (dispatch: any, getState: any) => {
    const dataUpdateIdea = _.cloneDeep(data);
    delete dataUpdateIdea.id;

    return callApi({
        method: "put",
        apiPath: `/ideas/${id}`,
        actionTypes: [
            startRequestUpdateIdea,
            requestUpdateIdeaSuccess,
            requestUpdateIdeaFail
        ],
        variables: dataUpdateIdea,
        dispatch,
        getState
    })
}

export const deleteIdea: Function = (IdeaId: number) => async (dispatch: any, getState: any) => {
    return callApi({
        method: 'delete',
        apiPath: `ideas/${IdeaId}`,
        actionTypes: [
            startRequestDeleteIdea,
            requestDeleteIdeaSuccess,
            requestDeleteIdeaFail
        ],
        variables: {},
        dispatch,
        getState
    })
}

