import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DataFilterType} from "@/states/modules/science";

export type PaginationListType = {
    currentPage: number,
    perPage: number,
    totalPage?: number,
    totalRecord: number,
}

export type FacultyState = {
    faculties: Array<any>,
    dataFaculty: any,
    errorFaculty: any
    dataFilter: DataFilterType,
    paginationListFaculties: PaginationListType,
    isLoadingTableFaculties: boolean,
    isLoadingDownloadEx: boolean
    visibleModalDelete: boolean,
    visibleModalCreOrUpd: boolean,
    isLoadingBtnDelete: boolean,
    isLoadingBtnCreOrUpd: boolean,
}

export const initDataFaculty = {
    code: "",
    last_name: "",
    first_name: "",
    birthday: null,
    hometown: "",
    department: "",
    note: ""
}

export const errorFaculty = {
    code: "",
    last_name: "",
    first_name: "",
    birthday: "",
    hometown: "",
    department: "",
    note: ""
}

export const initDataFilter: DataFilterType = {
    search: '',
    page: 1,
    perPage: 20,
    sortField: "created_at",
    sortOrder: "desc"
}

export const initialState: FacultyState = {
    faculties: [],
    dataFaculty: initDataFaculty,
    errorFaculty,
    dataFilter: initDataFilter,
    paginationListFaculties: {
        currentPage: 1,
        perPage: 20,
        totalPage: 1,
        totalRecord: 0,
    },
    isLoadingTableFaculties: false,
    isLoadingDownloadEx: false,
    visibleModalDelete: false,
    visibleModalCreOrUpd: false,
    isLoadingBtnDelete: false,
    isLoadingBtnCreOrUpd: false,
}

const facultySlice = createSlice({
    name: 'faculty',
    initialState,
    reducers: {
        setDataFilter: (state, action) => ({
            ...state,
            dataFilter: action.payload
        }),

        setDataFaculty: (state, action: PayloadAction<any>) => ({
            ...state,
            dataFaculty: action.payload
        }),

        setErrorFaculty: (state, action: PayloadAction<any>) => ({
            ...state,
            errorFaculty: action.payload
        }),

        startRequestGetListFaculties: (state) => ({
            ...state,
            isLoadingTableFaculties: true
        }),
        requestGetListFacultiesSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            isLoadingTableFaculties: false,
            faculties: action.payload.data.faculties,
            paginationListFaculties: {
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page,
                totalRecord: action.payload.data.total,
                sortOrder: action.payload.data.sort_order,
                sortField: action.payload.data.sort_field
            }
        }),
        requestGetListFacultiesFail: (state) => ({
            ...state,
            isLoadingTableFaculties: false,
            faculties: [],
            paginationList: {
                currentPage: 1,
                perPage: 20,
                totalPage: 1,
                totalRecord: 0,
            }
        }),

        startRequestCreateFaculty: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: true
        }),
        requestCreateFacultySuccess: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: false,
            visibleModalCreOrUpd: false
        }),
        requestCreateFacultyFail: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: false
        }),

        startRequestUpdateFaculty: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: true
        }),
        requestUpdateFacultySuccess: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: false,
            visibleModalCreOrUpd: false
        }),
        requestUpdateFacultyFail: (state) => ({
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

        setVisibleModalCreOrUpdFaculty: (state, action) => ({
            ...state,
            visibleModalCreOrUpd: action.payload
        }),

        setVisibleModalDeleteFaculty: (state, action) => ({
            ...state,
            visibleModalDelete: action.payload
        }),

        startRequestDeleteFaculty: state => ({
            ...state,
            isLoadingBtnDelete: true
        }),
        requestDeleteFacultySuccess: (state) => ({
            ...state,
            isLoadingBtnDelete: false,
            visibleModalDelete: false
        }),
        requestDeleteFacultyFail: (state) => ({
            ...state,
            isLoadingBtnDelete: false
        }),

    }
})

export const {
    setDataFilter,
    startRequestGetListFaculties, requestGetListFacultiesSuccess, requestGetListFacultiesFail,
    startRequestDownloadEx, requestGetDownloadExSuccess, requestGetDownloadExFail,
    setVisibleModalDeleteFaculty,
    setVisibleModalCreOrUpdFaculty,
    startRequestCreateFaculty, requestCreateFacultySuccess, requestCreateFacultyFail,
    startRequestUpdateFaculty, requestUpdateFacultySuccess, requestUpdateFacultyFail,
    setErrorFaculty,
    setDataFaculty,
    startRequestDeleteFaculty, requestDeleteFacultySuccess, requestDeleteFacultyFail,
} = facultySlice.actions

export default facultySlice.reducer