import HandleParent from "../handle.js";
import {Tooltip, Tree, TreeDataNode} from "antd";
import InlineSVG from "react-inlinesvg";
import styles from "./styles.module.scss";
import {PERMISSIONS, TYPE_SUBMIT} from "@/utils/constaints.ts";
import {InfoCircleFilled} from "@ant-design/icons";
import Edit from "@/assets/images/icons/duotone/pencil.svg";
import Delete from "@/assets/images/icons/duotone/trash-can.svg";
import {hasPermission} from "@/utils/helper";

export default function TreeList({data}: { data: any }) {
    const {
        infoRoleSelected,
        openModalEdit,
        openModalDelete,
        handleContentSelect,
    } = HandleParent();


    function convertToTreeData(data: any): TreeDataNode[] {
        if (!Array.isArray(data)) {
            return [];
        }
        return data.map((item: any) => ({
            title: (
                <div key={item.id} className={styles.selectedWrap}>
                    <div className={styles.selectedContent}>
                        <span
                            className={`${infoRoleSelected.id === item.id ? styles.activeRole : ''} ${styles.selectedName} `}
                            onClick={() => {
                                hasPermission([PERMISSIONS.LIST.PERMISSION_MANAGEMENT]) && handleContentSelect(item)
                            }}
                        >
                            {item.name}{" "}
                        </span>
                        {item.description && (
                            <span className={styles.selectedTooltip}>
                                <Tooltip placement="top" title={item.description}>
                                    <InfoCircleFilled/>
                                </Tooltip>
                            </span>
                        )}
                    </div>
                    <div>
                        {item.protected !== 1 && (
                            <div className={styles.track}>
                                <div className={styles.roleItem}>
                                    <span className={`${styles.actionWrap}`}>
                                        {
                                            hasPermission([PERMISSIONS.EDIT.ROLE_MANAGEMENT]) &&
                                            <Tooltip title="Chỉnh sửa vai trò" placement="top">
                                                <div>
                                                    <InlineSVG
                                                        src={Edit}
                                                        width={14}
                                                        className={`btn-edit ${styles.iconEdit} cursor-pointer`}
                                                        onClick={() => openModalEdit(item, TYPE_SUBMIT.UPDATE)}
                                                    />
                                                </div>
                                            </Tooltip>
                                        }
                                        {
                                            hasPermission([PERMISSIONS.DELETE.ROLE_MANAGEMENT]) &&
                                            <Tooltip title="Xóa vai trò" placement="top">
                                                <div>
                                                    <InlineSVG
                                                        src={Delete}
                                                        width={14}
                                                        className={`btn-delete ${styles.iconDelete}`}
                                                        onClick={() => openModalDelete(item)}
                                                    />
                                                </div>
                                            </Tooltip>
                                        }
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ),
            key: item.id,
            children: item.children?.length > 0 ? convertToTreeData(item.children) : [],
        }));
    }

    const treeData = convertToTreeData(data);

    return (
        <div>
            <Tree treeData={treeData} className="treeWrap" blockNode defaultExpandAll/>
        </div>
    );
}
