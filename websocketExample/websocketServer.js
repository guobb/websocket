/**
 * Created by apple on 17/2/22.
 */

const Server = require('ws').Server;

// 创建一个服务器的实例
const wss = new Server({
    port: 8080 // 指定监听的端口
});


/**
 *
 *  服务器具备的两个条件
 *  1.再特定IP端口上监听客户端的请求
 *  2.能够根据客户端的请求进行响应
 */

// 监听客户端请求，当有客户端连接的时候调用回调函数
wss.on('connection', (ws) => {
    // 监听 客户端发送来的数据
    ws.on('message', (message) => {
        console.log('服务器收到的:%s', message);
        // 服务器端向客户端发送消息
        ws.send('服务器回应:'+ message);
    })
});