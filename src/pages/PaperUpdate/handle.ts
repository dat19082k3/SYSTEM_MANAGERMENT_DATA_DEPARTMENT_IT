import {validate} from '@/utils/validates';
import _ from 'lodash';
import {setDataPaper, setErrorPapers} from "@/states/modules/paper";
import {postCreatePaper, putUpdatePaper} from "@/api/paper";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";

export default function Handle() {
    const dispatch = useAppDispatch();
    const dataPaper = useAppSelector((state) => state.paper.dataPaper);
    const errorPaper = useAppSelector((state) => state.paper.errorPaper);
    const isLoadingBtnUpdatePaper = useAppSelector((state) => state.paper.isLoadingBtnUpdate);

    const handleChangeInputInfo = (value: any, type: any) => {
        let data = _.cloneDeep(dataPaper);
        let dataError = _.cloneDeep(errorPaper);
        data[type] = value;
        dataError[type] = '';
        dispatch(setDataPaper(data));
        dispatch(setErrorPapers(dataError));
    };

    const handleSubmit = (scheme: any, dataPapers: any, isUpdate: Boolean) => {
        validate(scheme, dataPapers, {
            onSuccess: (data: any) => {
                isUpdate?
                    dispatch(putUpdatePaper(data.id, data)):
                    dispatch(postCreatePaper(data))
            },
            onError: (error) => dispatch(setErrorPapers(error)),
        });
    };


    return {
        dataPaper,
        errorPaper,
        isLoadingBtnUpdatePaper,
        handleChangeInputInfo,
        handleSubmit,
    };
}
