export default interface DeviceListQueryInfo {
    /**
     * 模拟器ID
     */
    serverId: string;
    /**
     * 设备编号
     */
    deviceNum: number;
    /**
     * 页面大小
     */
    pageSize: number;
    /**
     * 页码
     */
    pageIndex: number;
}