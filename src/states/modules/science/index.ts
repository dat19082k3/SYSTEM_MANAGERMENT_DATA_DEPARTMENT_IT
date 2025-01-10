import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type DataFilterType = {
    search: string,
    page: number,
    perPage: number,
    sortOrder: "desc" | "asc",
    sortField: string,
}

export type PaginationListType = {
    currentPage: number,
    perPage: number,
    totalPage?: number,
    totalRecord: number,
}

export type DataBackUpScienceType = {
    username: string,
    password: string,
    level: number | null,
    type: number | null
}

export type DataExportScienceType = {
    level: number | null,
    type: number | null,
    status: number | null,
    start_year: number | null
}

export type ErrorBackUpScienceType = {
    username: string,
    password: string,
    level: string,
    type: string
}

export type ErrorExportScienceType = {
    level: string,
    type: string,
    status: string,
    start_year: string
}

export type ScienceType = {
    sciences: Array<any>,
    dataScience: any,
    dataBackUp: DataBackUpScienceType,
    dataExport: DataExportScienceType,
    errorBackUp: any,
    errorExport: any
    errorScience: any,
    dataFilter: DataFilterType,
    paginationListSciences: PaginationListType,
    isLoadingTableSciences: boolean,
    visibleModalDeleteScience: boolean,
    visibleModalBuScience: boolean,
    visibleModalExScience: boolean,
    isLoadingBtnDelete: boolean,
    isLoadingBtnUpdate: boolean,
    isLoadingBtnBu: boolean,
    isLoadingBtnEx: boolean,
    isLoadingBtnChangeStatus: boolean,
}

export const initDataScience = {
    code: "",
    name: "",
    start_year: null,
    end_year: null,
    start_date: null,
    end_date: null,
    unit: "",
    total: null,
    level: null,
    type: null,
    leader: "",
    member_count: null,
    source: [],
    budget: null,
    budget_other: null,
    product_type: [],
    product_url: "",
    status: null,
    leader_hour: null,
    member_hour: null,
    total_hour: null,
    note: ""
}

export const initDataBackUp: DataBackUpScienceType = {
    username: "",
    password: "",
    level: null,
    type: null
}

export const initDataExport: DataExportScienceType = {
    level: null,
    type: null,
    status: null,
    start_year: null
}

export const initErrorScience = {
    code: "",
    name: "",
    start_year: "",
    end_year: "",
    start_date: "",
    end_date: "",
    unit: "",
    total: "",
    level: "",
    type: "",
    leader: "",
    member_count: "",
    source: "",
    budget: "",
    budget_other: "",
    product_type: "",
    product_url: "",
    status: "",
    leader_hour: "",
    member_hour: "",
    total_hour: "",
    note: ""
}

export const initErrorBackUp: ErrorBackUpScienceType = {
    username: "",
    password: "",
    level: "",
    type: ""
}

export const initErrorExport: ErrorExportScienceType = {
    level: "",
    type: "",
    status: "",
    start_year: ""
}

export const initialState: ScienceType = {
    sciences: [],
    dataScience: initDataScience,
    dataBackUp: initDataBackUp,
    dataExport: initDataExport,
    errorBackUp: initErrorBackUp,
    errorExport: initErrorExport,
    errorScience: initErrorScience,
    dataFilter: {
        search: '',
        page: 1,
        perPage: 20,
        sortOrder: "desc",
        sortField: ""
    },
    paginationListSciences: {
        currentPage: 1,
        perPage: 20,
        totalPage: 1,
        totalRecord: 0,
    },
    isLoadingTableSciences: false,
    visibleModalDeleteScience: false,
    visibleModalBuScience: false,
    visibleModalExScience: false,
    isLoadingBtnDelete: false,
    isLoadingBtnUpdate: false,
    isLoadingBtnBu: false,
    isLoadingBtnEx: false,
    isLoadingBtnChangeStatus: false,

}

