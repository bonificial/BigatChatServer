const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: [ "GET", "POST" ]
    }
})

io.on("connection", (socket) => {
    let customID = socket.handshake.query.CustomId;

    socket.emit("me",  socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("socket disconnected", socket.id)
    })

    socket.on("message", (data) => {
       console.log('New Message with Data ', data)
        io.to(socket.id).emit('callResponse', 'call response initiated');

    })

})

server.listen(process.env.PORT || 5000, () => console.log("server is running on port 5000"))

//git add . && git commit -m "Update" && git push origin master