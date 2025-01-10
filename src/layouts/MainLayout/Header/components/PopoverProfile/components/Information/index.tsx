import {Button, Input} from "antd";
import InlineSVG from "react-inlinesvg";
import IconWarning from "../../../../../../../assets/images/icons/light/warning.svg";
import Handle from "./handle.ts";

export default function Information({handleResetError}: { handleResetError: any }) {
    const {
        dataInformation, errorInformation, isLoadingBtnInformation,
        handleChangeInput, handleConfirmUpdateInformation, handleKeyDown, handleCheckChangedData
    } = Handle({handleResetError});
    return (
        <div>
            <div className={`input-wrap`}>
                <div className={'label-wrap'}>
                    Họ tên <span className={'required'}>*</span>
                </div>
                <Input
                    className={`main-input ${errorInformation && errorInformation.name.length > 0 ? 'error-input' : ''}`}
                    placeholder={'Nhập họ tên'}
                    value={dataInformation.name}
                    onChange={(e) => handleChangeInput(e.target.value, 'name')}
                    onKeyDown={() => handleKeyDown()}
                />
                {
                    errorInformation && errorInformation.name.length > 0 ?
                        <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="14"/>
            </div>
                            {errorInformation.name}
          </span> : ''
                }
            </div>
            <div className={`input-wrap`}>
                <div className={'label-wrap'}>Địa chỉ gmail <span className={'required'}>*</span></div>
                <Input
                    className={`main-input`}
                    placeholder={'Nhập số diện thoại'}
                    value={dataInformation.email}
                    onChange={(e) => handleChangeInput(e.target.value, 'email')}
                    onKeyDown={() => handleKeyDown()}
                />
                {
                    errorInformation && errorInformation.email?.length > 0 ?
                        <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="14"/>
            </div>
                            {errorInformation.email}
          </span> : ''
                }
            </div>
            <div className={`input-wrap`}>
                <div className={'label-wrap'}>Số điện thoại</div>
                <Input
                    className={`main-input`}
                    placeholder={'Nhập số diện thoại'}
                    value={dataInformation.phone}
                    onChange={(e) => handleChangeInput(e.target.value, 'phone')}
                    onKeyDown={() => handleKeyDown()}
                />
                {
                    errorInformation && errorInformation.phone?.length > 0 ?
                        <span className={'error'}>
            <div className={'icon'}>
              <InlineSVG src={IconWarning} width={14} height="14"/>
            </div>
                            {errorInformation.phone}
          </span> : ''
                }
            </div>

            <div className={`flex justify-end`}>
                <Button
                    loading={isLoadingBtnInformation}
                    disabled={handleCheckChangedData()}
                    type="primary"
                    size={'large'}
                    className={`!w-auto`}
                    block
                    onClick={() => handleConfirmUpdateInformation()}
                >Lưu thông tin
                </Button>
            </div>
        </div>
    )
}
