import { IonRow, IonCol } from '@ionic/react'
import { useState } from 'react'
import { MdArrowBack, MdClose } from 'react-icons/md'
import { SimpleButtonOutline } from '../../../components/buttons/simple'

type UserActionsModalProps = {
    closeCallback: () => void
}
export const UserActionsModal: React.FC<UserActionsModalProps> = ({ closeCallback }) => {

    const [currentAction, setCurrentAction] = useState<string | null>(null)

    const actions = [
        'People',
        'Ambient/mindset',
        'Status',
        'Story'
    ]

    function handleAction(action: string) {
        setCurrentAction(action)
    }

    return (
        <IonRow className='
            flex flex-col items-center justify-between
            w-full h-screen 
            text-black
            py-3
         '
        >
            {
                !currentAction ? (
                    <h2 className='text-3xl font-bold my-3 pt-3'>
                        Update the Spot
                    </h2>
                ) : (
                    <IonRow className='w-full flex flex-col'>
                        <IonRow className='w-full h-auto flex items-center justify-between p-6'>
                            <MdArrowBack color='black' size={24} onClick={() => setCurrentAction(null)} />
                            <MdClose color='black' size={24} onClick={closeCallback} />
                        </IonRow>
                        <IonRow className='flex flex-col w-full items-center justify-start'>
                            <div className='w-24 h-24 rounded-full bg-gray-300 m-3'></div>
                            <h3 className='text-3xl font-bold'>
                                { currentAction }
                            </h3>
                        </IonRow>
                    </IonRow>
                )
            }


            {
                    !currentAction ? (
                        <IonRow className='w-full flex flex-row h-auto max-w-[420px] md:bg-white md:shadow-md md:rounded-lg md:p-6'>
                            {
                                actions.map((action, index) => (
                                    <IonCol 
                                        key={index}
                                        size='4' 
                                        className='text-center flex flex-col justify-center items-center my-3 p-3 cursor-pointer'
                                        onClick={() => handleAction(action)}
                                    >
                                        <div className='flex flex-col items-center justify-center rounded-full bg-gray-300 w-20 h-20'>
                                        </div>
                                        <span className='my-1 text-md font-medium'>
                                            { action }
                                        </span>
                                    </IonCol>
                                ))
                            }
                        </IonRow>
                    ) : (
                        <IonRow>
                            <p>
                                Action selected
                            </p>
                        </IonRow>
                    )

            }

            <IonRow className="
                sticky bottom-0 left-0
                w-full h-auto
                flex flex-row items-center justify-center
                px-3 py-6
                bg-white
                border-t border-gray-300
            ">
                <SimpleButtonOutline 
                    text="Cancel"
                    action={closeCallback}
                />
            </IonRow>
        </IonRow>
    )

}