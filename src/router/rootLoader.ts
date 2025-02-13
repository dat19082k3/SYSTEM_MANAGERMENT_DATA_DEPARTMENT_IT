import {redirect} from "react-router-dom";
import store from "../states/configureStore";
import {initialSaga} from "@/states/modules/routing";
import {convertQueryStringToObject, hasPermission} from "../utils/helper";
import {getMe} from "@/api/auth";
import {getAuthToken} from "../utils/localStorage";
import {setLocation} from "@/states/modules/app";

export const rootLoader = async ({request, params}: {
    request: any,
    params: any
}, requiredAuth: boolean, saga: string | null, permissions = []) => {
    const url = new URL(request.url);
    let {auth} = store.getState();

    const firstCondition = !auth.isAuthSuccess && getAuthToken();
    const secondCondition = url.pathname === '/profile';

    if (firstCondition || secondCondition) {
        await store.dispatch(getMe());
        auth = store.getState().auth;
    }

    if (requiredAuth) {
        if (auth.isAuthSuccess) {
            if (permissions.length > 0 && !hasPermission(permissions)) {
                return redirect('/403');
            }
        } else {
            return redirect('/login');
        }
    } else if (auth.isAuthSuccess) {
        return redirect('/sciences');
    }

    let query = {...(url.search ? convertQueryStringToObject(url.search) : {})};
    if (!query.token && url.pathname === '/reset-password') {
        return redirect('/sciences');
    }

    store.dispatch(setLocation({
        pathName: url.pathname,
        prevPathName: store.getState().app.location.pathName,
        params: {...params},
        query: query
    }))

    if (saga) {
        await store.dispatch(initialSaga(saga));
    }

    return null;
}
