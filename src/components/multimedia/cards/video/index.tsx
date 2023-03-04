import { useEffect, useRef } from "react"

export const MultimediaCardVideo: React.FC<{ url: string }> = ({ url }) => {

    const videoRef = useRef<HTMLVideoElement | null>(null)

    function handleMouseEnter(ev:  React.MouseEvent<HTMLVideoElement, MouseEvent>) {
        ev.preventDefault()
        ev.currentTarget.play()
    }
    function handleMouseLeave(ev:  React.MouseEvent<HTMLVideoElement, MouseEvent>) {
        ev.preventDefault()
        ev.currentTarget.pause()
        ev.currentTarget.currentTime = 0

    }

    useEffect(() => {
        if(!videoRef || !videoRef.current) return
    }, [])

    return (
        <video
            src={url}
            autoPlay={false}
            controls={false}
            ref={videoRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="
               h-full w-full min-w-full min-h-full object-cover
            "
        >
        </video>
    )
}