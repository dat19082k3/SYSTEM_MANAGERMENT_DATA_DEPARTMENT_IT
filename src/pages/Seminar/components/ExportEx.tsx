import Joi from "joi";
import {useAppDispatch} from "@/states/hooks.ts";
import Handle from "@/pages/Seminar/handle.tsx";
import {Button, Select} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "@/assets/images/icons/light/warning.svg";
import {changeObjToOptions, SEMINAR_TYPE_OPTIONS} from "@/utils/constaints.ts";
import {setVisibleModalExSeminar} from "@/states/modules/seminar";

const exportExSchema = Joi.object({
    type: Joi.number().allow(null).label("Loại bài báo"),
})

function ExportEx() {
    const dispatch = useAppDispatch();
    const {
        dataExport,
        errorExport,
        handleChangeInputEx,
        isLoadingBtnEx,
        handleConfirmExportEx
    } = Handle();

    return (
        <div className={"flex-row space-y-4"}>
            <div className={"flex space-x-3"}>
                <div className={"flex-1"}>
                    <label className="text-sm font-semibold">Loại hội thảo
                    </label>
                    <Select
                        size={"large"}
                        className={"w-full"}
                        value={dataExport.type}
                        options={changeObjToOptions(SEMINAR_TYPE_OPTIONS)}
                        onChange={(v) => {
                            handleChangeInputEx(v, 'type')
                        }}
                        placeholder={"Chọn loại hội thảo"}
                    />
                    {errorExport && errorExport.type && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorExport.type}
                                </span>
                    )}
                </div>
            </div>
            <div className={"flex justify-end pt-3 space-x-3"}>
                <Button
                    size={"large"}
                    onClick={() => {
                        dispatch(setVisibleModalExSeminar(false))
                    }}
                >
                    Hủy
                </Button>
                <Button
                    type={"primary"}
                    size={"large"}
                    loading={isLoadingBtnEx}
                    onClick={() => handleConfirmExportEx(exportExSchema, dataExport)}
                >Chấp nhận</Button>
            </div>
        </div>

    )
}

export default ExportEx