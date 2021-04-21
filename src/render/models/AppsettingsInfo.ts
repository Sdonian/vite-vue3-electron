export default interface AppsettingsInfo {
    RegisterKey: string;
    RegisterId: string;
    DefaultAesKey: string;
    DefaultDeviceNum: string;
    DeviceTypes: string[];
    ServerAddress: {
        Ip: string;
        Port: number;
    };
    PayChargeUrl: string;
    GetTokenUrl: string;
    Elasticsearch: string;
    RedisSetting: {
        ConnectionStr: string;
    };
    RabbitMQSetting: {
        ManagerTopicRoute: string;
        SystemMsgQueueName: string;
        ConnectionConfiguration: {
            UserName: string;
            Password: string;
            VirtualHost: string;
            Hosts: {
                Host: string;
                Port: string;
            }[];
        };
    };
}