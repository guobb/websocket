/**
 * Created by apple on 17/2/22.
 */

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 先创建一个Http服务器
const server = require('http').createServer(app);

// 再创建scoket.io服务器
const io = require('socket.io')(server);

let clients = [];
// 监听客户端的连接事件
// socket代表与某个客户端的连接对象
io.on('connection', (socket) => {
    // 把socket缓存起来
    clients.push(socket);
    // 监听客户端的消息
    socket.on('message', (msg) => {
        //  把客户端发过来的消息广播给所有的客户端
        clients.forEach((client) => {
            client.send(msg)
        })
    })

});


// 监听端口
server.listen(8080);