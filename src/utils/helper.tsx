import store from "../states/configureStore.ts";
import _ from "lodash";
import CloseIcon from '../assets/images/icons/light/close.svg';
import success from '../assets/images/icons/notification/success_16x16.svg';
import error from '../assets/images/icons/notification/error_16x16.svg';
import warning from '../assets/images/icons/notification/warning_16x16.svg';
import {notification} from "antd";
import {isValidateAccount} from "./validates/validateAccount.ts";
import {isValidateLogin} from "./validates/validateLogin.ts";
import {isValidateRsPass} from "@/utils/validates/validateRsPass.ts";

export type TypeNotification = {
    className?: string,
    icon?: any,
}

export const VALIDATE_EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9_.+-]{1,}@[a-z0-9]{1,}(\.[a-z0-9]{1,}){1,2}$/
export const VALIDATE_NAME_REGEX = /^[\p{L} ]*$/u;
export const VALIDATE_PASSWORD_REGEX = /^.{6,}$/
export const VALIDATE_PHONE_REGEX_RULE = /^(0[235789])[0-9]{8}$/
export const VALIDATE_URL_REGEX = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/
export const STRING_FORMAT_REGEX = /\$\s?|(,*)/g
export const NUMBER_FORMAT_REGEX = /\B(?=(\d{3})+(?!\d))/g

export const hasPermission = (permissions: Array<string>) => {
    let {auth} = store.getState();
    let isPermission = false;
    if (permissions) {
        permissions.forEach(permission => {
            if (
                auth.authUser &&
                auth.authUser.permissions &&
                (
                    auth.authUser.permissions.includes(permission) || auth.authUser.permissions.includes('supper_admin')
                )
            ) {
                isPermission = true
            }
        })
    }

    return isPermission;
}

// Validate
export const isValidEmail = (email: any) => {
    let result = false
    if (email && typeof email === 'string') {
        const regex = RegExp(VALIDATE_EMAIL_REGEX);
        result = regex.test(email.trim())
    }
    return result
}

export const isValidName = (name: any) => {
    let result = false
    if (name && typeof name === 'string') {
        const regex = RegExp(VALIDATE_NAME_REGEX);
        result = regex.test(name.trim())
    }
    return result
}


export const isValidPassword = (password: any) => {
    let result = false
    if (password && typeof password === 'string') {
        const regex = RegExp(VALIDATE_PASSWORD_REGEX);
        result = regex.test(password.trim())
    }
    return result
}

export const isValidPhone = (phone: any) => {
    let result = false

    if (phone && typeof phone === 'string') {
        let trimPhone = phone.trim()

        if (trimPhone) {
            const regexRule = RegExp(VALIDATE_PHONE_REGEX_RULE);

            let ruleMatchs = trimPhone.match(regexRule);

            if (ruleMatchs && ruleMatchs.length > 0) {
                result = (ruleMatchs[0] === trimPhone)
            }
        }
    }
    return result
}

export const handleCheckValidateConfirm = (data: any, errors: any, type = 'default') => {
    let error = false;
    let keys = Object.keys(data);
    let dataError = errors

    keys.map(key => {
        let validate: {
            error?: any,
            isError?: boolean
        } = {};
        switch (type) {
            case 'account':
                validate = isValidateAccount(data, key, dataError);
                break;
            case 'login':
                validate = isValidateLogin(data, key, dataError);
                break;
            case 'profile':
                validate = isValidateAccount(data, key, dataError, false);
                break;
            default:
                validate = isValidateRsPass(data, key, dataError);
        }
        dataError = validate.error;
        if (validate.isError) {
            error = true;
        }
    })

    return {
        isError: error,
        dataError: dataError
    }
}

const handleGetTypeNotification = (type: any) => {
    let typeNotification: TypeNotification;
    switch (type) {
        case "error":
            typeNotification = {
                className: 'notification-error',
                icon: error,
            }
            break;
        case "warning":
            typeNotification = {
                className: 'notification-warning',
                icon: warning,
            }
            break;
        default:
            typeNotification = {
                className: 'notification-success',
                icon: success,
            }
    }
    return typeNotification
}

export const getNotification = (type: string, content: string, duration = 3, align = 'top') => {
    let typeNotification = handleGetTypeNotification(type);
    (notification as any)[type]({
        message: '',
        description: (
            <div className={`notification-content ${typeNotification.className}`}>
                <div className={'icon-notification'}>
                    <img src={typeNotification.icon} alt=""/>
                </div>
                <span className={'text-notification'}>{content}</span>
            </div>
        ),
        closeIcon: (
            <img src={CloseIcon} alt=""/>
        ),
        placement: align,
        duration: duration,
        style: {fontWeight: "normal"}
    });
};

export const handleSetTimeOut = (func: any, delay = 1000, timeoutId: number | null = null): number => {
    let handleSetTimeOut;
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    handleSetTimeOut = setTimeout(func, delay) as unknown as number;

    return handleSetTimeOut;
}

export const convertQueryStringToObject = (queryString: string): any => {
    if (queryString.charAt(0) === '?') {
        queryString = queryString.substring(1);
    }

    const pairs = queryString.split('&');
    const result: any = {};

    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        const key = decodeURIComponent(pair[0]);
        const value = decodeURIComponent(pair[1] || '');

        if (Object.prototype.hasOwnProperty.call(result, key)) {
            if (!Array.isArray(result[key])) {
                result[key] = [result[key]];
            }

            result[key].push(value);
        } else {
            result[key] = value;
        }
    }

    return result;
}

export const formatMoney = (amount: number) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    return formatter.format(amount);
}

export const formatHour = (amount: any) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        maximumFractionDigits: 2
    });

    return `${formatter.format(amount)} giờ`;
}

export const getDynamicRoute = (path?: string): string | undefined => {
    const {location} = store.getState().app;
    const params = location?.params || {};

    let pathActive = path;
    if (_.isString(pathActive) && pathActive && !!pathActive.length) {
        if (pathActive.startsWith('/')) {
            pathActive = pathActive.substring(1);
        }
        const pathArray = pathActive.split('/');

        const newArray = pathArray.map((item: string): string => {
            if (item.startsWith(':')) {
                const pathWithoutColon = item.replace(/:/g, '');
                return params[pathWithoutColon];
            }
            return item;
        });
        let pathString = newArray.join('/');
        if (!pathString.startsWith('/')) {
            pathString = '/' + pathString;
        }

        return pathString;
    }
};

export const isRouteActive = (path: string) => {
    const {location} = store.getState().app;
    const currentPath = location.pathName;

    return getDynamicRoute(path) === currentPath;
};

export const handleCheckRoute = (routes: any) => {
    let isActive = false;

    const handleCheckArr = (index: any) => {
        if (index >= routes.length) return;

        if (isRouteActive(routes[index])) {
            isActive = true;
            return;
        } else {
            return handleCheckArr(++index);
        }
    };

    handleCheckArr(0);

    return isActive;
};

export const handleGetLastRecordFlowPage = (totalRecord: number, currentPage: number, perPage: number) => {
    let number = (currentPage - 1) * perPage + perPage;
    if (totalRecord <= number) {
        number = totalRecord;
    }
    return number;
}

export const handleGetTextSelectPage = (totalRecord: number, currentPage: number, perPage: number) => {
    let text = 'Hiển thị ';
    text += ((currentPage - 1) * perPage + 1) + ' - ';
    text += handleGetLastRecordFlowPage(totalRecord, currentPage, perPage) + ' trên tổng ';
    text += totalRecord + ' bản ghi';
    return text;
}