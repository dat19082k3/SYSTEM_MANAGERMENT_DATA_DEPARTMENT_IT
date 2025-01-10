import Joi from "joi";
import {useAppDispatch} from "@/states/hooks.ts";
import Handle from "@/pages/Paper/handle.tsx";
import {Button, DatePicker, Select} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "@/assets/images/icons/light/warning.svg";
import dayjs from "dayjs";
import {changeObjToOptions, PAPER_TYPE_OPTIONS} from "@/utils/constaints.ts";
import {setVisibleModalExPaper} from "@/states/modules/paper";

const exportExSchema = Joi.object({
    type: Joi.number().allow(null).label("Loại bài báo"),
    year: Joi.number().allow(null).label("Năm")
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
                    <label className="text-sm font-semibold">Loại bài báo
                    </label>
                    <Select
                        size={"large"}
                        className={"w-full"}
                        value={dataExport.type}
                        options={changeObjToOptions(PAPER_TYPE_OPTIONS)}
                        onChange={(v) => {
                            handleChangeInputEx(v, 'type')
                        }}
                        placeholder={"Chọn loại bài báo"}
                    />
                    {errorExport && errorExport.type && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorExport.type}
                                </span>
                    )}
                </div>
                <div>
                    <label className="text-sm font-semibold">Năm xuất bản
                    </label>
                    <DatePicker
                        className={"main-datepicker w-full"}
                        size={"large"}
                        value={dataExport.year ? dayjs(`${dataExport.year}-01-01`) : dataExport.year}
                        picker={"year"}
                        placeholder={"Chọn năm xuất bản"}
                        onChange={(v) => {
                            handleChangeInputEx(v && dayjs.isDayjs(v) ? v?.year() : null, "year")
                        }}
                        minDate={dayjs('2005-01-01')}
                        maxDate={dayjs()}
                    />
                    {errorExport && errorExport.year && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorExport.year}
                                </span>
                    )}
                </div>
            </div>
            <div className={"flex justify-end pt-3 space-x-3"}>
                <Button
                    size={"large"}
                    onClick={() => {
                        dispatch(setVisibleModalExPaper(false))
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