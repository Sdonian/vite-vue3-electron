/**
 * 设备类型枚举
 */
export enum DeviceTypeEnum {
    /// <summary>
    /// 未知/普通慢充
    /// </summary>
    Default = "普通慢充",
    /// <summary>
    /// 功率计费慢充
    /// </summary>
    Power = "功率慢充",
    /// <summary>
    /// 电量计费慢充
    /// </summary>
    Electric = "电量慢充",
    /// <summary>
    /// 快充
    /// </summary>
    FastCharge = "快充",
    /// <summary>
    /// 两路
    /// </summary>
    TwoWay = "两路功率慢充"
}