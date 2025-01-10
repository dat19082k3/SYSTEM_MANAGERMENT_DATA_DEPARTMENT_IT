import MainLayout from "@/layouts/MainLayout";
import styles from "@/pages/PaperUpdate/styles.module.scss";
import {Input, Select, InputNumber, Button, DatePicker, Divider} from "antd";
import {
    changeObjToOptions, PAPER_TYPE_OPTIONS
} from "@/utils/constaints.ts";
import Handle from "@/pages/PaperUpdate/handle.ts";
import dayjs from 'dayjs';
import InlineSVG from "react-inlinesvg";
import IconWarning from '@/assets/images/icons/light/warning.svg';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "@/states/hooks.ts";
import {getDetailsPaper} from "@/api/paper";
import {paperSchema} from "@/pages/PaperUpdate/schema.ts";
import {useEffect, useState} from "react";
import {initDataPaper, setDataPaper} from "@/states/modules/paper";


function PaperUpdate() {
    const [isUpdate, setIsUpdate] = useState(false);
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const {
        dataPaper,
        errorPaper,
        isLoadingBtnUpdatePaper,
        handleChangeInputInfo,
        handleSubmit,
    } = Handle();

    useEffect(() => {
        if (params.id) {
            dispatch(getDetailsPaper(params.id));
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
                        Cập nhật thông tin bài báo
                    </Divider>
                </div>
                <div className={styles.mainContent}>
                    <div className={"flex-1 space-y-4"}>
                        <div className={"flex space-x-4"}>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">
                                    Tên bài báo
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataPaper.article_title}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'article_title')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập tên bài báo"}
                                />
                                {errorPaper && errorPaper.article_title && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorPaper.article_title}
                                </span>
                                )}
                            </div>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">
                                    Tên tạp chí
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataPaper.journal_name}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'journal_name')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập tên tạp chí"}
                                />
                                {errorPaper && errorPaper.journal_name && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorPaper.journal_name}
                                </span>
                                )}
                            </div>
                        </div>
                        <div className={"flex space-x-5"}>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">
                                    Đơn vị
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataPaper.unit}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'unit')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập đơn vị chủ trì"}
                                />
                                {errorPaper && errorPaper.unit && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorPaper.unit}
                                </span>
                                )}
                            </div>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">Lĩnh vực
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataPaper.field}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'field')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập lĩnh vực"}
                                />
                                {errorPaper && errorPaper.field && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorPaper.field}
                                </span>
                                )}
                            </div>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">Quốc gia
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataPaper.country}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'country')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập quốc gia"}
                                />
                                {errorPaper && errorPaper.country && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorPaper.country}
                                </span>
                                )}
                            </div>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">
                                    Loại bài báo
                                    <span className={'required'}>*</span>
                                </label>
                                <Select
                                    value={dataPaper.type}
                                    onChange={(v: number) => handleChangeInputInfo(v, "type")}
                                    rootClassName={"w-full"}
                                    size={"large"}
                                    placeholder={"Chọn loại bài báo"}
                                    options={changeObjToOptions(PAPER_TYPE_OPTIONS)}
                                />
                                {errorPaper && errorPaper.type && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorPaper.type}
                                </span>
                                )}
                            </div>
                        </div>
                        <div className={"flex space-x-5"}>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">
                                    Tác giả
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataPaper.authors}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'authors')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập tên các tác giả"}
                                />
                                {errorPaper && errorPaper.authors && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorPaper.authors}
                                </span>
                                )}
                            </div>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">
                                    Số lượng tác giả
                                    <span className={'required'}>*</span>
                                </label>
                                <InputNumber
                                    value={dataPaper.author_count}
                                    onChange={(v) => handleChangeInputInfo(v, 'author_count')}
                                    size={"large"}
                                    className={"w-full main-input"}
                                    placeholder={"Nhập số lượng tác giả"}
                                />
                                {errorPaper && errorPaper.author_count && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorPaper.author_count}
                                </span>
                                )}
                            </div>

                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">Tính giờ
                                    <span className={'required'}>*</span>
                                </label>
                                <InputNumber
                                    className={"w-full main-input"}
                                    size={"large"}
                                    value={dataPaper.hour}
                                    placeholder={"Nhập giờ"}
                                    onChange={v => {
                                        handleChangeInputInfo(v, "hour")
                                    }}
                                />
                                {errorPaper && errorPaper.hour && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorPaper.hour}
                                </span>
                                )}
                            </div>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">
                                    Năm xuất bản
                                    <span className={'required'}>*</span>
                                </label>
                                <DatePicker
                                    className={"w-full main-datepicker"}
                                    size={"large"}
                                    value={dataPaper.year ? dayjs(`${dataPaper.year}-01-01`) : dataPaper.year}
                                    picker={"year"}
                                    placeholder={"Chọn năm xuất bản"}
                                    onChange={v => {
                                        handleChangeInputInfo(v ? v.year() : null, "year")
                                    }}
                                    minDate={dayjs('2005-01-01')}
                                    maxDate={dayjs()}
                                />
                                {errorPaper && errorPaper.year && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorPaper.year}
                                </span>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className={"flex-1 space-y-4"}>
                        <div className={"flex space-x-5"}>
                            <div>
                                <label className="text-sm font-semibold">Trạng thái
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataPaper.status}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'status')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập trạng thái"}
                                />
                                {errorPaper && errorPaper.status && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorPaper.status}
                                </span>
                                )}
                            </div>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">Người tạo
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataPaper.creator}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'creator')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập tên người tạo"}
                                />
                                {errorPaper && errorPaper.creator && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorPaper.creator}
                                </span>
                                )}
                            </div>
                            <div className={"flex-wrap"}>
                                <label className="text-sm font-semibold">
                                    Ngày tạo
                                </label>
                                <DatePicker
                                    className={"main-datepicker w-full"}
                                    size={"large"}
                                    value={dataPaper.creation_date ? dayjs(dataPaper.creation_date) : dataPaper.creation_date}
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
                                {errorPaper && errorPaper.creation_date && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorPaper.creation_date}
                                </span>
                                )}
                            </div>
                        </div>
                        <div className={"flex space-x-4"}>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">Link bài báo
                                    <span className={'required'}>*</span>
                                </label>
                                <Input
                                    className={`main-input`}
                                    value={dataPaper.url}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'url')}
                                    size={"large"}
                                    count={{
                                        show: true,
                                        max: 255,
                                    }}
                                    placeholder={"Nhập url sản phẩm"}
                                />
                                {errorPaper && errorPaper.url && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorPaper.url}
                                </span>
                                )}
                            </div>
                            <div className={"flex-1"}>
                                <label className="text-sm font-semibold">Ghi chú</label>
                                <Input.TextArea
                                    size={"large"}
                                    rootClassName={`main-input`}
                                    value={dataPaper.note}
                                    onChange={(e) => handleChangeInputInfo(e.target.value, 'note')}
                                    count={{
                                        show: true,
                                        max: 1000,
                                    }}
                                    autoSize={{minRows: 1, maxRows: 5}}
                                    placeholder={"Nhập ghi chú"}
                                />
                                {errorPaper && errorPaper.note && (
                                    <span className={`flex text-red-50 items-center text-[13px] mt-[2px]`}>
                                    <InlineSVG src={IconWarning} width={13} height={13} className={"mr-[2px]"}/>
                                        {errorPaper.note}
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
                            navigate('/papers')
                            dispatch(setDataPaper(initDataPaper))
                        }}
                    >Hủy
                    </Button>
                    <Button
                        type={"primary"}
                        size={"large"}
                        onClick={() => handleSubmit(paperSchema, dataPaper,isUpdate)}
                        loading={isLoadingBtnUpdatePaper}
                    >{isUpdate ? "Cập nhật" : "Tạo mới"}
                    </Button>
                </div>
            </div>
        </MainLayout>
    )
}

export default PaperUpdate