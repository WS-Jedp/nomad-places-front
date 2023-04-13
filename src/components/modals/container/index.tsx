import reactDOM from 'react-dom'

type AppModalProps = {
    children: React.ReactNode
}

export const AppModal:React.FC<AppModalProps> = ({ children })=> {

    return reactDOM.createPortal(
        <section
            className='
                fixed top-0 left-0
                flex items-center justify-center text-center
                w-screen h-screen
                bg-black bg-opacity-50
            '
        >
            { children }
        </section>,
        document.getElementById('modal-root') as HTMLElement
    )
}