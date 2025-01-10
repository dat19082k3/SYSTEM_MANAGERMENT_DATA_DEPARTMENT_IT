import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DataFilterType} from "@/states/modules/science";

export type PaginationListType = {
    currentPage: number,
    perPage: number,
    totalPage?: number,
    totalRecord: number,
}

export type IdeaState = {
    ideas: Array<any>,
    dataIdea: any,
    errorIdea: any
    dataFilter: DataFilterType,
    paginationListIdeas: PaginationListType,
    isLoadingTableIdeas: boolean,
    isLoadingDownloadEx: boolean
    visibleModalDelete: boolean,
    visibleModalCreOrUpd: boolean,
    isLoadingBtnDelete: boolean,
    isLoadingBtnCreOrUpd: boolean,
}

export const initDataIdea = {
    name: "",
    group: "",
    class: "",
    guide: "",
    year: null,
    note: ""
}

export const errorIdea = {
    name: "",
    group: "",
    class: "",
    guide: "",
    year: "",
    note: ""
}

export const initialState: IdeaState = {
    ideas: [],
    dataIdea: initDataIdea,
    errorIdea,
    dataFilter: {
        search: '',
        page: 1,
        perPage: 20,
        sortField: "name",
        sortOrder: "asc"
    },
    paginationListIdeas: {
        currentPage: 1,
        perPage: 20,
        totalPage: 1,
        totalRecord: 0,
    },
    isLoadingTableIdeas: false,
    isLoadingDownloadEx: false,
    visibleModalDelete: false,
    visibleModalCreOrUpd: false,
    isLoadingBtnDelete: false,
    isLoadingBtnCreOrUpd: false,
}

const ideaSlice = createSlice({
    name: 'idea',
    initialState,
    reducers: {
        setDataFilter: (state, action) => ({
            ...state,
            dataFilter: action.payload
        }),

        setDataIdea: (state, action: PayloadAction<any>) => ({
            ...state,
            dataIdea: action.payload
        }),

        setErrorIdea: (state, action: PayloadAction<any>) => ({
            ...state,
            errorIdea: action.payload
        }),

        startRequestGetListIdeas: (state) => ({
            ...state,
            isLoadingTableIdeas: true
        }),
        requestGetListIdeasSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            isLoadingTableIdeas: false,
            ideas: action.payload.data.student_ideas,
            paginationListIdeas: {
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page,
                totalRecord: action.payload.data.total,
                sortOrder: action.payload.data.sort_order,
                sortField: action.payload.data.sort_field
            }
        }),
        requestGetListIdeasFail: (state) => ({
            ...state,
            isLoadingTableIdeas: false,
            ideas: [],
            paginationList: {
                currentPage: 1,
                perPage: 20,
                totalPage: 1,
                totalRecord: 0,
            }
        }),

        startRequestCreateIdea: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: true
        }),
        requestCreateIdeaSuccess: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: false,
            visibleModalCreOrUpd: false
        }),
        requestCreateIdeaFail: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: false
        }),

        startRequestUpdateIdea: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: true
        }),
        requestUpdateIdeaSuccess: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: false,
            visibleModalCreOrUpd: false
        }),
        requestUpdateIdeaFail: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: false
        }),


        startRequestDownloadEx: (state) => ({
            ...state,
            isLoadingDownloadEx: true
        }),
        requestGetDownloadExSuccess: (state) => ({
            ...state,
            isLoadingDownloadEx: false
        }),
        requestGetDownloadExFail: (state) => ({
            ...state,
            isLoadingDownloadEx: false
        }),

        setVisibleModalCreOrUpdIdea: (state, action) => ({
            ...state,
            visibleModalCreOrUpd: action.payload
        }),

        setVisibleModalDeleteIdea: (state, action) => ({
            ...state,
            visibleModalDelete: action.payload
        }),

        startRequestDeleteIdea: state => ({
            ...state,
            isLoadingBtnDelete: true
        }),
        requestDeleteIdeaSuccess: (state) => ({
            ...state,
            isLoadingBtnDelete: false,
            visibleModalDelete: false
        }),
        requestDeleteIdeaFail: (state) => ({
            ...state,
            isLoadingBtnDelete: false
        }),

    }
})

export const {
    setDataFilter,
    startRequestGetListIdeas, requestGetListIdeasSuccess, requestGetListIdeasFail,
    startRequestDownloadEx, requestGetDownloadExSuccess, requestGetDownloadExFail,
    setVisibleModalDeleteIdea,
    setVisibleModalCreOrUpdIdea,
    startRequestCreateIdea, requestCreateIdeaSuccess, requestCreateIdeaFail,
    startRequestUpdateIdea, requestUpdateIdeaSuccess, requestUpdateIdeaFail,
    setErrorIdea,
    setDataIdea,
    startRequestDeleteIdea, requestDeleteIdeaSuccess, requestDeleteIdeaFail,
} = ideaSlice.actions

export default ideaSlice.reducer