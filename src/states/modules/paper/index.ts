import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PaginationListType} from "@/states/modules/idea";
import {DataFilterType} from "@/states/modules/science";

export type DataBackUpType = {
    username: string,
    password: string,
    type: number | null
}

export type DataExportType = {
    type: number | null,
    year: number | null
}

export type ErrorBackUpType = {
    username: string,
    password: string,
    type: string
}

export type ErrorExportType = {
    type: string,
    year: string
}


export type PaperType = {
    papers: Array<any>,
    dataPaper: any,
    dataExport: DataExportType,
    errorExport: ErrorExportType,
    dataBackUp: DataBackUpType,
    errorBackUp: ErrorBackUpType
    errorPaper: any,
    dataFilter: DataFilterType,
    paginationListPapers: PaginationListType,
    isLoadingTablePapers: boolean,
    visibleModalDeletePaper: boolean,
    visibleModalBuPaper: boolean,
    visibleModalExPaper: boolean,
    isLoadingBtnDelete: boolean,
    isLoadingBtnUpdate: boolean,
    isLoadingBtnBu: boolean,
    isLoadingBtnEx: boolean,
}

export const initDataPaper = {
    article_title: "",
    journal_name: "",
    year: null,
    unit: "",
    country: "",
    field: "",
    authors: "",
    author_count: null,
    hour: null,
    creator: "",
    creation_date: null,
    url: "",
    status: "",
    type: null,
    note: "",
}

export const initErrorPaper = {
    academy_source: "",
    end_date: "",
    end_year: "",
    name: "",
    note: "",
    other_source: "",
    product_file: "",
    product_type: "",
    product_url: "",
    project_lead: "",
    start_date: "",
    start_year: "",
    status: "",
    unit: "",
}

export const initDataBackUp: DataBackUpType = {
    username: "",
    password: "",
    type: null
}

export const initDataExport: DataExportType = {
    type: null,
    year: null
}


export const initErrorBackUp: ErrorBackUpType = {
    username: "",
    password: "",
    type: ""
}

export const initErrorExport: ErrorExportType = {
    type: "",
    year: ""
}

export const initialState: PaperType = {
    papers: [],
    dataPaper: initDataPaper,
    dataExport: initDataExport,
    errorExport: initErrorExport,
    dataBackUp: initDataBackUp,
    errorBackUp: initErrorBackUp,
    errorPaper: initErrorPaper,
    dataFilter: {
        search: '',
        page: 1,
        perPage: 20,
        sortField: "article_title",
        sortOrder: "asc"
    },
    paginationListPapers: {
        currentPage: 1,
        perPage: 20,
        totalPage: 1,
        totalRecord: 0,
    },
    isLoadingTablePapers: false,
    visibleModalDeletePaper: false,
    visibleModalBuPaper: false,
    visibleModalExPaper: false,
    isLoadingBtnDelete: false,
    isLoadingBtnUpdate: false,
    isLoadingBtnBu: false,
    isLoadingBtnEx: false,
}

