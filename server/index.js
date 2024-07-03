import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()

const server = createServer(app)
// servidor criado para lidar com requisições HTTP e pode ser usado pelo Socket.io para comunicação em tempo real

const io = new Server(server, { // necessário para integrar o Socket.io com o servidor HTTP criado pelo Express (app)
    cors: {
        origin: 'http://localhost:5173'
    }
})

const PORT = 3008

io.on('connection', socket => { // cria um escutador da conexão, quando conectado  retorna: 
    console.log('user OK-conectado', socket.id)

    socket.on('disconnect', reason => {
        console.log('user FAIL-desconectado', socket.id)
    })
    
    socket.on('set_username', username => { 
        socket.data.username = username
    }) //escutador evento set_username, quando chega, o dado é 'username' é armazenado dentro do objeto data associado ao socket

    socket.on('message', textMessage => {
        io.emit('recive_message', {
            textMessage,
            authorId: socket.id,
            author: socket.data.username
        })
    })
})

server.listen(PORT, () => {
    console.log('server running')
})