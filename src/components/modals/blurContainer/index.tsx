import reactDOM from 'react-dom'

type AppModalProps = {
    children: React.ReactNode
}

export const BlurAppModal:React.FC<AppModalProps> = ({ children })=> {

    return reactDOM.createPortal(
        <section
            className='
                fixed top-0 left-0 z-50
                flex items-center justify-center text-center
                w-screen h-screen
            '
        >
            <div className="relative w-full h-full z-50">
                { children }
            </div>
            <article  className='
                absolute top-0 left-0 z-0
                flex items-center justify-center text-center
                w-screen h-screen
                bg-white opacity-95 blur-sm

            '></article>
        </section>,
        document.getElementById('modal-root') as HTMLElement
    )
}