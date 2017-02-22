/**
 * Created by apple on 17/2/22.
 */

const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

// 当连接服务器成功之后调用的回调函数
ws.on('open', () => {

    ws.send('向服务器问好');

});


// 监听服务器发回来的消息
ws.on('message', (data, flags) => {
    console.log(data);
});