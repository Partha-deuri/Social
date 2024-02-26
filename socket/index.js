const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
})

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