import { io } from 'socket.io-client'

const SOCKET_URL = 'http://localhost:3080' 

export const socket = io(SOCKET_URL)