import React, { useState, useEffect } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { auth, db } from '../firebase'
import '../styles/chat.css'

const Chat = ({ room }) => {
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([])
    const messagesRef = collection(db, 'messages')

    useEffect(() => {
        const queryMessages = query(messagesRef, where('room', '==', room), orderBy('createdAt'))
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = []
            snapshot.forEach(doc => {
                messages.push({ ...doc.data(), id: doc.id })
            })
            setMessages(messages)
        })
        return () => unsubscribe()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newMessage === '') return;
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room
        })

        setNewMessage('')
    }

    return (
        <div>
            <div>
                <h1>Welcome to : {room.toUpperCase()}</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Type your message...' value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                <button type='submit'>Send</button>
            </form>
            <div>
                {messages.map(message => <div key={message.id}>
                    <span>{message.user}</span>
                    <h1>{message.text}</h1>
                    {/* {message.createdAt} */}
                </div>)}
            </div>
        </div>
    )
}

export default Chat