export default interface AppsettingsInfo {
    registerKey: string;
    registerId: string;
    defaultAesKey: string;
    defaultDeviceNum: string;
    deviceTypes: string[];
    serverAddress: {
        ip: string;
        port: number;
    };
    payChargeUrl: string;
    getTokenUrl: string;
    elasticsearch: string;
    redisSetting: {
        connectionStr: string;
    };
    rabbitMQSetting: {
        managerTopicRoute: string;
        systemMsgQueueName: string;
        connectionConfiguration: {
            userName: string;
            password: string;
            virtualHost: string;
            hosts: {
                host: string;
                port: string;
            };
        };
    };
}