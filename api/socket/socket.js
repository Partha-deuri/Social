const dotenv = require('dotenv');
dotenv.config();
const SOCKET_PORT = process.env.SOCKET_PORT || 8900;
const SOCKET_HOST = process.env.SOCKET_HOST

const io = require("socket.io")(SOCKET_PORT, {
    cors: {
        origin: SOCKET_HOST,
    },
})
const socketConnect = () => {

    let users = []

    const addUser = (userId, socketId) => {
        !users.some(user => user.userId === userId) &&
            users.push({ userId, socketId })
    }
    const removeUser = (socketId) => {
        users = users.filter(user => user.socketId !== socketId)
    }

    const getUser = (userId) => {
        return users.find(user => user.userId === userId)
    }

    io.on("connection", (socket) => {
        // when connect
        console.log("user connected");
        // take socket id and user id 
        socket.on("addUser", userId => {
            addUser(userId, socket.id);
            io.emit("getAllUsers", users);
        });

        // send and get message
        socket.on("sendMsg", ({ senderId, receiverId, text, image }) => {
            const user = getUser(receiverId);
            if (user) {
                io.to(user.socketId).emit("getMsg", {
                    senderId,
                    text,
                    image,
                })
            }
        })


        // when disconnect
        socket.on("disconnect", () => {
            console.log("a user disconnected");
            removeUser(socket.id);
            io.emit("getAllUsers", users);
        })
        // io.to(si).emit("welcome","hello this  is socket server");
    })

}


module.exports = {socketConnect};
