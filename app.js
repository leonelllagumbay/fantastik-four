const express = require('express');
const http = require('http');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running'));

// Socket IO
const io = require('socket.io')(server);
io.on('connection', (socket) => {
	socket.broadcast.emit('msg', { // sending to all clients except the sender
		msg: '{"command":"ready"}'
	});
	socket.on('msg', (msg) => {
		socket.broadcast.emit('msg', { // sending to all clients except the sender
			msg: msg
		});
	});
});