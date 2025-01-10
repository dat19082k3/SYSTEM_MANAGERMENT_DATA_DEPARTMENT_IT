import loadScienceSaga from "@/states/modules/science/saga.ts";
import loadIdeaSaga from "@/states/modules/idea/saga.ts";
import loadStudentGraduateSaga from "@/states/modules/graduates/saga.ts";
import loadFaculties from "@/states/modules/faculties/saga.ts";
import loadPaperSaga from "@/states/modules/paper/saga.ts";
import loadAuthSaga from "@/states/modules/auth/saga.ts";
import loadSeminarSaga from "@/states/modules/seminar/saga.ts";
import loadUserSaga from "@/states/modules/user/saga.ts";
import loadPermissionSaga from "@/states/modules/permissions/saga.ts";
import {Saga} from "redux-saga";

type RouteSagasType = {
    [key: string]: Saga; // Mỗi khóa là string, và giá trị là một saga.
};

export const ROUTE_SAGAS: RouteSagasType = {};
ROUTE_SAGAS['LOAD_SCIENCES_PAGE'] = loadScienceSaga
ROUTE_SAGAS['LOAD_IDEAS_PAGE'] = loadIdeaSaga
ROUTE_SAGAS['LOAD_STUDENT_GRADUATES_PAGE'] = loadStudentGraduateSaga
ROUTE_SAGAS['LOAD_FACULTIES_PAGE'] = loadFaculties
ROUTE_SAGAS['LOAD_PAPERS_PAGE'] = loadPaperSaga
ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga
ROUTE_SAGAS['LOAD_SEMINARS_PAGE'] = loadSeminarSaga
ROUTE_SAGAS['LOAD_MANAGEMENT_USER_PAGE'] = loadUserSaga
ROUTE_SAGAS['LOAD_PERMISSIONS_PAGE'] = loadPermissionSaga
