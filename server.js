// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('new-user', (username) => {
        // Handle new user
    });

    socket.on('chat-message', (data) => {
        // Broadcast message to all connected clients
        io.emit('chat-message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
