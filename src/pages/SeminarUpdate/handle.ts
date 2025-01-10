import {validate} from '@/utils/validates';
import _ from 'lodash';
import {useDispatch} from 'react-redux';
import {setDataSeminar, setErrorSeminars} from "@/states/modules/seminar";
import {postCreateSeminar, putUpdateSeminar} from "@/api/seminar";
import {useAppSelector} from "@/states/hooks.ts";

export default function Handle() {
    const dispatch = useDispatch();
    const dataSeminar = useAppSelector((state) => state.seminar.dataSeminar);
    const errorSeminar = useAppSelector((state) => state.seminar.errorSeminar);
    const isLoadingBtnUpdateSeminar = useAppSelector((state) => state.seminar.isLoadingBtnUpdate);

    const handleChangeInputInfo = (value: any, type: any) => {
        let data = _.cloneDeep(dataSeminar);
        let dataError = _.cloneDeep(errorSeminar);
        data[type] = value;
        dataError[type] = '';
        dispatch(setDataSeminar(data));
        dispatch(setErrorSeminars(dataError));
    };

    const handleSubmit = (scheme: any, dataSeminars: any, isUpdate: Boolean) => {
        validate(scheme, dataSeminars, {
            onSuccess: (data: any) => {
                isUpdate ?
                    dispatch(putUpdateSeminar(data.id, data)) :
                    dispatch(postCreateSeminar(data))
            },
            onError: (error) => dispatch(setErrorSeminars(error)),
        });
    };


    return {
        dataSeminar,
        errorSeminar,
        isLoadingBtnUpdateSeminar,
        handleChangeInputInfo,
        handleSubmit,
    };
}
