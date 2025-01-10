import {createBrowserRouter, Navigate} from "react-router-dom";
import {rootLoader} from "./rootLoader.ts";
import Sciences from "@/pages/Sciences";
import IdeaStudents from "@/pages/Ideas";
import SciencesUpdate from "@/pages/SciencesUpdate";
import Login from "@/pages/Auth/Login";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";
import User from "@/pages/Users";
import Papers from "@/pages/Paper";
import PaperUpdate from "@/pages/PaperUpdate";
import Seminars from "@/pages/Seminar";
import SeminarUpdate from "@/pages/SeminarUpdate";
import PermissionsManagement from "@/pages/PermissionManagement";
import StudentGraduateStudents from "@/pages/StudentGraduates";
import Faculties from "@/pages/Faculties";
import PageError from "@/components/Error";
import {PAGE_ERROR} from "@/utils/constaints.ts";

const route = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>,
        loader: ({request, params}) => rootLoader({request, params}, false, 'LOAD_AUTH_PAGE'),

    },
    {
        path: '/forgot-password',
        element: <ForgotPassword/>,
        loader: ({request, params}) => rootLoader({request, params}, false, 'LOAD_AUTH_PAGE'),
    },
    {
        path: '/reset-password',
        element: <ResetPassword/>,
        loader: ({request, params}) => rootLoader({request, params}, false, 'LOAD_AUTH_PAGE'),
    },
    {
        path: '/',
        element: <Navigate to={'/sciences'}/>,
    },
    {
        path: '/sciences',
        element: <Sciences/>,
        loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_SCIENCES_PAGE'),
    },
    {
        path: '/sciences/science',
        element: <SciencesUpdate/>,
        loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_SCIENCES_PAGE'),
    },
    {
        path: '/sciences/science/:id',
        element: <SciencesUpdate/>,
        loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_SCIENCES_PAGE'),
    },
    {
        path: '/idea',
        element: <IdeaStudents/>,
        loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_IDEAS_PAGE'),
    },
    {
        path: '/graduates',
        element: <StudentGraduateStudents/>,
        loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_STUDENT_GRADUATES_PAGE'),
    },
    {
        path: '/papers',
        element: <Papers/>,
        loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_PAPERS_PAGE'),
    },
    {
        path: '/papers/paper',
        element: <PaperUpdate/>,
        loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_PAPERS_PAGE'),
    },
    {
        path: '/papers/paper/:id',
        element: <PaperUpdate/>,
        loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_PAPERS_PAGE'),
    },
    {
        path: '/seminars',
        element: <Seminars/>,
        loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_SEMINARS_PAGE'),
    },
    {
        path: '/seminars/seminar',
        element: <SeminarUpdate/>,
        loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_SEMINARS_PAGE'),
    },
    {
        path: '/seminars/seminar/:id',
        element: <SeminarUpdate/>,
        loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_SEMINARS_PAGE'),
    },
    {
        path: '/faculties',
        element: <Faculties/>,
        loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_FACULTIES_PAGE'),
    },
    {
        path: '/management-users',
        element: <User/>,
        loader: ({request, params}) => rootLoader({request, params}, true, 'LOAD_MANAGEMENT_USER_PAGE'),
    },
    {
        path: '/permissions-management',
        element: <PermissionsManagement/>,
        loader: ({request, params}) =>
            rootLoader({request, params}, true, 'LOAD_PERMISSIONS_PAGE'),
    },
    {
        path: '/403',
        element: <PageError type={PAGE_ERROR.FORBIDDEN} title={'Bạn không có quyền truy cập!'} />,
        loader: ({ request, params }) => rootLoader({ request, params }, true, ''),
    },
    {
        path: '*',
        element: <PageError type={PAGE_ERROR.NOT_FOUND} title={'Trang bạn truy cập không tồn tại!'} />,
        loader: ({ request, params }) => rootLoader({ request, params }, true, ''),
    },
])

export default route