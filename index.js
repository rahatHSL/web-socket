const express = require('express');
const { Server, WebSocket } = require('ws')
const app = express()
const wss = new Server({port:4000})

wss.on('connection', (ws) => {
    console.log('new connection added');
    ws.send('new client added!')

    ws.on("message", (data) => {

        var msg = JSON.parse(data);
        let users = ['hasan', 'rakib']
        console.log(msg);

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {

                let user = Object.keys(msg)
                if (users.includes(user[0])) {
                    client.send(` ${user[0]} : ${msg[user]} `)
                }
            }
        })
    })
})



app.get('/', (req, res) => {
    res.json('working!')
})

let server = app.listen(5000, () => console.log('server running at 5000'))

wss.on("upgrade", (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, socket => {
        wss.emit("connection", socket, req)
    })
})



