const port = 3000;
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static(process.cwd() + '/client'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('canvas', (canvas) => {
        socket.broadcast.emit('canvas', canvas);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});