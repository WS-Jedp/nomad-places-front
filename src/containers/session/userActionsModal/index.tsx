import { IonRow, IonCol } from '@ionic/react'
import { stat } from 'fs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdArrowBack, MdClose } from 'react-icons/md'
import { useAppSelector } from '../../../common/hooks/useTypedSelectors'
import { verifyFileType } from '../../../common/utils/files'
import { CircleUserAction } from '../../../components/actions/cards/circleUserAction'
import { SimpleButton, SimpleButtonOutline } from '../../../components/buttons/simple'
import { UPDATE_ACTIONS } from '../../../models/session'
import { PLACE_SESSION_ACTION_TYPE_ENUM } from '../../../models/session/actions'
import { HandleActionForm } from '../actions/forms/handleActionForm'

type UserActionsModalProps = {
    closeCallback: () => void
}
export const UserActionsModal: React.FC<UserActionsModalProps> = ({ closeCallback }) => {

    const { t } = useTranslation();

    const { sessionActions: actions, ...actionsState } = useAppSelector(state => state.placeSession)
    const [ isUpdateAvailable, setIsUpdateAvailable ] = useState<boolean>(false)
    const { socket, sessionID } = useAppSelector((state) => state.userSession);


    const [currentAction, setCurrentAction] = useState<PLACE_SESSION_ACTION_TYPE_ENUM | null>(null)

    function handleAction(action: PLACE_SESSION_ACTION_TYPE_ENUM) {
        setCurrentAction(action)
    }

    function handleOnSave() {
        setCurrentAction(null)
    }

    function onUpdateSession() {
        const actionsUpdateForm: { type: UPDATE_ACTIONS, data: any  }[] = []
        if(actionsState.sessionAmountOfPeopleAction.payload) {
            actionsUpdateForm.push({
                type: UPDATE_ACTIONS.PLACE_AMOUNT_OF_PEOPLE,
                data: {
                    amount: `${actionsState.sessionAmountOfPeopleAction.payload.min}-${actionsState.sessionAmountOfPeopleAction.payload.max}`,
                    range: [actionsState.sessionAmountOfPeopleAction.payload.min, actionsState.sessionAmountOfPeopleAction.payload.max]
                }
            })
        }

        if(actionsState.sessionMindsetAction.payload) {
            actionsUpdateForm.push({
                type: UPDATE_ACTIONS.PLACE_MINDSET,
                data: actionsState.sessionMindsetAction.payload
            })
        }

        if(actionsState.sessionPlaceStatusAction.payload) {
            actionsUpdateForm.push({
                type: UPDATE_ACTIONS.PLACE_STATUS,
                data: actionsState.sessionPlaceStatusAction.payload
            })
        }

        if(actionsState.sessionRecentActivityAction.payload) {
            actionsUpdateForm.push({
                type: UPDATE_ACTIONS.PLACE_RECENT_ACTIVITY,
                data: actionsState.sessionRecentActivityAction.payload
            })
        }

        if(sessionID) {
            socket?.updateSessionMultipleActions({ sessionID: sessionID, actions: actionsUpdateForm })
        }
    }

    function handleActionValue(action: PLACE_SESSION_ACTION_TYPE_ENUM) {
        switch (action) {
            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_AMOUNT_OF_PEOPLE:
                const amountOfPeople = actionsState.sessionAmountOfPeopleAction.payload
                return amountOfPeople?.amount

            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_MINDSET:
                return actionsState.sessionMindsetAction.payload && t(`filters.mindsets.${actionsState.sessionMindsetAction.payload?.toLowerCase()}`)

            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_RECENT_ACTIVITY:
                const recentActivity = actionsState.sessionRecentActivityAction.payload
                if(!recentActivity) return null
                const fileType = verifyFileType(recentActivity)
                return fileType?.toLowerCase() || null

            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_STATUS:
                return actionsState.sessionMindsetAction.payload && t(`spots.session.${actionsState.sessionPlaceStatusAction.payload?.type.toLowerCase()}`)
        }
    }

    useEffect(() => {
        const update = actionsState.sessionRecentActivityAction.payload || actionsState.sessionAmountOfPeopleAction.payload || 
                        actionsState.sessionMindsetAction.payload || actionsState.sessionPlaceStatusAction.payload

        setIsUpdateAvailable(update ? true : false)
    }, [actionsState])

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
                        { t('spots.information.updateTheSession') }
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
                        />
                    </IonRow>
                )
            }


            {
                    !currentAction ? (
                        <IonRow className='w-full flex flex-row h-auto max-w-[420px] items-start md:bg-white md:shadow-md md:rounded-lg md:p-6'>
                            {
                                actions.map((action, index) => (
                                    <IonCol 
                                        key={index}
                                        size='4' 
                                        className='text-center flex flex-col justify-center items-center my-3 p-3 cursor-pointer'
                                    >
                                        <CircleUserAction 
                                            callback={() => handleAction(action)}
                                            action={action}
                                            text={action} 
                                            size={20}
                                            value={handleActionValue(action)}
                                            fontSize="sm"
                                        />
                                    </IonCol>
                                ))
                            }

                            {
                                isUpdateAvailable && (
                                    <IonCol size='12'>
                                        <SimpleButton 
                                            text={t('actions.general.update')}
                                            action={onUpdateSession}
                                        />
                                    </IonCol>
                                )
                            }
                        </IonRow>
                    ) : (
                        <HandleActionForm onSave={handleOnSave} action={currentAction} />
                    )

            }

            {
                !currentAction && (
                    <IonRow className="
                        sticky bottom-0 left-0
                        w-full h-auto
                        flex flex-row items-center justify-center
                        px-3 py-6
                        bg-white
                        border-t border-gray-300
                    ">
                        
                        <SimpleButtonOutline 
                            text={t('actions.general.cancel')}
                            action={closeCallback}
                        />
                    </IonRow>
                )
            }
        </IonRow>
    )

}