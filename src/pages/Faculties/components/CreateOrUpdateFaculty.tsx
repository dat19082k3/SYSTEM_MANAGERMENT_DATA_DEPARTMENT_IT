import Handle from "@/pages/Faculties/handle.tsx";
import {Button, DatePicker, Input} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "@/assets/images/icons/light/warning.svg";
import {facultySchema} from "@/pages/Faculties/schema.ts";
import dayjs from "dayjs";

function CreateOrUpdateFaculty() {
    const {
        dataFaculty,
        errorFaculty,
        isLoadingBtnCreOrUpd,
        handleChangeInputInfo,
        handleConfirmCreOrUpd
    } = Handle()

    return (
        <div className={"flex-row space-y-4"}>
            <div className={"space-y-4"}>
                <div>
                    <label className="text-sm font-semibold">
                        Mã cán bộ
                        <span className={'required'}>*</span>
                    </label>
                    <Input
                        className={`main-input`}
                        value={dataFaculty.code}
                        onChange={(e) => handleChangeInputInfo(e.target.value, 'code')}
                        size={"large"}
                        count={{
                            show: true,
                            max: 255,
                        }}
                        placeholder={"Nhập mã cán bộ"}
                    />
                    {errorFaculty && errorFaculty.code && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorFaculty.code}
                                </span>
                    )}
                </div>
                <div className={"flex space-x-4"}>
                    <div className={"w-full"}>
                        <label className="text-sm font-semibold">
                            Họ đệm
                            <span className={'required'}>*</span>
                        </label>
                        <Input
                            className={`main-input`}
                            value={dataFaculty.last_name}
                            onChange={(e) => handleChangeInputInfo(e.target.value, 'last_name')}
                            size={"large"}
                            count={{
                                show: true,
                                max: 255,
                            }}
                            placeholder={"Nhập họ đệm"}
                        />
                        {errorFaculty && errorFaculty.last_name && (
                            <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                {errorFaculty.last_name}
                                </span>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-semibold">
                            Tên
                            <span className={'required'}>*</span>
                        </label>
                        <Input
                            className={`main-input`}
                            value={dataFaculty.first_name}
                            onChange={(e) => handleChangeInputInfo(e.target.value, 'first_name')}
                            size={"large"}
                            count={{
                                show: true,
                                max: 255,
                            }}
                            placeholder={"Nhập tên"}
                        />
                        {errorFaculty && errorFaculty.first_name && (
                            <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                {errorFaculty.first_name}
                                </span>
                        )}
                    </div>
                </div>
                <div className={"flex space-x-4"}>
                    <div className={"flex-1"}>
                        <label className="text-sm font-semibold">Ngày sinh
                            <span className={'required'}>*</span>
                        </label>
                        <DatePicker
                            className={"main-datepicker"}
                            value={dataFaculty.birthday?dayjs(dataFaculty.birthday):dataFaculty.birthday}
                            onChange={(v) => {
                                handleChangeInputInfo(v ? v.toDate() : dayjs(), 'birthday')
                            }}
                            size={"large"}
                            placeholder={"Nhập sinh nhật"}
                            format={{
                                format: 'DD-MM-YYYY',
                                type: 'mask'
                            }}
                            rootClassName={"w-full"}
                        />
                        {errorFaculty && errorFaculty.birthday && (
                            <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                {errorFaculty.birthday}
                                </span>
                        )}
                    </div>
                    <div className={"flex-1"}>
                        <label className="text-sm font-semibold">
                            Bộ môn
                            <span className={'required'}>*</span>
                        </label>
                        <Input
                            className={`main-input`}
                            value={dataFaculty.department}
                            onChange={(e) => handleChangeInputInfo(e.target.value, 'department')}
                            size={"large"}
                            count={{
                                show: true,
                                max: 255,
                            }}
                            placeholder={"Nhập bộ môn"}
                        />
                        {errorFaculty && errorFaculty.department && (
                            <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                {errorFaculty.department}
                                </span>
                        )}
                    </div>
                </div>
                <div>
                    <label className="text-sm font-semibold">
                        Quê quán
                        <span className={'required'}>*</span>
                    </label>
                    <Input
                        className={`main-input`}
                        value={dataFaculty.hometown}
                        onChange={(e) => handleChangeInputInfo(e.target.value, 'hometown')}
                        size={"large"}
                        count={{
                            show: true,
                            max: 255,
                        }}
                        placeholder={"Nhập quê quán"}
                    />
                    {errorFaculty && errorFaculty.hometown && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorFaculty.hometown}
                                </span>
                    )}
                </div>
                <div>
                    <label className="text-sm font-semibold">Ghi chú</label>
                    <Input.TextArea
                        rootClassName={`main-input`}
                        value={dataFaculty.note}
                        onChange={(e) => handleChangeInputInfo(e.target.value, 'note')}
                        size={"large"}
                        autoSize={{minRows: 3, maxRows: 4}}
                        count={{
                            show: true,
                            max: 1000,
                        }}
                        placeholder={"Nhập ghi chú"}
                    />
                    {errorFaculty && errorFaculty.note && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorFaculty.note}
                                </span>
                    )}
                </div>
            </div>
            <div className={"flex justify-end pt-3"}>
                <Button
                    type={"primary"}
                    size={"large"}
                    loading={isLoadingBtnCreOrUpd}
                    onClick={() => handleConfirmCreOrUpd(facultySchema, dataFaculty)}
                >{dataFaculty.id ? "Cập nhật" : "Thêm mới"}</Button>
            </div>
        </div>

    )
}

export default CreateOrUpdateFaculty