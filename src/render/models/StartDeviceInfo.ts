export default interface StartDeviceInfo {
    //模拟器id列表
    serverList: string[]
    /**
     * 启动数量
     */
    startCount: number;
    /**
     * 定时间隔
     */
    intervalSecond?: number;
}