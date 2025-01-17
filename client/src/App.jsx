import Join from '../components/join/Join'
import Chat from '../components/chat/Chat'
import './App.css'
import { useState } from 'react'

function App() {

  const [ chatVisibility, setChatVisibility ] = useState(false)
  const [ socket, setSocket ] = useState(null)

  return (
    <div className='App'>
      {
        chatVisibility ? <Chat  socket={socket} /> : <Join setChatVisibility={setChatVisibility} setSocket={setSocket}/>
      }
    </div>
  )
}

export default App
