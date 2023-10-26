"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http")); // Import the 'http' module
const socket_io_1 = require("socket.io"); // Import Server and Socket types from 'socket.io'
const connection_1 = __importDefault(require("../connection/connection"));
const studentRouter_1 = __importDefault(require("./routes/studentRouter/studentRouter"));
const tutorRouter_1 = __importDefault(require("./routes/tutorRouter/tutorRouter"));
const chatRoutes_1 = __importDefault(require("./routes/ChatRoutes/chatRoutes"));
const cors_1 = __importDefault(require("cors"));
const nocache_1 = __importDefault(require("nocache"));
require("dotenv/config");
const adminRouter_1 = __importDefault(require("./routes/adminRouter/adminRouter"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, nocache_1.default)());
app.use((0, morgan_1.default)('tiny'));
(0, connection_1.default)();
/*student route*/
app.use("/student", studentRouter_1.default);
/*instructor route*/
app.use("/instructor", tutorRouter_1.default);
/*admin route*/
app.use("/admin", adminRouter_1.default);
/* chat router*/
app.use("/messages", chatRoutes_1.default);
/* chat router*/
const server = http_1.default.createServer(app); // Create an HTTP server using 'http' module
const io = new socket_io_1.Server(server, {
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
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/dist/index.html")));
app.get("*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "../../client/dist/index.html"));
});
// Define global variables with proper types
const onlineUsers = new Map(); // Assuming userId is a string
let chatSocket;
io.on("connection", (socket) => {
    chatSocket = socket;
    socket.on("add-user", (userId) => {
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
