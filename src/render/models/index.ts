import AllSourceInfo from './AllSourceInfo';
import HomeInfo from "./HomeInfo";
import StartDeviceInfo from "./StartDeviceInfo"
import RestResult from "./RestResult"
import PayChargeInfo from "./PayChargeInfo"
import TimingOfflineInfo from "./TimingOfflineInfo"
import DeviceListQueryInfo from "./DeviceListQueryInfo"
import ClientViewInfo from './ClientViewInfo'
import PageListInfo from './PageListInfo'
import AppsettingsInfo from './AppsettingsInfo'
import TimeDataInfo from './TimeDataInfo'
import CreateClientInfo from './CreateClientInfo'

export interface allSourceInfoType extends AllSourceInfo { };
export interface homeInfoType extends HomeInfo { };
export interface startDeviceInfoType extends StartDeviceInfo { };
export interface restResultType extends RestResult { };
export interface payChargeInfoType extends PayChargeInfo { };
export interface timingOfflineInfoType extends TimingOfflineInfo { };
export interface deviceListQueryInfoType extends DeviceListQueryInfo { };
export interface clientViewInfoType extends ClientViewInfo { };
export interface pageListInfoType<T> extends PageListInfo<T> { };
export interface appsettingsInfoType extends AppsettingsInfo { };
export interface timeDataInfoType extends TimeDataInfo { };
export interface createClientInfoType extends CreateClientInfo { };