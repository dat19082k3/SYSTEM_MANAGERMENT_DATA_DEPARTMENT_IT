import axios, {ResponseType} from "axios";
import {isFunction} from 'lodash';
import {getAuthToken, removeAuthToken} from "../utils/localStorage";
import {goToPage} from "@/states/modules/app";
import {AppDispatch, RootState} from "@/states/configureStore.ts";

export default async function callApi({
                                          method,
                                          apiPath,
                                          actionTypes: [requestType, successType, failureType],
                                          variables,
                                          dispatch,
                                          getState,
                                          headers,
                                          responseType
                                      }: {
    method: string,
    apiPath: string,
    actionTypes: Array<any>,
    variables: any,
    dispatch: AppDispatch,
    getState: RootState,
    headers?: any,
    responseType?: ResponseType
}) {
    if (!isFunction(dispatch) || !isFunction(getState)) {
        throw new Error('callGraphQLApi requires dispatch and getState functions');
    }

    const baseUrlApi = import.meta.env.VITE_API_URL;
    const token = getAuthToken();
    const header = {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
    };
    dispatch(requestType())
    return axios({
        baseURL: baseUrlApi,
        headers: headers ? {...header, ...headers} : header,
        method: method,
        url: apiPath,
        data: variables,
        params: method === 'get' ? variables : '',
        responseType: responseType
    })
        .then(function (response) {
            dispatch(successType(response.data))
            return response.data;
        })
        .catch((error) => {
            let response = error.response ? error.response : error;
            dispatch(failureType(error.response));
            if (response.status === 401) {
                removeAuthToken()
                dispatch(goToPage({path: '/login'}));
            } else if (response.status === 403) {
                dispatch(goToPage({path: '/403'}));
            }
            return response
        })
}
