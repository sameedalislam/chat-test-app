import React, { useRef, useState } from 'react'
import Cookies from 'universal-cookie/cjs/Cookies'
import Auth from './components/Auth'
import Chat from './components/Chat'

// import Cookies from 'universal-cookie'
const cookies = new Cookies()


function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState(null)
  const roomInputRef = useRef(null)

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    )
  }

  return (
    <div>
      {room ? <Chat room={room} />
        : <div className='room'>
          <form onSubmit={e => e.preventDefault}>
          <label>Enter Room Name : </label>
          <input ref={roomInputRef} />
          <button type='submit' onClick={() => setRoom(roomInputRef.current.value)} >Enter Chat</button>
          </form>
        </div>}
    </div>
  )
}

export default App