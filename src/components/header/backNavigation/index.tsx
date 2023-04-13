import { IonHeader,  } from '@ionic/react'
import { MdArrowBack } from 'react-icons/md'
import { useHistory } from 'react-router'


export const BackNavigationHeader: React.FC = () => {
    const history = useHistory()
    const goBack = () => {
        history.goBack()
    }
    return (
        <IonHeader
                className="
                    flex items-center justify-between
                    sticky top-0 w-full
                    border-b border-gray-300
                    p-6 py-5 m-0
                    bg-white
                    ion-no-border
                    z-50
                "
            >

                <span className='bg-white cursor-click d-flex flex-row flex-nowrap' onClick={goBack}>
                    <MdArrowBack />
                </span>

                <h1 className="block font-bold text-black text-sm">Spots</h1>
            </IonHeader>
    )
}