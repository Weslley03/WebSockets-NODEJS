import React, { useRef, useState, useEffect } from "react"

function Chat({ socket }){

    const [ messageList, setMessageList ] = useState([]) 

    useEffect(() => {
        socket.on('recive_message', data => { //'.on' ouve o evento recive_message, 
            setMessageList((current) => [...current, data]) // (current) representa state atual de messageList
        })

        return () => socket.off('recive_message') // desliga o evento
    }, [socket]) // vai executar novamnte sempre que o nuvo socket for criado no app (como click no 'entrar')

    const messageRef = useRef()

    const clearInput = () => {
        messageRef.current.value = ''
    }
    
    const handleSubmit = () => {
        const message = messageRef.current.value
        if(!message.trim()) return // caso não tiver valor em message depois do '.trim' (tira espaços), o return será NADA
        socket.emit('message', message)  // cria um nome evento 'message'
        clearInput()
    }

    return(
        <div>
            <h1>Chat</h1>
            { 
                messageList.map((message, index) => (
                    <p key={index}>{message.author}: {message.textMessage}</p>
                ))
            }
            <input type='text' ref={messageRef} placeholder='mensagem'/>
            <button onClick={() => handleSubmit()}>enviar</button>
        </div>
    )
}

export default Chat