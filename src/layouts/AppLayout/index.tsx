import { IonContent } from '@ionic/react'
import { GeneralHeader } from '../../components/header/general'
import './styles.css'

export const AppLayout: React.FC<{ children: JSX.Element }> = ({ children }) => {

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