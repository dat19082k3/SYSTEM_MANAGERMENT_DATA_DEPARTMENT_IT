import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PaginationListType} from "@/states/modules/idea";
import {DataFilterType} from "@/states/modules/science";

export type DataBackUpSeminarType = {
    username: string,
    password: string,
    type: number | null
}

export type DataExportSeminarType = {
    type: number | null,
}

export type ErrorBackUpSeminarType = {
    username: string,
    password: string,
    type: string
}

export type ErrorExportSeminarType = {
    type: string,
}


export type SeminarType = {
    seminars: Array<any>,
    dataSeminar: any,
    dataExport: DataExportSeminarType,
    errorExport: ErrorExportSeminarType,
    dataBackUp: DataBackUpSeminarType,
    errorBackUp: ErrorBackUpSeminarType
    errorSeminar: any,
    dataFilter: DataFilterType,
    paginationListSeminars: PaginationListType,
    isLoadingTableSeminars: boolean,
    visibleModalDeleteSeminar: boolean,
    visibleModalBuSeminar: boolean,
    visibleModalExSeminar: boolean,
    isLoadingBtnDelete: boolean,
    isLoadingBtnUpdate: boolean,
    isLoadingBtnBu: boolean,
    isLoadingBtnEx: boolean,
}

export const initDataSeminar = {
    type: null,
    name: "",
    start_date: null,
    end_date: null,
    delegates: null,
    place: "",
    unit_host: "",
    unit_partner: "",
    authors: "",
    creator: "",
    status: "",
    url: "",
    note: ""
}

export const initDataBackUp: DataBackUpSeminarType = {
    username: "",
    password: "",
    type: null
}
export const initDataExport:DataExportSeminarType = {
    type: null,
}

export const initErrorSeminar = {
    type: "",
    name: "",
    start_date: "",
    end_date: "",
    delegates: "",
    place: "",
    unit_host: "",
    unit_partner: "",
    authors: "",
    creator: "",
    status: "",
    url: "",
    note: ""
}

export const initErrorBackUp:ErrorBackUpSeminarType = {
    username: "",
    password: "",
    type: ""
}

export const initErrorExport:ErrorExportSeminarType = {
    type: "",
}

export const initialState: SeminarType = {
    seminars: [],
    dataSeminar: initDataSeminar,
    dataExport: initDataExport,
    errorExport: initErrorExport,
    dataBackUp: initDataBackUp,
    errorBackUp: initErrorBackUp,
    errorSeminar: initErrorSeminar,
    dataFilter: {
        search: '',
        page: 1,
        perPage: 20,
        sortField: "name",
        sortOrder: "asc"
    },
    paginationListSeminars: {
        currentPage: 1,
        perPage: 20,
        totalPage: 1,
        totalRecord: 0,
    },
    isLoadingTableSeminars: false,
    visibleModalDeleteSeminar: false,
    visibleModalBuSeminar: false,
    visibleModalExSeminar: false,
    isLoadingBtnDelete: false,
    isLoadingBtnUpdate: false,
    isLoadingBtnBu: false,
    isLoadingBtnEx: false,
}

