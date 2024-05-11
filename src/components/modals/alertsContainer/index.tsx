import reactDOM from 'react-dom'

type AlertsModalProps = {
    children: React.ReactNode
}

export const AlertsModal:React.FC<AlertsModalProps> = ({ children })=> {

    return reactDOM.createPortal(
        <section>
            { children }
        </section>,
        document.getElementById('alerts-root') as HTMLElement
    )
}