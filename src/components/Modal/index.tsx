import {Modal} from "antd";
import './styles.scss';
import styles from './styles.module.scss'
import Close from "@/assets/images/icons/duotone/times.svg";
import InlineSVG from "react-inlinesvg";

export default function ModalDefault(props: any) {
    const {isModalOpen, handleOk, handleCancel, children, title, size} = props;
    return (
        <Modal
            className={`general-dialog-wrap`}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            width={size ? size : 600}
            centered
            closeIcon={<InlineSVG src={Close}/>}
        >
            <div className={styles.headerWrap}>
                {title}
            </div>
            <div className={styles.mainWrap}>
                {children}
            </div>
        </Modal>
    );
}