const scienceSlice = createSlice({
    name: 'science',
    initialState,
    reducers: {
        setDataFilter: (state, action: PayloadAction<any>) => ({
            ...state,
            dataFilter: action.payload
        }),

        setDataScience: (state, action: PayloadAction<any>) => ({
            ...state,
            dataScience: action.payload
        }),

        setDataExport: (state, action: PayloadAction<any>) => ({
            ...state,
            dataExport: action.payload
        }),

        setDataBackUp: (state, action: PayloadAction<any>) => ({
            ...state,
            dataBackUp: action.payload
        }),

        setErrorSciences: (state, action: PayloadAction<any>) => ({
            ...state,
            errorScience: action.payload
        }),

        setErrorExport: (state, action: PayloadAction<any>) => ({
            ...state,
            errorExport: action.payload
        }),

        setErrorBackUp: (state, action: PayloadAction<any>) => ({
            ...state,
            errorBackUp: action.payload
        }),

        setVisibleModalDeleteScience: (state: any, action: PayloadAction<any>) => ({
            ...state,
            visibleModalDeleteScience: action.payload
        }),

        setVisibleModalBuScience: (state: any, action: PayloadAction<any>) => ({
            ...state,
            visibleModalBuScience: action.payload
        }),

        setVisibleModalExScience: (state: any, action: PayloadAction<any>) => ({
            ...state,
            visibleModalExScience: action.payload
        }),

        setVisibleModalUpdateScience: (state: any, action: PayloadAction<any>) => ({
            ...state,
            visibleModalUpdateScience: action.payload
        }),

        startRequestGetListSciences: (state: any) => ({
            ...state,
            isLoadingTableSciences: true
        }),
        requestGetListSciencesSuccess: (state: any, action: PayloadAction<any>) => ({
            ...state,
            isLoadingTableSciences: false,
            sciences: action.payload.data.sciences,
            paginationListSciences: {
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page,
                totalRecord: action.payload.data.total,
                sortOrder: action.payload.data.sort_order,
                sortField: action.payload.data.sort_field
            }
        }),
        requestGetListSciencesFail: (state) => ({
            ...state,
            isLoadingTableSciences: false,
            sciences: [],
            paginationListOrders: {
                currentPage: 1,
                perPage: 20,
                totalPage: 1,
                totalRecord: 0,
            }
        }),

        startRequestDetailsScience: (state: any) => ({
            ...state,
        }),
        requestDetailsScienceSuccess: (state: any, action: PayloadAction<any>) => ({
            ...state,
            dataScience: action.payload.data,
        }),
        requestDetailsScienceFail: (state) => ({
            ...state,
        }),

        startRequestBuListSciences: (state) => ({
            ...state,
            isLoadingBtnBu: true
        }),
        requestBuListSciencesSuccess: (state) => ({
            ...state,
            isLoadingBtnBu: false,
        }),
        requestBuListSciencesFail: (state) => ({
            ...state,
            isLoadingBtnBu: false,
        }),

        startRequestDownloadExSciences: (state) => ({
            ...state,
            isLoadingBtnEx: true
        }),
        requestDownloadExSciencesSuccess: (state) => ({
            ...state,
            isLoadingBtnEx: false,
            visibleModalExScience: false
        }),
        requestDownloadExSciencesFail: (state) => ({
            ...state,
            isLoadingBtnEx: false,
        }),

        startRequestCreateScience: state => ({
            ...state,
            isLoadingBtnUpdate: true
        }),
        requestCreateScienceSuccess: (state) => ({
            ...state,
            isLoadingBtnUpdate: false,
        }),
        requestCreateScienceFail: (state) => ({
            ...state,
            isLoadingBtnUpdate: false
        }),


        startRequestUpdateScience: state => ({
            ...state,
            isLoadingBtnUpdate: true
        }),
        requestUpdateScienceSuccess: (state) => ({
            ...state,
            isLoadingBtnUpdate: false,
            visibleModalUpdateScience: false
        }),
        requestUpdateScienceFail: (state) => ({
            ...state,
            isLoadingBtnUpdate: false
        }),


        startRequestDeleteScience: state => ({
            ...state,
            isLoadingBtnDelete: true
        }),
        requestDeleteScienceSuccess: (state) => ({
            ...state,
            isLoadingBtnDelete: false,
            visibleModalDeleteScience: false
        }),
        requestDeleteScienceFail: (state) => ({
            ...state,
            isLoadingBtnDelete: false
        }),

    }
})

export const {
    setDataFilter,
    setDataScience,
    setErrorSciences,
    setDataExport,
    setErrorExport,
    setDataBackUp,
    setErrorBackUp,
    setVisibleModalExScience,
    setVisibleModalUpdateScience,
    setVisibleModalBuScience,
    startRequestGetListSciences, requestGetListSciencesSuccess, requestGetListSciencesFail,
    startRequestDetailsScience, requestDetailsScienceSuccess, requestDetailsScienceFail,
    startRequestBuListSciences, requestBuListSciencesSuccess, requestBuListSciencesFail,
    startRequestDownloadExSciences, requestDownloadExSciencesSuccess, requestDownloadExSciencesFail,
    startRequestCreateScience, requestCreateScienceSuccess, requestCreateScienceFail,
    startRequestUpdateScience, requestUpdateScienceSuccess, requestUpdateScienceFail,
    setVisibleModalDeleteScience,
    startRequestDeleteScience, requestDeleteScienceSuccess, requestDeleteScienceFail,
} = scienceSlice.actions

export default scienceSlice.reducer