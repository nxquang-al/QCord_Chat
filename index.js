const express = require('express');
const app = express()

const http = require('http')
const server = http.createServer(app)

const { Server } = require('socket.io')
const io = new Server(server)

var lastUser = undefined;

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})
app.use(express.static(__dirname + '/assets'));

io.on('connection', (socket) => {
	console.log('user connected');
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
	socket.on("new-chat", (data) => {
		io.emit('user-chat', data);
	});
	socket.on("new-member", (data) => {
		io.emit("user-member", data);
	});
})

server.listen(3000, () => {
	console.log('Listen on port 3000')
})