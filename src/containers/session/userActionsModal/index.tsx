import { IonRow, IonCol } from '@ionic/react'
import { useState } from 'react'
import { MdArrowBack, MdClose } from 'react-icons/md'
import { CircleUserAction } from '../../../components/actions/cards/circleUserAction'
import { SimpleButton, SimpleButtonOutline } from '../../../components/buttons/simple'
import { HandleActionForm } from '../actions/forms/handleActionForm'

type UserActionsModalProps = {
    closeCallback: () => void
}
export const UserActionsModal: React.FC<UserActionsModalProps> = ({ closeCallback }) => {

    const [currentAction, setCurrentAction] = useState<string | null>(null)

    const actions = [
        'people',
        'mindset',
        'status',
        'recent-activity'
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
                        <CircleUserAction 
                            iconSize={30} 
                            callback={() => {}} 
                            action={currentAction}
                            text={currentAction}
                        />
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
                                    >
                                        <CircleUserAction callback={() => handleAction(action)} action={action} text={action} />
                                    </IonCol>
                                ))
                            }
                        </IonRow>
                    ) : (
                        <HandleActionForm action={currentAction} />
                    )

            }

            {
                !currentAction ? (
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
                ) : (
                    <IonRow className="flex items-center justify-center p-6 w-full">
                        <SimpleButton 
                            text='Save'
                            action={() => {}}
                        />
                    </IonRow>
                )
            }

        </IonRow>
    )

}