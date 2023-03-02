import { useEffect, useState } from "react"
import { useWindowSize } from "../useWindowSize"

export function useIsMobile() {

    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [ screenWidth ] = useWindowSize() 

    useEffect(() => {
        setIsMobile( screenWidth <= 760 )
    }, [screenWidth])

    return [ isMobile ]
}