/**
 * Created by apple on 17/2/22.
 */

const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 先创建一个Http服务器
const server = require('http').createServer(app);

// 再创建scoket.io服务器
const io = require('socket.io')(server);

// 监听客户端的连接事件
io.on('connection', (socket) => {
    // socket代表与某个客户端的连接对象

    socket.on('message', (msg) => {
        socket.send('server:' + msg);
    })

});


// 监听端口
server.listen(8080);