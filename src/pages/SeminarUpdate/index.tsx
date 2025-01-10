import MainLayout from "@/layouts/MainLayout";
import styles from "@/pages/SeminarUpdate/styles.module.scss";
import {Input, Select, InputNumber, Button, DatePicker, Divider} from "antd";
import {
    changeObjToOptions, SEMINAR_TYPE_OPTIONS
} from "@/utils/constaints.ts";
import Handle from "@/pages/SeminarUpdate/handle.ts";
import dayjs from 'dayjs';
import InlineSVG from "react-inlinesvg";
import IconWarning from '@/assets/images/icons/light/warning.svg';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "@/states/hooks.ts";
import {useEffect, useState} from "react";
import {getDetailsSeminar} from "@/api/seminar";
import {seminarSchema} from "@/pages/SeminarUpdate/schema.ts";
import {initErrorSeminar, setErrorSeminars} from "@/states/modules/seminar";


function SeminarUpdate() {
    const [isUpdate, setIsUpdate] = useState(false);
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const {
        dataSeminar,
        errorSeminar,
        isLoadingBtnUpdateSeminar,
        handleChangeInputInfo,
        handleSubmit,
    } = Handle();

    useEffect(() => {
        if (params.id) {
            dispatch(getDetailsSeminar(params.id));
            setIsUpdate(true);
        } else {
            setIsUpdate(false);
        }
    }, []);

    return (
        <MainLayout>
            <div className={styles.listWrap}>
                <div>
                    <Divider orientation="left" className="!text-lg !mt-0">
                        Cập nhật thông tin hội thảo
                    </Divider>
                </div>
                <div className={styles.mainContent}>
                    <div className={"flex-1 space-y-3"}>
                        <div className={"flex justify-between space-x-3"}>
                            <div className={"flex-auto"}>
                                <label className="text-sm font-semibold">
                                    Tên hội thảo
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataSeminar.name}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'name')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập tên hội thảo"}
                                />
                                {errorSeminar && errorSeminar.name && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorSeminar.name}
                                </span>
                                )}
                            </div>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">
                                    Ngày bắt đầu
                                    <span className={'required'}>*</span>
                                </label>
                                <DatePicker
                                    className={"main-datepicker w-full"}
                                    value={dataSeminar.start_date ? dayjs(dataSeminar.start_date) : null}
                                    onChange={(v) => {
                                        handleChangeInputInfo(v ? v.toDate() : dayjs(), 'start_date')
                                    }}
                                    size={"large"}
                                    format={{
                                        format: 'DD-MM-YYYY',
                                        type: 'mask'
                                    }}
                                    placeholder={"Nhập ngày bắt đầu"}
                                />
                                {errorSeminar && errorSeminar.start_date && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorSeminar.start_date}
                                </span>
                                )}
                            </div>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">Ngày kết thúc
                                    <span className={'required'}>*</span>
                                </label>
                                <DatePicker
                                    className={"main-datepicker w-full"}
                                    value={dataSeminar.end_date ? dayjs(dataSeminar.end_date) : null}
                                    onChange={(v) => {
                                        handleChangeInputInfo(v ? v.toDate() : dayjs(), 'end_date')
                                    }}
                                    size={"large"}
                                    format={{
                                        format: 'DD-MM-YYYY',
                                        type: 'mask'
                                    }}
                                    placeholder={"Nhập ngày kết thúc"}
                                />
                                {errorSeminar && errorSeminar.end_date && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorSeminar.end_date}
                                </span>
                                )}
                            </div>
                        </div>
                        <div className={"flex space-x-3"}>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">
                                    Tác giả
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataSeminar.authors}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'authors')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập tên các tác giả"}
                                />
                                {errorSeminar && errorSeminar.authors && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorSeminar.authors}
                                </span>
                                )}
                            </div>
                            <div>
                                <label className="text-sm font-semibold">
                                    Số đại biểu
                                    <span className={'required'}>*</span>
                                </label>
                                <InputNumber
                                    value={dataSeminar.delegates}
                                    onChange={(v) => handleChangeInputInfo(v, 'delegates')}
                                    size={"large"}
                                    className={"w-full main-input"}
                                    placeholder={"Nhập số lượng đại biểu"}
                                />
                                {errorSeminar && errorSeminar.delegates && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorSeminar.delegates}
                                </span>
                                )}
                            </div>
                        </div>
                        <div className={"flex space-x-3"}>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">
                                    Loại hội thảo
                                    <span className={'required'}>*</span>
                                </label>
                                <Select
                                    value={dataSeminar.type}
                                    onChange={(v: number) => handleChangeInputInfo(v, "type")}
                                    rootClassName={"w-full"}
                                    size={"large"}
                                    placeholder={"Chọn loại hội thảo"}
                                    options={changeObjToOptions(SEMINAR_TYPE_OPTIONS)}
                                />
                                {errorSeminar && errorSeminar.type && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorSeminar.type}
                                </span>
                                )}
                            </div>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">
                                    Địa điểm
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input w-full`}
                                    value={dataSeminar.place}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'place')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập tên các tác giả"}
                                />
                                {errorSeminar && errorSeminar.place && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorSeminar.place}
                                </span>
                                )}
                            </div>
                        </div>
                        <div className={"flex space-x-3"}>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">
                                    Đơn vị chủ trì
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataSeminar.unit_host}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'unit_host')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập tên đơn vị chủ trì"}
                                />
                                {errorSeminar && errorSeminar.unit_host && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorSeminar.unit_host}
                                </span>
                                )}
                            </div>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">
                                    Đơn vị phối hợp
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataSeminar.unit_partner}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'unit_partner')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập tên đơn vị phối hợp"}
                                />
                                {errorSeminar && errorSeminar.unit_partner && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorSeminar.unit_partner}
                                </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={"flex-1 space-y-3"}>
                        <div className={"flex space-x-3"}>
                            <div className={"flex-auto"}>
                                <label className="text-sm font-semibold">Link hội thảo
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataSeminar.url}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'url')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập link hội thảo"}
                                />
                                {errorSeminar && errorSeminar.url && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorSeminar.url}
                                </span>
                                )}
                            </div>

                            <div className={"flex-auto"}>
                                <label className="text-sm font-semibold">Người tạo
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataSeminar.creator}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'creator')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập tên người tạo"}
                                />
                                {errorSeminar && errorSeminar.creator && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorSeminar.creator}
                                </span>
                                )}
                            </div>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">Ngày tạo
                                </label>
                                <DatePicker
                                    className={"w-full main-datepicker"}
                                    size={"large"}
                                    value={dataSeminar.creation_date ? dayjs(dataSeminar.creation_date) : dataSeminar.creation_date}
                                    placeholder={"Chọn ngày tạo"}
                                    onChange={v => {
                                        handleChangeInputInfo(v ? v : null, "creation_date")
                                    }}
                                    disabled={true}
                                    format={{
                                        format: 'DD-MM-YYYY',
                                        type: 'mask'
                                    }}
                                />
                                {errorSeminar && errorSeminar.creation_date && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorSeminar.creation_date}
                                </span>
                                )}
                            </div>
                        </div>
                        <div className={"flex space-x-3"}>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">Trạng thái
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataSeminar.status}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'status')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập trạng thái"}
                                />
                                {errorSeminar && errorSeminar.status && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorSeminar.status}
                                </span>
                                )}
                            </div>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">Ghi chú</label>
                                <Input.TextArea
                                    size={"large"}
                                    rootClassName={`main-input`}
                                    value={dataSeminar.note}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'note')}
                                    count={{
                                        show: true,
                                        max: 1000,
                                    }}
                                    autoSize={{minRows: 1, maxRows: 5}}
                                    placeholder={"Nhập ghi chú"}
                                />
                                {errorSeminar && errorSeminar.note && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorSeminar.note}
                                </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.btnWrap}>
                    <Button
                        type={"default"}
                        size={"large"}
                        onClick={() => {
                            navigate('/seminars')
                            dispatch(setErrorSeminars(initErrorSeminar))
                        }}
                    >Hủy
                    </Button>
                    <Button
                        type={"primary"}
                        size={"large"}
                        onClick={() => handleSubmit(seminarSchema, dataSeminar, isUpdate)}
                        loading={isLoadingBtnUpdateSeminar}
                    >
                        {isUpdate ? "Cập nhật" : "Tạo mới"}
                    </Button>
                </div>
            </div>
        </MainLayout>
    )
}

export default SeminarUpdate