import Handle from "@/pages/Ideas/handle.tsx";
import {Button, Input} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "@/assets/images/icons/light/warning.svg";
import {ideaSchema} from "@/pages/Ideas/schema.ts";

function CreateOrUpdateIdea() {
    const {
        dataIdea,
        errorIdea,
        isLoadingBtnCreOrUpd,
        handleChangeInputInfo,
        handleConfirmCreOrUpd
    } = Handle()

    return (
        <div className={"flex-row space-y-3"}>
            <div className={"space-y-3"}>
                <div>
                    <label className="text-sm font-semibold">
                        Tên đề tài
                        <span className={'required'}>*</span>
                    </label>
                    <Input
                        className={`main-input`}
                        value={dataIdea.name}
                        onChange={(e) => handleChangeInputInfo(e.target.value, 'name')}
                        size={"large"}
                        count={{
                            show: true,
                            max: 255,
                        }}
                        placeholder={"Nhập tên đề tài"}
                    />
                    {errorIdea && errorIdea.name && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorIdea.name}
                                </span>
                    )}
                </div>
                <div>
                    <label className="text-sm font-semibold">
                        Thành viên nhóm
                        <span className={'required'}>*</span>
                    </label>
                    <Input
                        className={`main-input`}
                        value={dataIdea.group}
                        onChange={(e) => handleChangeInputInfo(e.target.value, 'group')}
                        size={"large"}
                        count={{
                            show: true,
                            max: 255,
                        }}
                        placeholder={"Nhập tên thành viên trong nhóm (VD: Nguyễn Văn A, Nguyễn Văn B)"}
                    />
                    {errorIdea && errorIdea.group && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorIdea.group}
                                </span>
                    )}
                </div>
                <div className={"flex space-x-4"}>
                    <div className={"flex-1"}>
                        <label className="text-sm font-semibold">
                            Lớp
                            <span className={'required'}>*</span>
                        </label>
                        <Input
                            className={`main-input`}
                            value={dataIdea.class}
                            onChange={(e) => handleChangeInputInfo(e.target.value, 'class')}
                            size={"large"}
                            count={{
                                show: true,
                                max: 255,
                            }}
                            placeholder={"Nhập Lớp"}
                        />
                        {errorIdea && errorIdea.class && (
                            <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                {errorIdea.class}
                                </span>
                        )}
                    </div>
                    <div className={"flex-1"}>
                        <label className="text-sm font-semibold">
                            Năm
                            <span className={'required'}>*</span>
                        </label>
                        <Input
                            className={`main-input`}
                            value={dataIdea.year}
                            onChange={(e) => handleChangeInputInfo(e.target.value, 'year')}
                            size={"large"}
                            count={{
                                show: true,
                                max: 255,
                            }}
                            placeholder={"Nhập năm"}
                        />
                        {errorIdea && errorIdea.year && (
                            <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                {errorIdea.year}
                                </span>
                        )}
                    </div>
                </div>
                <div>
                    <label className="text-sm font-semibold">
                        Giáo viên hướng dẫn
                        <span className={'required'}>*</span>
                    </label>
                    <Input
                        className={`main-input`}
                        value={dataIdea.guide}
                        onChange={(e) => handleChangeInputInfo(e.target.value, 'guide')}
                        size={"large"}
                        count={{
                            show: true,
                            max: 255,
                        }}
                        placeholder={"Nhập tên giáo viên hướng dẫn"}
                    />
                    {errorIdea && errorIdea.guide && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorIdea.guide}
                                </span>
                    )}
                </div>
                <div>
                    <label className="text-sm font-semibold">Ghi chú</label>
                    <Input.TextArea
                        rootClassName={`main-input`}
                        value={dataIdea.note}
                        onChange={(e) => handleChangeInputInfo(e.target.value, 'note')}
                        size={"large"}
                        autoSize={{minRows: 3, maxRows: 4}}
                        count={{
                            show: true,
                            max: 1000,
                        }}
                        placeholder={"Nhập ghi chú"}
                    />
                    {errorIdea && errorIdea.note && (
                        <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                            {errorIdea.note}
                                </span>
                    )}
                </div>
            </div>
            <div className={"flex justify-end pt-3"}>
                <Button
                    type={"primary"}
                    size={"large"}
                    loading={isLoadingBtnCreOrUpd}
                    onClick={() => handleConfirmCreOrUpd(ideaSchema, dataIdea)}
                >{dataIdea.id ? "Cập nhật" : "Thêm mới"}</Button>
            </div>
        </div>

    )
}

export default CreateOrUpdateIdea