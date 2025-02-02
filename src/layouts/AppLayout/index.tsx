import { IonContent } from '@ionic/react'
import { GeneralHeader } from '../../components/header/general'
import './styles.css'

type AppLayoutProps = {
    children: React.ReactNode
    onSearchInThisArea?: () => void
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, onSearchInThisArea }) => {

    return (
        <>
           <GeneralHeader onSearchInThisArea={onSearchInThisArea} />

            <IonContent className='bg-white'>
                {
                    children
                }
            </IonContent>
        </>
    )
}