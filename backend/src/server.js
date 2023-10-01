import express from 'express';
import cors from 'cors';
import http from 'http';
const app = express();
import { Server } from 'socket.io';

app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const socket = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

socket.on('connection', (socket) => {
  console.log(`at ${socket.id}`);
  socket.on('send_mess', (data) => {
    console.log(data);

    socket.broadcast.emit('receive_mess', data);
  });
});

const port = 5000;
server.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
