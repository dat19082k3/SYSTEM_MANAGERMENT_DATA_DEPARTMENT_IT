import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DataFilterType} from "@/states/modules/science";

export type PaginationListType = {
    currentPage: number,
    perPage: number,
    totalPage?: number,
    totalRecord: number,
}

export type StudentGraduateState = {
    studentGraduates: Array<any>,
    dataStudentGraduate: any,
    errorStudentGraduate: any
    dataFilter: DataFilterType,
    paginationListStudentGraduates: PaginationListType,
    isLoadingTableStudentGraduates: boolean,
    isLoadingDownloadEx: boolean
    visibleModalDelete: boolean,
    visibleModalCreOrUpd: boolean,
    isLoadingBtnDelete: boolean,
    isLoadingBtnCreOrUpd: boolean,
}

export const initDataStudentGraduate = {
    code: null,
    last_name: "",
    first_name: "",
    birthday: "",
    hometown: "",
    class: "",
    course: null,
    major: "",
    graduate_date: "",
    note: ""
}

export const errorStudentGraduate = {
    code: "",
    last_name: "",
    first_name: "",
    birthday: "",
    hometown: "",
    class: "",
    course: "",
    major: "",
    graduate_date: "",
    note: ""
}

export const initialState: StudentGraduateState = {
    studentGraduates: [],
    dataStudentGraduate: initDataStudentGraduate,
    errorStudentGraduate,
    dataFilter: {
        search: '',
        page: 1,
        perPage: 20,
        sortField: "created_at",
        sortOrder: "desc"
    },
    paginationListStudentGraduates: {
        currentPage: 1,
        perPage: 20,
        totalPage: 1,
        totalRecord: 0,
    },
    isLoadingTableStudentGraduates: false,
    isLoadingDownloadEx: false,
    visibleModalDelete: false,
    visibleModalCreOrUpd: false,
    isLoadingBtnDelete: false,
    isLoadingBtnCreOrUpd: false,
}

const studentGraduateSlice = createSlice({
    name: 'studentGraduate',
    initialState,
    reducers: {
        setDataFilter: (state, action) => ({
            ...state,
            dataFilter: action.payload
        }),

        setDataStudentGraduate: (state, action: PayloadAction<any>) => ({
            ...state,
            dataStudentGraduate: action.payload
        }),

        setErrorStudentGraduate: (state, action: PayloadAction<any>) => ({
            ...state,
            errorStudentGraduate: action.payload
        }),

        startRequestGetListStudentGraduates: (state) => ({
            ...state,
            isLoadingTableStudentGraduates: true
        }),
        requestGetListStudentGraduatesSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            isLoadingTableStudentGraduates: false,
            studentGraduates: action.payload.data.graduates,
            paginationListStudentGraduates: {
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page,
                totalRecord: action.payload.data.total,
                sortOrder: action.payload.data.sort_order,
                sortField: action.payload.data.sort_field
            }
        }),
        requestGetListStudentGraduatesFail: (state) => ({
            ...state,
            isLoadingTableStudentGraduates: false,
            studentGraduates: [],
            paginationList: {
                currentPage: 1,
                perPage: 20,
                totalPage: 1,
                totalRecord: 0,
            }
        }),

        startRequestCreateStudentGraduate: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: true
        }),
        requestCreateStudentGraduateSuccess: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: false,
            visibleModalCreOrUpd: false
        }),
        requestCreateStudentGraduateFail: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: false
        }),

        startRequestUpdateStudentGraduate: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: true
        }),
        requestUpdateStudentGraduateSuccess: (state) => ({
            ...state,
            isLoadingBtnCreOrUpd: false,
            visibleModalCreOrUpd: false
        }),
        requestUpdateStudentGraduateFail: (state) => ({
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

        setVisibleModalCreOrUpdStudentGraduate: (state, action) => ({
            ...state,
            visibleModalCreOrUpd: action.payload
        }),

        setVisibleModalDeleteStudentGraduate: (state, action) => ({
            ...state,
            visibleModalDelete: action.payload
        }),

        startRequestDeleteStudentGraduate: state => ({
            ...state,
            isLoadingBtnDelete: true
        }),
        requestDeleteStudentGraduateSuccess: (state) => ({
            ...state,
            isLoadingBtnDelete: false,
            visibleModalDelete: false
        }),
        requestDeleteStudentGraduateFail: (state) => ({
            ...state,
            isLoadingBtnDelete: false
        }),

    }
})

export const {
    setDataFilter,
    startRequestGetListStudentGraduates, requestGetListStudentGraduatesSuccess, requestGetListStudentGraduatesFail,
    startRequestDownloadEx, requestGetDownloadExSuccess, requestGetDownloadExFail,
    setVisibleModalDeleteStudentGraduate,
    setVisibleModalCreOrUpdStudentGraduate,
    startRequestCreateStudentGraduate, requestCreateStudentGraduateSuccess, requestCreateStudentGraduateFail,
    startRequestUpdateStudentGraduate, requestUpdateStudentGraduateSuccess, requestUpdateStudentGraduateFail,
    setErrorStudentGraduate,
    setDataStudentGraduate,
    startRequestDeleteStudentGraduate, requestDeleteStudentGraduateSuccess, requestDeleteStudentGraduateFail,
} = studentGraduateSlice.actions

export default studentGraduateSlice.reducer