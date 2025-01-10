import {validate} from '@/utils/validates';
import _ from 'lodash';
import {setDataScience, setErrorSciences, setVisibleModalUpdateScience} from "@/states/modules/science";
import {postCreateScience, putUpdateScience} from "@/api/science";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";

export default function Handle() {
    const dispatch = useAppDispatch();
    const dataScience = useAppSelector((state) => state.science.dataScience);
    const errorScience = useAppSelector((state) => state.science.errorScience);
    const isLoadingBtnUpdateSciences = useAppSelector((state) => state.science.isLoadingBtnUpdate);

    const handleShowModalUpdateSciences = (value: any) => {
        dispatch(setVisibleModalUpdateScience(value));
    };

    const handleChangeInputInfo = (value: any, type: any) => {
        let data = _.cloneDeep(dataScience);
        let dataError = _.cloneDeep(errorScience);
        if (type === "start_date") {
            data.start_year = dayjs(value).year();
        }
        if (type === "end_date") {
            data.end_year = dayjs(value).year();
        }
        data[type] = value;
        dataError[type] = '';
        dispatch(setDataScience(data));
        dispatch(setErrorSciences(dataError));
    };

    const handleSubmit = (scheme: any, dataSciences: any,isUpdate:boolean) => {
        validate(scheme, dataSciences, {
            onSuccess: (data: any) => {
                isUpdate?
                dispatch(putUpdateScience(data.id, data)):
                    dispatch(postCreateScience(data))
            },
            onError: (error) => dispatch(setErrorSciences(error)),
        });
    };


    return {
        dataScience,
        errorScience,
        isLoadingBtnUpdateSciences,
        handleShowModalUpdateSciences,
        handleChangeInputInfo,
        handleSubmit,
    };
}
