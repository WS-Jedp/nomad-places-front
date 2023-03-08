import { IonContent, IonHeader, IonIcon } from '@ionic/react'
import { navigate } from 'ionicons/icons'
import './styles.css'

export const AppLayout: React.FC<{ children: JSX.Element }> = ({ children }) => {

    return (
        <>
            <IonHeader
                
                className="
                    flex items-center justify-around
                    fixed md:sticky top-0 w-full
                    md:border-b md:border-gray-300
                    p-6 py-5 m-0
                    bg-none md:bg-white
                    ion-no-border
                    z-50
                "
            >

                <h1 className="block font-bold text-black text-sm">N</h1>

                <div className='
                    bg-white rounded-xl shadow-md p-2 px-4
                '>
                    <p className='text-black'>Search this area</p>
                </div>

                <span className='bg-white p-2 flex items-center justify-center rounded-full'>
                    <IonIcon size='small' icon={navigate} color='primary' />
                </span>

            </IonHeader>

            <IonContent className='
                w-full h-full
            '>
                {
                    children
                }
            </IonContent>
        </>
    )
}