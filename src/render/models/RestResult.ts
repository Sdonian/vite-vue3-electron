export default interface RestResult {
    //错误信息
    errorMsg: string;
    //状态码
    stateCode: number;
    //是否正确 
    isPositive: boolean;
    //数据
    data: any
}