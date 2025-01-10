import NoData from '../NoData';
import HandleParent from "../handle.js";
import styles from "./styles.module.scss"
import {Checkbox, Table, Tooltip} from 'antd';
import React, {useEffect, useState} from 'react';
import useWindowSize from '@/utils/hooks/useWindowSize';
import {hasPermission} from '@/utils/helper';
import {PERMISSIONS} from '@/utils/constaints.ts';

const convertData = (data: any, id: number | undefined) => {
    return data?.map((item: any) => {
        const permissions = item.permissions?.reduce((acc: any, permission: any) => {
            if (permission && permission.permission_type_code) {
                const {permission_type_code, active, id} = permission;
                const permissionKey = permission_type_code
                let hasRole;
                hasRole = active === true;
                return {
                    ...acc,
                    [`permissionId`]: item.id,
                    [permissionKey]: hasRole,
                    [`id${permissionKey}`]: id,
                    [`name${permissionKey}`]: permission.name,
                };
            }
            return acc;
        }, {});
        const children = item.children && item.children.length > 0 ? convertData(item.children, id) : [];
        return {
            name: item.name,
            ...permissions,
            ...(children.length > 0 && {children})
        };
    });
};

export default function TablePermission() {
    const {
        typesList,
        permissionList,
        infoRoleSelected,
        isLoadingBtnUpdatePermissionRole,
        handleCheckboxChange,
    } = HandleParent();

    const {width: widthOfScreen} = useWindowSize();
    const [tableKey, setTableKey] = useState<number | null>(null);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    const permissionTypes = typesList;
    const admin = infoRoleSelected.protected
    const tableData = convertData(permissionList, infoRoleSelected.id);

    const renderCheckboxColumn = (value: any, title: string, id: number, permissionId: number, record: any) => {
        const canChangeCheckbox = admin !== 1;
        return (
            <>
                {
                    admin === 1 ?
                        <Tooltip placement="top" title={title}>
                            <>
                                {
                                    value !== undefined ? (
                                        <Checkbox
                                            checked={value}
                                            onChange={() => handleCheckboxChange(id, permissionId, record)}
                                            disabled={!canChangeCheckbox}
                                        />
                                    ) : null
                                }
                            </>
                        </Tooltip>
                        :
                        <>
                            <Tooltip placement="top" title={title}>
                                <>
                                    {
                                        value !== undefined ? (
                                            <Checkbox
                                                checked={value}
                                                onChange={() => handleCheckboxChange(id, permissionId, record)}
                                                disabled={!hasPermission([PERMISSIONS.EDIT.PERMISSION_MANAGEMENT])}
                                            />
                                        ) : null
                                    }
                                </>
                            </Tooltip>
                        </>
                }
            </>

        );
    };

    const permissionColumns = permissionTypes?.map((item: any): {
        dataIndex: any;
        width: number | string;
        title: any;
        render: (value: any, record: any) => React.ReactNode
    } => ({
        title: item.name,
        dataIndex: item.code,
        width: widthOfScreen < 1000  ? 110 : 70,
        render: (value: any, record: any) => {
            return renderCheckboxColumn(
                value,
                record['name' + item.code],
                record['id' + item.code],
                record.permissionId,
                record
            )
        }
    }));

    const filteredColumns = permissionColumns?.filter((column) => column.dataIndex !== "status-active");

    const expandableProps = tableData && tableData.length > 0 ? {defaultExpandAllRows: true} : {};

    useEffect(() => {
        if (tableData && tableData.length > 0 && !hasLoadedOnce) {
            setTableKey(Date.now());
            setHasLoadedOnce(true);
        }
    }, [tableData, hasLoadedOnce]);

    return (
        <>
            <Table
                key={tableKey}
                pagination={false}
                dataSource={tableData}
                rowKey={"permissionId"}
                scroll={{x: 900, y: 'auto'}}
                className={`${styles.table} table`}
                bordered expandable={expandableProps}
                loading={isLoadingBtnUpdatePermissionRole}
                locale={{
                    emptyText: <div className={`${styles.noDataContent}`}>
                        <NoData description={'Không có dữ liệu quyền hạn !'}/>
                    </div>
                }}
            >
                <Table.Column title='Chức năng'
                              width={widthOfScreen < 1000 ? 300 : 180}
                              dataIndex='name'
                              className="tableName"
                />
                {filteredColumns?.map((column) => (
                    <Table.Column key={column.dataIndex} align={"center"} {...column} />
                ))}
            </Table>
        </>
    );
}