const scienceSeminar = createSlice({
    name: 'seminar',
    initialState,
    reducers: {
        setDataFilter: (state, action: PayloadAction<any>) => ({
            ...state,
            dataFilter: action.payload
        }),

        setDataSeminar: (state, action: PayloadAction<any>) => ({
            ...state,
            dataSeminar: action.payload
        }),

        setDataBackUp: (state, action: PayloadAction<any>) => ({
            ...state,
            dataBackUp: action.payload
        }),

        setDataExport: (state, action: PayloadAction<any>) => ({
            ...state,
            dataExport: action.payload
        }),

        setErrorSeminars: (state, action: PayloadAction<any>) => ({
            ...state,
            errorSeminar: action.payload
        }),

        setErrorBackUp: (state, action: PayloadAction<any>) => ({
            ...state,
            errorBackUp: action.payload
        }),

        setErrorExport: (state, action: PayloadAction<any>) => ({
            ...state,
            errorExport: action.payload
        }),

        setVisibleModalDeleteSeminar: (state: any, action: PayloadAction<any>) => ({
            ...state,
            visibleModalDeleteSeminar: action.payload
        }),

        setVisibleModalBuSeminar: (state: any, action: PayloadAction<any>) => ({
            ...state,
            visibleModalBuSeminar: action.payload
        }),

        setVisibleModalExSeminar: (state: any, action: PayloadAction<any>) => ({
            ...state,
            visibleModalExSeminar: action.payload
        }),

        startRequestGetListSeminars: (state: any) => ({
            ...state,
            isLoadingTableSeminars: true
        }),
        requestGetListSeminarsSuccess: (state: any, action: PayloadAction<any>) => ({
            ...state,
            isLoadingTableSeminars: false,
            seminars: action.payload.data.seminars,
            paginationListSeminars: {
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page,
                totalRecord: action.payload.data.total,
                sortField: action.payload.data.sort_field,
                sortOrder: action.payload.data.sort_order
            }
        }),
        requestGetListSeminarsFail: (state) => ({
            ...state,
            isLoadingTableSeminars: false,
            seminars: [],
            paginationListOrders: {
                currentPage: 1,
                perPage: 20,
                totalPage: 1,
                totalRecord: 0,
            }
        }),

        startRequestDetailsSeminar: (state: any) => ({
            ...state,
        }),
        requestDetailsSeminarSuccess: (state: any, action: PayloadAction<any>) => ({
            ...state,
            dataSeminar: action.payload.data,
        }),
        requestDetailsSeminarFail: (state) => ({
            ...state,
        }),

        startRequestBuListSeminars: (state) => ({
            ...state,
            isLoadingBtnBu: true
        }),
        requestBuListSeminarsSuccess: (state) => ({
            ...state,
            isLoadingBtnBu: false,
        }),
        requestBuListSeminarsFail: (state) => ({
            ...state,
            isLoadingBtnBu: false,
        }),

        startRequestDownloadExSeminars: (state) => ({
            ...state,
            isLoadingBtnEx: true
        }),
        requestDownloadExSeminarsSuccess: (state) => ({
            ...state,
            isLoadingBtnEx: false,
        }),
        requestDownloadExSeminarsFail: (state) => ({
            ...state,
            isLoadingBtnEx: false,
        }),

        startRequestCreateSeminar: state => ({
            ...state,
            isLoadingBtnUpdate: true
        }),
        requestCreateSeminarSuccess: (state) => ({
            ...state,
            isLoadingBtnUpdate: false,
            visibleModalUpdateSeminar: false
        }),
        requestCreateSeminarFail: (state) => ({
            ...state,
            isLoadingBtnUpdate: false
        }),


        startRequestUpdateSeminar: state => ({
            ...state,
            isLoadingBtnUpdate: true
        }),
        requestUpdateSeminarSuccess: (state) => ({
            ...state,
            isLoadingBtnUpdate: false,
            visibleModalUpdateSeminar: false
        }),
        requestUpdateSeminarFail: (state) => ({
            ...state,
            isLoadingBtnUpdate: false
        }),


        startRequestDeleteSeminar: state => ({
            ...state,
            isLoadingBtnDelete: true
        }),
        requestDeleteSeminarSuccess: (state) => ({
            ...state,
            isLoadingBtnDelete: false,
            visibleModalDeleteSeminar: false
        }),
        requestDeleteSeminarFail: (state) => ({
            ...state,
            isLoadingBtnDelete: false
        }),

    }
})

export const {
    setDataFilter,
    setDataSeminar,
    setErrorSeminars,
    setDataExport,
    setErrorExport,
    setDataBackUp,
    setErrorBackUp,
    setVisibleModalBuSeminar,
    setVisibleModalExSeminar,
    startRequestDetailsSeminar, requestDetailsSeminarSuccess, requestDetailsSeminarFail,
    startRequestGetListSeminars, requestGetListSeminarsSuccess, requestGetListSeminarsFail,
    startRequestBuListSeminars, requestBuListSeminarsSuccess, requestBuListSeminarsFail,
    startRequestDownloadExSeminars, requestDownloadExSeminarsSuccess, requestDownloadExSeminarsFail,
    startRequestCreateSeminar, requestCreateSeminarSuccess, requestCreateSeminarFail,
    startRequestUpdateSeminar, requestUpdateSeminarSuccess, requestUpdateSeminarFail,
    setVisibleModalDeleteSeminar,
    startRequestDeleteSeminar, requestDeleteSeminarSuccess, requestDeleteSeminarFail,
} = scienceSeminar.actions

export default scienceSeminar.reducer