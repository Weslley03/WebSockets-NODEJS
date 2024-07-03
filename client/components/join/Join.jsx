import React, { useRef } from 'react'
import io from 'socket.io-client' // necessário quando utilizado no backend

function Join({ setChatVisibility, setSocket }){

    const userNameRef = useRef()

    const handleSubmit = async () => {
        const username = userNameRef.current.value 
        if(!username.trim()) return
        const socket = await io.connect('http://localhost:3008')
        socket.emit('set_username', username) // emitir-enviar evento
        setChatVisibility(true)
        setSocket(socket) // pega state socket criado no app e seta ele 
    }

    return(
        <div>
            <h1>Join</h1>
            <input type='text' ref={userNameRef} placeholder='nome de usuario'/>
            <button onClick={ () => handleSubmit()}>entrar</button>
        </div>
    )
}

export default Join