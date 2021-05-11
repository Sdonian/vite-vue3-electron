import { MalfunctionTypeEnum } from '@/enums/MalfunctionTypeEnum'

export default interface SetMalfunctionsInfo {
    /**
     * 故障类型
     */
    malfunctionType: MalfunctionTypeEnum;
    /**
     * 故障的模拟器
     */
    malfunctionServers: number;
}