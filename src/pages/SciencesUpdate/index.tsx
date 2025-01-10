import MainLayout from "@/layouts/MainLayout";
import styles from "@/pages/SciencesUpdate/styles.module.scss";
import {
    Input,
    Divider,
    DatePicker,
    Select,
    InputNumber,
    Button,
} from "antd";
import {
    changeObjToOptions, MANAGER_OPTIONS_LEVEL,
    OPTION_SELECT_PRODUCT_TYPE,
    OPTION_SELECT_STATUS,
    OPTIONS_SOURCE, TOPIC_OPTIONS_TYPE,
} from "@/utils/constaints.ts";
import Handle from "@/pages/SciencesUpdate/handle.ts";
import dayjs from "dayjs";
import {scienceSchema} from "@/pages/SciencesUpdate/schema.ts";
import InlineSVG from "react-inlinesvg";
import IconWarning from "@/assets/images/icons/light/warning.svg";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "@/states/hooks.ts";
import {useEffect, useState} from "react";
import {NUMBER_FORMAT_REGEX, STRING_FORMAT_REGEX} from "@/utils/helper.tsx";
import {getDetailsScience} from "@/api/science";
import {initDataScience, initErrorScience, setDataScience, setErrorSciences} from "@/states/modules/science";

function SciencesUpdate() {
    const [isUpdate, setIsUpdate] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        dataScience,
        errorScience,
        handleChangeInputInfo,
        isLoadingBtnUpdateSciences,
        handleSubmit,
    } = Handle();

    useEffect(() => {
        if (params.id) {
            dispatch(getDetailsScience(params.id));
            setIsUpdate(true);
        } else {
            setIsUpdate(false);
        }
    }, []);

    return (
        <MainLayout>
            <div className={styles.listWrap}>
                <Divider orientation="left" className="!text-lg !mt-0">
                    Cập nhật thông tin đề tài
                </Divider>

                <div className={styles.mainContent}>
                    <div className={"flex space-x-3"}>
                        <div className={"w-full"}>
                            <label className="text-sm font-semibold">
                                Mã đề tài
                                <span className={"required"}>*</span>
                            </label>
                            <Input
                                className={`main-input`}
                                value={dataScience.code}
                                onChange={(e) => handleChangeInputInfo(e.target.value, "code")}
                                size={"large"}
                                rootClassName={"main-input"}
                                count={{
                                    max: 255,
                                }}
                                placeholder={"Nhập mã đề tài"}
                            />
                            {errorScience && errorScience.code && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.code}
                </span>
                            )}
                        </div>

                        <div className="w-full">
                            <label className="text-sm font-semibold">
                                Tên đề tài
                                <span className={"required"}>*</span>
                            </label>
                            <Input
                                className={`main-input`}
                                value={dataScience.name}
                                onChange={(e) => handleChangeInputInfo(e.target.value, "name")}
                                size={"large"}
                                rootClassName={"main-input"}
                                count={{
                                    max: 255,
                                }}
                                placeholder={"Nhập tên đề tài"}
                            />
                            {errorScience && errorScience.name && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.name}
                </span>
                            )}
                        </div>
                    </div>

                    <div className={"flex space-x-3"}>
                        <div className={"w-full"}>
                            <label className="text-sm font-semibold">Cấp quản lý
                                <span className={"required"}>*</span>
                            </label>
                            <Select
                                value={dataScience.level}
                                onChange={(v) => handleChangeInputInfo(v, "level")}
                                rootClassName={"w-full"}
                                size={"large"}
                                placeholder={"Chọn trạng thái đề tài"}
                                options={changeObjToOptions(MANAGER_OPTIONS_LEVEL)}
                            />
                            {errorScience && errorScience.level && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.level}
                </span>
                            )}
                        </div>
                        <div className={"w-full"}>
                            <label className="text-sm font-semibold">Loại đề tài
                                <span className={"required"}>*</span>
                            </label>
                            <Select
                                value={dataScience.type}
                                onChange={(v) => handleChangeInputInfo(v, "type")}
                                rootClassName={"w-full"}
                                size={"large"}
                                placeholder={"Chọn trạng thái đề tài"}
                                options={changeObjToOptions(TOPIC_OPTIONS_TYPE)}
                            />
                            {errorScience && errorScience.type && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.type}
                </span>
                            )}
                        </div>
                    </div>

                    <div className={"flex space-x-3"}>
                        <div className={"w-full"}>
                            <label className="text-sm font-semibold">
                                Người chủ nhiệm
                                <span className={"required"}>*</span>
                            </label>
                            <Input
                                className={`main-input`}
                                value={dataScience.leader}
                                onChange={(e) =>
                                    handleChangeInputInfo(e.target.value, "leader")
                                }
                                size={"large"}
                                rootClassName={"main-input"}
                                count={{
                                    max: 255,
                                }}
                                placeholder={"Nhập tên người chủ nhiệm"}
                            />
                            {errorScience && errorScience.leader && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.leader}
                </span>
                            )}
                        </div>

                        <div className={"w-full"}>
                            <label className="text-sm font-semibold">
                                Số người còn lại
                                <span className={"required"}>*</span>
                            </label>
                            <InputNumber
                                className={"w-full main-input"}
                                value={dataScience.member_count}
                                rootClassName={"main-input"}
                                onChange={(e) => handleChangeInputInfo(e, "member_count")}
                                size={"large"}
                                placeholder={"Nhập số lượng thành viên"}
                            />
                            {errorScience && errorScience.member_count && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.member_count}
                </span>
                            )}
                        </div>

                        <div className={"w-full"}>
                            <label className="text-sm font-semibold">
                                Đơn vị chủ trì
                                <span className={"required"}>*</span>
                            </label>
                            <Input
                                className={`main-input`}
                                value={dataScience.unit}
                                onChange={(e) => handleChangeInputInfo(e.target.value, "unit")}
                                rootClassName={"main-input"}
                                size={"large"}
                                count={{
                                    max: 255,
                                }}
                                placeholder={"Nhập đợn vị chủ trì"}
                            />
                            {errorScience && errorScience.unit && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.unit}
                </span>
                            )}
                        </div>
                    </div>

                    <div className={"flex space-x-3"}>
                        <div className={"w-full"}>
                            <label className="text-sm font-semibold">Kinh phí
                                <span className={"required"}>*</span>
                            </label>
                            <InputNumber
                                value={dataScience.budget}
                                onChange={(v) => handleChangeInputInfo(v, "budget")}
                                rootClassName={"w-full main-input"}
                                size={"large"}
                                formatter={(value) =>
                                    `${value}`.replace(NUMBER_FORMAT_REGEX, ",")
                                }
                                parser={(value) =>
                                    value?.replace(STRING_FORMAT_REGEX, "") as unknown as number
                                }
                                placeholder={"Nhập kinh phí"}
                            />
                            {errorScience && errorScience.budget && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.budget}
                </span>
                            )}
                        </div>

                        <div className={"w-full"}>
                            <label className="text-sm font-semibold">Kinh phí khác
                                <span className={"required"}>*</span>
                            </label>
                            <InputNumber
                                value={dataScience.budget_other}
                                onChange={(v) => handleChangeInputInfo(v, "budget_other")}
                                rootClassName={"w-full main-input"}
                                size={"large"}
                                formatter={(value) =>
                                    `${value}`.replace(NUMBER_FORMAT_REGEX, ",")
                                }
                                parser={(value) =>
                                    value?.replace(STRING_FORMAT_REGEX, "") as unknown as number
                                }
                                placeholder={"Nhập kinh phí"}
                            />
                            {errorScience && errorScience.budget_other && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.budget_other}
                </span>
                            )}
                        </div>

                        <div className={"w-full"}>
                            <label className="text-sm font-semibold">Tổng tiền</label>
                            <InputNumber
                                value={dataScience.total}
                                onChange={(v) => handleChangeInputInfo(v, "total")}
                                rootClassName={"w-full main-input"}
                                disabled={true}
                                size={"large"}
                                formatter={(value) =>
                                    `${value}`.replace(NUMBER_FORMAT_REGEX, ",")
                                }
                                parser={(value) =>
                                    value?.replace(STRING_FORMAT_REGEX, "") as unknown as number
                                }
                                placeholder={"Nhập kinh phí"}
                            />
                            {errorScience && errorScience.total && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.total}
                </span>
                            )}
                        </div>
                    </div>

                    <div className={"flex space-x-3"}>
                        <div className="w-full">
                            <label className="text-sm font-semibold">Loại sản phẩm
                                <span className={"required"}>*</span>
                            </label>
                            <Select
                                mode={"multiple"}
                                value={dataScience.product_type}
                                onChange={(v) => {
                                    handleChangeInputInfo(
                                        v.length > 0 ? v : null,
                                        "product_type"
                                    );
                                }}
                                rootClassName={"w-full"}
                                size={"large"}
                                placeholder={"Chọn loại sản phẩm"}
                                options={OPTION_SELECT_PRODUCT_TYPE}
                                maxCount={3}
                            />
                            {errorScience && errorScience.product_type && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.product_type}
                </span>
                            )}
                        </div>

                        <div className="w-full">
                            <label className="text-sm font-semibold">URL sản phẩm</label>
                            <Input
                                className={`main-input`}
                                value={dataScience.product_url}
                                onChange={(e) =>
                                    handleChangeInputInfo(e.target.value, "product_url")
                                }
                                size={"large"}
                                rootClassName={"w-full main-input"}
                                count={{
                                    max: 255,
                                }}
                                placeholder={"Nhập url sản phẩm"}
                            />
                            {errorScience && errorScience.product_url && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.product_url}
                </span>
                            )}
                        </div>
                    </div>

                    <div className={"flex space-x-3"}>
                        <div className={"w-full"}>
                            <label className="text-sm font-semibold">Ngày bắt đầu
                                <span className={"required"}>*</span>
                            </label>
                            <DatePicker
                                className={"main-datepicker"}
                                value={dataScience.start_date ? dayjs(dataScience.start_date) : null}
                                onChange={(v) => {
                                    handleChangeInputInfo(v ? v.toDate() : dayjs(), "start_date");
                                }}
                                size={"large"}
                                placeholder={"Nhập ngày bắt đầu"}
                                format={{
                                    format: "DD-MM-YYYY",
                                    type: "mask",
                                }}
                                rootClassName={"w-full"}
                            />
                            {errorScience && errorScience.start_date && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.start_date}
                </span>
                            )}
                        </div>

                        <div className={"w-full"}>
                            <label className="text-sm font-semibold">Ngày kết thúc
                                <span className={"required"}>*</span>
                            </label>
                            <DatePicker
                                className={"main-datepicker"}
                                value={dataScience.end_date ? dayjs(dataScience.end_date) : null}
                                onChange={(v) => {
                                    handleChangeInputInfo(v ? v.toDate() : dayjs(), "end_date");
                                }}
                                size={"large"}
                                placeholder={"Nhập ngày kết thúc"}
                                format={{
                                    format: "DD-MM-YYYY",
                                    type: "mask",
                                }}
                                rootClassName={"w-full"}
                            />
                            {errorScience && errorScience.end_date && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.end_date}
                </span>
                            )}
                        </div>

                        <div className={"w-full"}>
                            <label className="text-sm font-semibold">Trạng thái đề tài
                                <span className={"required"}>*</span>
                            </label>
                            <Select
                                value={dataScience.status}
                                onChange={(v) => handleChangeInputInfo(v, "status")}
                                rootClassName={"w-full"}
                                size={"large"}
                                placeholder={"Chọn trạng thái đề tài"}
                                options={OPTION_SELECT_STATUS}
                            />
                            {errorScience && errorScience.status && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.status}
                </span>
                            )}
                        </div>
                    </div>

                    <div className={"flex space-x-3"}>
                        <div className={"w-full"}>
                            <label className="text-sm font-semibold">
                                Tên nguồn kinh phí
                                <span className={"required"}>*</span>
                            </label>
                            <Select
                                mode="tags"
                                size={"large"}
                                value={dataScience.source}
                                style={{width: "100%"}}
                                onChange={(v) => {
                                    handleChangeInputInfo(v, "source");
                                }}
                                placeholder={"Nhập tên nguồn"}
                                tokenSeparators={[","]}
                                options={OPTIONS_SOURCE}
                            />
                            {errorScience && errorScience.source && (
                                <span className={`flex text-red-50 items-center space-x-3 !text-[13px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.source}
                </span>
                            )}
                        </div>
                        <div className="w-full">
                            <label className="text-sm font-semibold">Ghi chú</label>
                            <Input.TextArea
                                size={"large"}
                                value={dataScience.note}
                                onChange={(e) => handleChangeInputInfo(e.target.value, "note")}
                                rootClassName={"main-input"}
                                count={{
                                    show: true,
                                    max: 1000,
                                }}
                                autoSize={{minRows: 1, maxRows: 5}}
                                placeholder={"Nhập ghi chú"}
                            />
                            {errorScience && errorScience.note && (
                                <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                  <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                    {errorScience.note}
                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.btnWrap}>
                    <Button
                        type={"default"}
                        size={"large"}
                        onClick={() => {
                            navigate("/sciences");
                            dispatch(setDataScience(initDataScience))
                            dispatch(setErrorSciences(initErrorScience))
                        }}
                    >
                        Hủy
                    </Button>
                    <Button
                        type={"primary"}
                        size={"large"}
                        onClick={() => handleSubmit(scienceSchema, dataScience, isUpdate)}
                        loading={isLoadingBtnUpdateSciences}
                    >
                        {isUpdate ? "Cập nhật" : "Tạo mới"}
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
}

export default SciencesUpdate;
