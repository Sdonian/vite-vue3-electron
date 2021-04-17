import * as signalR from '@microsoft/signalr'
import { ElMessage } from 'element-plus'
//const baseUrl = 'http://132.232.34.148/api/'
const baseUrl = "http://localhost:5000/"


const connection = new signalR.HubConnectionBuilder().withUrl(`${baseUrl}sourceInfoHub`).build();
const username = new Date().getTime();

connection.start();

connection.on("messageReceived", (username: string, message: string) => {
    ElMessage.success(`接受成功！${username}:${message}`);
});

export function send(msg: any) {
    connection.send("newMessage", username, msg).then(() => {
        ElMessage.success(`发送成功！${username}:${msg}`);
    });
}