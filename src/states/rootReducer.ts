import appReducer from './modules/app/index.ts'
import scienceReducer from './modules/science/index.ts'
import ideaReducer from './modules/idea/index.ts'
import studentGraduateReducer from '@/states/modules/graduates/index.ts'
import facultyReducer from './modules/faculties/index.ts'
import routingReducer from './modules/routing/index.ts'
import AuthReducer from './modules/auth/index.ts'
import ProfileReducer from './modules/profile/index.ts'
import UserReducer from './modules/user/index.ts'
import PaperReducer from './modules/paper/index.ts'
import SeminarReducer from './modules/seminar/index.ts'
import PermissionsReducer from '@/states/modules/permissions/index.ts'

const rootReducer = {
    app: appReducer,
    science: scienceReducer,
    idea: ideaReducer,
    studentGraduate: studentGraduateReducer,
    faculty: facultyReducer,
    routing: routingReducer,
    auth: AuthReducer,
    profile: ProfileReducer,
    user: UserReducer,
    paper: PaperReducer,
    seminar: SeminarReducer,
    permission: PermissionsReducer
}

export default rootReducer;