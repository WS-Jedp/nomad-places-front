import { IonContent } from '@ionic/react'
import { GeneralHeader } from '../../components/header/general'
import './styles.css'

type AppLayoutProps = {
    children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {

    return (
        <>
           <GeneralHeader />

            <IonContent>
                {
                    children
                }
            </IonContent>
        </>
    )
}