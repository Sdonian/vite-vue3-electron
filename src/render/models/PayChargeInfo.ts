export default interface PayChargeInfo {
    /// <summary>
    /// 模拟器
    /// </summary>
    serverList: string[]
    /// <summary>
    /// 充电通道
    /// </summary>
    chargeChannel: number[]
    /// <summary>
    /// 支付金额
    /// </summary>
    payMoney: number
    /// <summary>
    /// 批量支付数量
    /// </summary>
    batchPayCount: number
    /// <summary>
    /// 间隔秒
    /// </summary>
    intervalSecond?: number
}