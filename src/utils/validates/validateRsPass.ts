import {isValidPassword} from "../helper.tsx";
import _ from "lodash";

export const isValidateRsPass = (data: any, type: string, errors: any) => {
    let error = false
    let dataError = _.cloneDeep(errors);
    switch (type) {
        case 'password':
            if (data.password.length === 0) {
                dataError.password = 'Mật khẩu mới không được để trống.';
                error = true;
            } else if (!isValidPassword(data.password)) {
                dataError.password = "Mật khẩu phải bao gồm có ít nhất 6 ký tự"
                error = true
            } else {
                dataError.password = '';
            }
            break;
        case 'confirmPassword':
            if (data.confirmPassword.length === 0) {
                dataError.confirmPassword = 'Mật khẩu xác nhận không được để trống.';
                error = true;
            } else if (data.password && data.confirmPassword !== data.password) {
                dataError.confirmPassword = 'Mật khẩu không trùng khớp.'
                error = true
            } else {
                dataError.confirmPassword = '';
            }
            break;
    }

    return {
        isError: error,
        error: dataError,
    }
}
