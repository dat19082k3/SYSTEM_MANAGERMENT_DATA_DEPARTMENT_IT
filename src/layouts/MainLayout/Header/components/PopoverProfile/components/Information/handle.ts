import {useEffect, useState} from "react";
import _ from "lodash";
import {handleCheckValidateConfirm} from "@/utils/helper.tsx";
import {setErrorInformation} from "@/states/modules/profile";
import {updateMyInformation} from "@/api/profile";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";

export default function Handle(p: { handleResetError: Function }) {
    const {handleResetError} = p
    const [dataInformation, setDataInformation] = useState<{
        id: number | null,
        name: string,
        email: string,
        phone: string,
    }>({
        id: null,
        name: '',
        email: '',
        phone: '',
    });

    const errorInformation = useAppSelector(state => state.profile.errorInformation);
    const isLoadingBtnInformation = useAppSelector(state => state.profile.isLoadingBtnInformation);
    const authUser = useAppSelector(state => state.auth.authUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (authUser) {
            setDataInformation({
                id: authUser.id ? authUser.id : null,
                name: authUser.name ? authUser.name : "",
                email: authUser.email ? authUser.email : "",
                phone: authUser.phone ? authUser.phone : "",
            })
        }
    }, [authUser])

    const handleChangeInput = <K extends keyof typeof dataInformation>(value: typeof dataInformation[K], type: K) => {
        let data = _.cloneDeep(dataInformation);
        data[type] = value
        setDataInformation(data)
    }

    const handleKeyDown = () => {
        handleResetError()
    }

    const handleConfirmUpdateInformation = () => {
        let validate = handleCheckValidateConfirm(dataInformation, errorInformation, 'profile');
        if (!validate.isError) {
            dispatch(updateMyInformation(dataInformation))
        } else {
            dispatch(setErrorInformation(validate.dataError))
        }
    }

    const handleCheckChangedData = () => {
        return _.isEqual(dataInformation, {
            id: authUser.id,
            name: authUser.name,
            email: authUser.email,
            phone: authUser.phone ? authUser.phone : ""
        });

    }

    return {
        dataInformation, errorInformation, isLoadingBtnInformation,
        handleChangeInput, handleConfirmUpdateInformation, handleKeyDown, handleCheckChangedData
    }
}
