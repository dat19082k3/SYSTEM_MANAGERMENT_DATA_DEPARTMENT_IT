import Joi from "joi";
import {useAppDispatch} from "@/states/hooks.ts";
import Handle from "@/pages/Sciences/handle.tsx";
import {Button, DatePicker, Select} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "@/assets/images/icons/light/warning.svg";
import {
    changeObjToOptions,
    MANAGER_OPTIONS_LEVEL, OPTION_SELECT_STATUS, TOPIC_OPTIONS_TYPE
} from "@/utils/constaints.ts";
import {setVisibleModalExScience} from "@/states/modules/science";
import dayjs from "dayjs";

const exportExSchema = Joi.object({
    level: Joi.number().allow(null).label("cấp quán lý"),
    type: Joi.number().allow(null).label("loại đề tài"),
    status: Joi.number().allow(null).label("trạng thái"),
    start_year: Joi.number().allow(null).label("năm bắt đầu")
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
            <div>
                <label className="text-sm font-semibold">Cấp quản lý
                </label>
                <Select
                    size={"large"}
                    className={"w-full"}
                    value={dataExport.level}
                    options={changeObjToOptions(MANAGER_OPTIONS_LEVEL)}
                    onChange={(v) => {
                        handleChangeInputEx(v, 'level')
                    }}
                    placeholder={"Chọn cấp đề tài"}
                />
                {errorExport && errorExport.level && (
                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                        {errorExport.level}
                                </span>
                )}
            </div>
            <div>
                <label className="text-sm font-semibold">Loại đề tài
                </label>
                <Select
                    size={"large"}
                    className={"w-full"}
                    value={dataExport.type}
                    options={changeObjToOptions(TOPIC_OPTIONS_TYPE)}
                    onChange={(v) => {
                        handleChangeInputEx(v, 'type')
                    }}
                    placeholder={"Chọn loại đề tài"}
                />
                {errorExport && errorExport.type && (
                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                        {errorExport.type}
                                </span>
                )}
            </div>
            <div className={"flex space-x-3"}>
                <div className={"flex-1"}>
                    <label className="text-sm font-semibold">Trạng thái đề tài
                    </label>
                    <Select
                        size={"large"}
                        className={"w-full"}
                        value={dataExport.status}
                        options={OPTION_SELECT_STATUS}
                        onChange={(v) => {
                            handleChangeInputEx(v, 'status')
                        }}
                        placeholder={"Chọn trạng thái đề tài"}
                    />
                    {errorExport && errorExport.status && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorExport.status}
                                </span>
                    )}
                </div>
                <div>
                    <label className="text-sm font-semibold">Năm bắt đầu
                    </label>
                    <DatePicker
                        className={"main-datepicker w-full"}
                        size={"large"}
                        value={dataExport.start_year ? dayjs(`${dataExport.start_year}-01-01`) : dataExport.start_year}
                        picker={"year"}
                        placeholder={"Chọn năm bắt đầu"}
                        onChange={(v) => {
                            handleChangeInputEx(v && dayjs.isDayjs(v) ? v?.year() : null, "start_year")
                        }}
                        minDate={dayjs('2005-01-01')}
                        maxDate={dayjs()}
                    />
                    {errorExport && errorExport.start_year && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorExport.start_year}
                                </span>
                    )}
                </div>
            </div>
            <div className={"flex justify-end pt-3 space-x-3"}>
                <Button
                    size={"large"}
                    onClick={() => {
                        dispatch(setVisibleModalExScience(false))
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