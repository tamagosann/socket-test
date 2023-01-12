import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
})

const PORT = 5000

io.on("connection", (socket) => {
  console.log("クライアントと接続しました！")

  socket.on("send_message", (data) => {
    console.log(data)

    io.emit("received_message", data)
  })

  socket.on("disconnect", () => {
    console.log("クライアントと接続が切れました！")
  })
})

server.listen(PORT, () => console.log(`server is running on ${PORT}`))
