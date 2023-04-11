import { useEffect, useState } from 'react'
import { socket } from '../../../socket'

export const useIsSocketConnected = () => {

    const [ isConnected, setIsConnected ] = useState<boolean>(socket.connected)

    useEffect(() => {
        setIsConnected(socket.connected)
    }, [socket.connected])
    

    return isConnected
}