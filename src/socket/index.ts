import { io } from 'socket.io-client'

const SOCKET_URL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:3000"

export const socket = io(SOCKET_URL)