export default interface TimeDataInfo {
    /**
     * 设备耗时 时间线
     */
    devNumTime: any[];
    /**
     * 设备耗时 数据
     */
    devNumElapsed: any[];
    /**
     * 上线耗时 时间线
     */
    onlineTime: any[];
    /**
     * 上线耗时 数据
     */
    onlineElapsed: any[];
    /**
     * 同步耗时 时间线
     */
    syncTime: any[];
    /**
     * 同步耗时 数据
     */
    syncElapsed: any[];
    /***
     * 充电http响应时间/充电指令耗时时间 时间线
     */
    playChargeTime: any[];
    /**
     * 充电http响应时间 数据
     */
    playChargeElapsed: any[];
    /**
     * 充电指令耗时时间 数据
     */
    amPlayChargeElapsed: any[];
    qpsTime: any[];
    qpsSum: any[];
    sendTime: any[];
    sendSum: any[];
}