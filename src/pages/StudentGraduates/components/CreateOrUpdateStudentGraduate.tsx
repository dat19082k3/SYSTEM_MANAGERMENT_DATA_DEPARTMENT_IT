import Handle from "@/pages/StudentGraduates/handle.tsx";
import {Button, DatePicker, Input} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "@/assets/images/icons/light/warning.svg";
import {ideaSchema} from "@/pages/StudentGraduates/schema.ts";
import dayjs from "dayjs";

function CreateOrUpdateStudentGraduate() {
    const {
        dataStudentGraduate,
        errorStudentGraduate,
        isLoadingBtnCreOrUpd,
        handleChangeInputInfo,
        handleConfirmCreOrUpd
    } = Handle()

    return (
        <div className={"flex-row space-y-4"}>
            <div className={"space-y-4"}>
                <div className={"flex space-x-4"}>
                    <div className={"w-80"}>
                        <label className="text-sm font-semibold">
                            Mã sinh viên
                            <span className={'required'}>*</span>
                        </label>
                        <Input
                            className={`main-input`}
                            value={dataStudentGraduate.code}
                            onChange={(e) => handleChangeInputInfo(e.target.value, 'code')}
                            size={"large"}
                            count={{
                                max: 255,
                            }}
                            placeholder={"Nhập mã sinh viên"}
                        />
                        {errorStudentGraduate && errorStudentGraduate.code && (
                            <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                {errorStudentGraduate.code}
                                </span>
                        )}
                    </div>
                    <div className={"flex-1"}>
                        <label className="text-sm font-semibold">
                            Khóa học
                            <span className={'required'}>*</span>
                        </label>
                        <Input
                            className={`main-input`}
                            value={dataStudentGraduate.course}
                            onChange={(e) => handleChangeInputInfo(e.target.value, 'course')}
                            size={"large"}
                            count={{
                                max: 255,
                            }}
                            placeholder={"Nhập khóa học"}
                        />
                        {errorStudentGraduate && errorStudentGraduate.course && (
                            <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                {errorStudentGraduate.course}
                                </span>
                        )}
                    </div>
                </div>
                <div className={"flex space-x-4"}>
                    <div className={"flex-auto"}>
                        <label className="text-sm font-semibold">
                            Họ đệm
                            <span className={'required'}>*</span>
                        </label>
                        <Input
                            className={`main-input`}
                            value={dataStudentGraduate.last_name}
                            onChange={(e) => handleChangeInputInfo(e.target.value, 'last_name')}
                            size={"large"}
                            count={{
                                max: 255,
                            }}
                            placeholder={"Nhập họ đệm"}
                        />
                        {errorStudentGraduate && errorStudentGraduate.last_name && (
                            <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                {errorStudentGraduate.last_name}
                                </span>
                        )}
                    </div>
                    <div className={"flex-1"}>
                        <label className="text-sm font-semibold">
                            Tên
                            <span className={'required'}>*</span>
                        </label>
                        <Input
                            className={`main-input`}
                            value={dataStudentGraduate.first_name}
                            onChange={(e) => handleChangeInputInfo(e.target.value, 'first_name')}
                            size={"large"}
                            count={{
                                max: 255,
                            }}
                            placeholder={"Nhập tên"}
                        />
                        {errorStudentGraduate && errorStudentGraduate.first_name && (
                            <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                {errorStudentGraduate.first_name}
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
                            value={dataStudentGraduate.birthday?dayjs(dataStudentGraduate.birthday):dataStudentGraduate.birthday}
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
                        {errorStudentGraduate && errorStudentGraduate.birthday && (
                            <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                {errorStudentGraduate.birthday}
                                </span>
                        )}
                    </div>
                    <div className={"flex-1"}>
                        <label className="text-sm font-semibold">
                            Lớp
                            <span className={'required'}>*</span>
                        </label>
                        <Input
                            className={`main-input`}
                            value={dataStudentGraduate.class}
                            onChange={(e) => handleChangeInputInfo(e.target.value, 'class')}
                            size={"large"}
                            count={{
                                max: 255,
                            }}
                            placeholder={"Nhập Lớp"}
                        />
                        {errorStudentGraduate && errorStudentGraduate.class && (
                            <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                {errorStudentGraduate.class}
                                </span>
                        )}
                    </div>
                    <div className={"flex-1"}>
                        <label className="text-sm font-semibold">
                            Năm tốt nghiệp
                            <span className={'required'}>*</span>
                        </label>
                        <Input
                            className={`main-input`}
                            value={dataStudentGraduate.graduate_date}
                            onChange={(e) => handleChangeInputInfo(e.target.value, 'graduate_date')}
                            size={"large"}
                            count={{
                                max: 255,
                            }}
                            placeholder={"Nhập tháng năm"}
                        />
                        {errorStudentGraduate && errorStudentGraduate.graduate_date && (
                            <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                {errorStudentGraduate.graduate_date}
                                </span>
                        )}
                    </div>
                </div>
                <div className={"flex space-x-4"}>
                    <div className={"flex-1"}>
                        <label className="text-sm font-semibold">
                            Chuyên ngành
                            <span className={'required'}>*</span>
                        </label>
                        <Input
                            className={`main-input`}
                            value={dataStudentGraduate.major}
                            onChange={(e) => handleChangeInputInfo(e.target.value, 'major')}
                            size={"large"}
                            count={{
                                max: 255,
                            }}
                            placeholder={"Nhập chuyên ngành"}
                        />
                        {errorStudentGraduate && errorStudentGraduate.major && (
                            <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                {errorStudentGraduate.major}
                                </span>
                        )}
                    </div>
                    <div className={"flex-1"}>
                        <label className="text-sm font-semibold">
                            Quê quán
                            <span className={'required'}>*</span>
                        </label>
                        <Input
                            className={`main-input`}
                            value={dataStudentGraduate.hometown}
                            onChange={(e) => handleChangeInputInfo(e.target.value, 'hometown')}
                            size={"large"}
                            count={{
                                show: true,
                                max: 255,
                            }}
                            placeholder={"Nhập quê quán"}
                        />
                        {errorStudentGraduate && errorStudentGraduate.hometown && (
                            <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                {errorStudentGraduate.hometown}
                                </span>
                        )}
                    </div>
                </div>
                <div>
                    <label className="text-sm font-semibold">Ghi chú</label>
                    <Input.TextArea
                        rootClassName={`main-input`}
                        value={dataStudentGraduate.note}
                        onChange={(e) => handleChangeInputInfo(e.target.value, 'note')}
                        size={"large"}
                        autoSize={{minRows: 3, maxRows: 4}}
                        count={{
                            show: true,
                            max: 1000,
                        }}
                        placeholder={"Nhập ghi chú"}
                    />
                    {errorStudentGraduate && errorStudentGraduate.note && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorStudentGraduate.note}
                                </span>
                    )}
                </div>
            </div>
            <div className={"flex justify-end pt-3"}>
                <Button
                    type={"primary"}
                    size={"large"}
                    loading={isLoadingBtnCreOrUpd}
                    onClick={() => handleConfirmCreOrUpd(ideaSchema, dataStudentGraduate)}
                >{dataStudentGraduate.id ? "Cập nhật" : "Thêm mới"}</Button>
            </div>
        </div>

    )
}

export default CreateOrUpdateStudentGraduate