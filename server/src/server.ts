import express, { Express } from "express";
import http from "http"; // Import the 'http' module
import { Server as SocketIOServer, Socket } from "socket.io"; // Import Server and Socket types from 'socket.io'
import connectDb from "../connection/connection";
import studentRouter from "./routes/studentRouter/studentRouter";
import tutorRouter from "./routes/tutorRouter/tutorRouter";
import chatRouter from "./routes/ChatRoutes/chatRoutes";
import cors from "cors";
import nocache from "nocache";
import "dotenv/config";
import adminRouter from "./routes/adminRouter/adminRouter";
import path from "path";
import morgan from 'morgan'

const app: Express = express();
const port: number = Number(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(nocache());
app.use(morgan('tiny'));
connectDb();
/*student route*/
app.use("/student", studentRouter);
/*instructor route*/
app.use("/instructor", tutorRouter);
/*admin route*/
app.use("/admin", adminRouter);

/* chat router*/
app.use("/messages", chatRouter);
/* chat router*/

const server = http.createServer(app); // Create an HTTP server using 'http' module

const io = new SocketIOServer(server, {
  // Create a new Socket.IO server instance
  cors: {
    origin: [
      "http://localhost:5173",
      "http://prominentmuhzin.online",
      "https://prominentmuhzin.online",
    ],
    credentials: true,
  },
});

  app.use(express.static(path.join(__dirname,"..", "..","..","prominent","client", "dist")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname,"..", "..","..","prominent","client", "dist", "index.html"));
});



// Define global variables with proper types
const onlineUsers: Map<string, string> = new Map(); // Assuming userId is a string
let chatSocket: Socket;

io.on("connection", (socket) => {
  chatSocket = socket;
  socket.on("add-user", (userId: string) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
