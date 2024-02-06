interface SatelliteLoader {
    size?: number
    color?: 'white' | 'blue' | 'gray'
    text?: string
}

export const SatelliteLoader:React.FC<SatelliteLoader> = ({ color = 'white', size = 12, text }) => {

    return (
        <article className="relative flex flex-col items-center justify-center mx-auto my-auto">
            <div className={`relative p-1 border-2 bg-white border-indigo-300 flex items-center justify-center rounded-full duration-[2000] animate-spin `}>
                <div className={`relative left-0 right-0 bg-indigo-500 bg- w-[18px] h-[18px] rounded-full shadow-sm`}></div>
                <div className={`absolute top-[-5px] bg-indigo-500 w-[6px] h-[6px] rounded-full`}></div>
            </div>
            {
                text && (
                    <span className="font-light text-xs my-1">
                        { text }
                    </span>
                )
            }

        </article>
    )
}