import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {Connect, ConnectionsStreamResponse, Message} from './generated/chat_pb'
import { ChatServiceClient } from './generated/chat_pb_service'
import { User } from './generated/users_pb'
import { Observable } from 'rxjs'
import * as faker from 'faker'

function App() {
  const [users, setUsers] = useState<User.AsObject[]>([])
  const [messages, setMessages] = useState<any>([])
  const [connections$, setConnectionStream] = useState<ConnectionsStreamResponse.AsObject>()
  const [messages$, setMessageStream] = useState<any>()
  const client = new ChatServiceClient('http://0.0.0.0:8080')
  const handleConnectionStream = () => {
    const connections$ = new Observable((obs) => {
      console.log('Connection Stream Initiated')
      const req = new Connect()
      req.setUserId(10)
      req.setActive(true)
      const stream = client.getConnectionStream(req)
      stream.on('status', (status: any) => {
        console.log('ApiService.getStream.status', status)
      })
      stream.on('data', (message: any) => {
        console.log('ApiService.getStream.data', message.toObject())
        obs.next(message.toObject())
      })
      stream.on('end', () => {
        console.log('ApiService.getStream.end')
        obs.complete()
        obs.error()
      })
    })
    connections$.subscribe(data => {
      console.log(data)
    })
    setConnectionStream(connections$ as any)
  }

  const handleMessageStream = () => {
    const messages$ = new Observable((obs) => {
      console.log('Message Stream Initiated')
      const req = new Connect()
      req.setUserId(10)
      req.setActive(true)
      const stream = client.getChatStream(req)
      stream.on('status', (status: any) => {
        console.log('ApiService.getStream.status', status)
      })
      stream.on('data', (message: any) => {
        console.log('ApiService.getStream.data', message.toObject())
        obs.next(message.toObject())
      })
      stream.on('end', () => {
        console.log('ApiService.getStream.end')
        obs.complete()
        obs.error()
      })
    })
    messages$.subscribe(data => {
      console.log(data)
      setMessages(data)
    })
    setMessageStream(connections$)
  }

  const handleConnection = () => {
    const req = new Connect()
    req.setUserId(faker.random.number({ min: 1, max: 99 }))
    req.setActive(true)
    client.getConnectionsToChannel(req, (err, res) => {
      if (err) {
        console.log(err)
      }
      console.log(res?.toObject())
      res && setUsers(res.toObject().usersList)
    })
  }

  const handleSendMessage = () => {
    const req = new Message()
    req.setId(faker.random.number())
    req.setContent(faker.random.words(4))
    req.setTimestamp(new Date().toISOString())
    req.setUserId(faker.random.number())
    client.updateChannel(req, (err, res) => {
      if (err) {
        console.log(err)
      }
      console.log(res?.toObject())
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleConnection}>Make Connection</button>
        <button onClick={handleSendMessage}>Make Message</button>
        <button onClick={handleConnectionStream}>Get Connection Stream</button>
        <button onClick={handleMessageStream}>Get Message Stream</button>
      </header>
    </div>
  )
}

export default App
