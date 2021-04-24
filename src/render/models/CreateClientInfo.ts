export default interface CreateClientInfo {
    /**
     * 起始设备编号
     */
    start: number;
    /**
     * 生成总数
     */
    total: number;
    /**
     * 插入sql语句
     */
    sqlFormat: string;
}