const slicePaper = createSlice({
    name: 'paper',
    initialState,
    reducers: {
        setDataFilter: (state, action: PayloadAction<any>) => ({
            ...state,
            dataFilter: action.payload
        }),

        setDataPaper: (state, action: PayloadAction<any>) => ({
            ...state,
            dataPaper: action.payload
        }),

        setDataBackUp: (state, action: PayloadAction<any>) => ({
            ...state,
            dataBackUp: action.payload
        }),

        setDataExport: (state, action: PayloadAction<any>) => ({
            ...state,
            dataExport: action.payload
        }),

        setErrorPapers: (state, action: PayloadAction<any>) => ({
            ...state,
            errorPaper: action.payload
        }),

        setErrorBackUp: (state, action: PayloadAction<any>) => ({
            ...state,
            errorBackUp: action.payload
        }),

        setErrorExport: (state, action: PayloadAction<any>) => ({
            ...state,
            errorExport: action.payload
        }),

        setVisibleModalDeletePaper: (state: any, action: PayloadAction<any>) => ({
            ...state,
            visibleModalDeletePaper: action.payload
        }),

        setVisibleModalBuPaper: (state: any, action: PayloadAction<any>) => ({
            ...state,
            visibleModalBuPaper: action.payload
        }),

        setVisibleModalExPaper: (state: any, action: PayloadAction<any>) => ({
            ...state,
            visibleModalExPaper: action.payload
        }),

        setVisibleModalUpdatePaper: (state: any, action: PayloadAction<any>) => ({
            ...state,
            visibleModalUpdatePaper: action.payload
        }),

        startRequestGetListPapers: (state: any) => ({
            ...state,
            isLoadingTablePapers: true
        }),
        requestGetListPapersSuccess: (state: any, action: PayloadAction<any>) => ({
            ...state,
            isLoadingTablePapers: false,
            papers: action.payload.data.papers,
            paginationListPapers: {
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page,
                totalRecord: action.payload.data.total,
                sortField: action.payload.data.sort_field,
                sortOrder: action.payload.data.sort_order
            }
        }),
        requestGetListPapersFail: (state) => ({
            ...state,
            isLoadingTablePapers: false,
            papers: [],
            paginationListOrders: {
                currentPage: 1,
                perPage: 20,
                totalPage: 1,
                totalRecord: 0,
            }
        }),

        startRequestDetailsPaper: (state: any) => ({
            ...state,
        }),
        requestDetailsPaperSuccess: (state: any, action: PayloadAction<any>) => ({
            ...state,
            dataPaper: action.payload.data,
        }),
        requestDetailsPaperFail: (state) => ({
            ...state,
        }),

        startRequestBuListPapers: (state) => ({
            ...state,
            isLoadingBtnBu: true
        }),
        requestBuListPapersSuccess: (state) => ({
            ...state,
            isLoadingBtnBu: false,
        }),
        requestBuListPapersFail: (state) => ({
            ...state,
            isLoadingBtnBu: false,
        }),

        startRequestDownloadExPapers: (state) => ({
            ...state,
            isLoadingBtnEx: true
        }),
        requestDownloadExPapersSuccess: (state) => ({
            ...state,
            isLoadingBtnEx: false,
        }),
        requestDownloadExPapersFail: (state) => ({
            ...state,
            isLoadingBtnEx: false,
        }),

        startRequestCreatePaper: state => ({
            ...state,
            isLoadingBtnUpdate: true
        }),
        requestCreatePaperSuccess: (state) => ({
            ...state,
            isLoadingBtnUpdate: false,
        }),
        requestCreatePaperFail: (state) => ({
            ...state,
            isLoadingBtnUpdate: false
        }),

        startRequestUpdatePaper: state => ({
            ...state,
            isLoadingBtnUpdate: true
        }),
        requestUpdatePaperSuccess: (state) => ({
            ...state,
            isLoadingBtnUpdate: false,
            visibleModalUpdatePaper: false
        }),
        requestUpdatePaperFail: (state) => ({
            ...state,
            isLoadingBtnUpdate: false
        }),


        startRequestDeletePaper: state => ({
            ...state,
            isLoadingBtnDelete: true
        }),
        requestDeletePaperSuccess: (state) => ({
            ...state,
            isLoadingBtnDelete: false,
            visibleModalDeletePaper: false
        }),
        requestDeletePaperFail: (state) => ({
            ...state,
            isLoadingBtnDelete: false
        }),

    }
})

export const {
    setDataFilter,
    setDataPaper,
    setErrorPapers,
    setDataExport,
    setErrorExport,
    setDataBackUp,
    setErrorBackUp,
    setVisibleModalUpdatePaper,
    setVisibleModalBuPaper,
    setVisibleModalExPaper,
    startRequestDetailsPaper, requestDetailsPaperSuccess, requestDetailsPaperFail,
    startRequestGetListPapers, requestGetListPapersSuccess, requestGetListPapersFail,
    startRequestBuListPapers, requestBuListPapersSuccess, requestBuListPapersFail,
    startRequestDownloadExPapers, requestDownloadExPapersSuccess, requestDownloadExPapersFail,
    startRequestCreatePaper, requestCreatePaperSuccess, requestCreatePaperFail,
    startRequestUpdatePaper, requestUpdatePaperSuccess, requestUpdatePaperFail,
    setVisibleModalDeletePaper,
    startRequestDeletePaper, requestDeletePaperSuccess, requestDeletePaperFail,
} = slicePaper.actions

export default slicePaper.reducer