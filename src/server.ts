import express from 'express';
import cors from 'cors';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import './database/connection';
import routes from './routes/index';


const app = express();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);

app.use(cors());

io.on("connection", (socket: Socket) => {
  console.log("Socket.io connected", socket.id)
});

app.use(express.json());
app.use(routes);

httpServer.listen(process.env.PORT || 3333, () => console.log("starting server") );

export default io;
