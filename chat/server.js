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

let clients = {};

// 监听客户端的连接事件
// socket代表与某个客户端的连接对象
io.on('connection', (socket) => {

    let username;

    socket.send({user: '系统消息', content: '请输入用户名'});

    // 把socket缓存起来

    // 监听客户端的消息
    socket.on('message', (msg) => {

        let result = msg.match(/^@(.+)\s(.+)$/);

        if (result) {
            let toUser = result[1];
            let content = result[2];

            if (clients[toUser]) { // 通过用户名把对应的socket取出来
                clients[toUser].send({user: username, content:'[私聊]'+ content})
            } else {
                socket.send({user: '系统消息', content: '你私聊的人没在线' });
            }
        } else {

            if (username) {
                //  把客户端发过来的消息广播给所有的客户端
                for(s in clients){
                    clients[s].send({user: username, content: msg});
               /* clients.forEach((client) => {
                    client.send({user: username, content: msg});*/
                }
            } else {
                username = msg;
                // 属性名是用户名， 值是对应的socket对象
                clients[username] = socket;
                socket.send({user: '系统消息', content: '你的用户名修改为:' + username});
            }

        }

    })

});


// 监听端口
server.listen(8080);