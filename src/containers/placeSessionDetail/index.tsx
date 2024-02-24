import { IonCol, IonRow } from "@ionic/react"
import { AvatarGroup } from "../../components/avatar/group"
import { SimpleButton } from "../../components/buttons/simple"
import { RecentActivityCard } from "../../components/multimedia/cards/recentActivity"
import { useEffect, useState } from "react"
import { AppModal } from "../../components/modals/container"
import { MultimediaSliderModal } from "../multimediaSliderModal"
import { useAppDispatch, useAppSelector } from "../../common/hooks/useTypedSelectors"
import { UserActionsModal } from "../session/userActionsModal"
import { BlurAppModal } from "../../components/modals/blurContainer"
import { addUserIntoSession, createSocket, userJoinedSession, userLeftSession } from "../../store/redux/slices/userSession"
import { PLACE_SESSION_ACTIONS_ENUM, UPDATE_ACTIONS } from "../../models/session"
import { HandleActionCardType } from "../../components/actions/cards/handleActionType"
import { addActionToCurrentSession, addMultipleActionsToCurrentSession, addUserIntoCachedSession, removeUserFromCachedSession } from "../../store/redux/slices/spotSession"
import { AmountMindsetActions } from "../../components/mindsets/containers/amountMindsetActions"
import { QuickActionModal } from "../session/quickActionModal"
import { MINDSETS } from "../../models/mindsets"
import { AmountOfPeopleActionsAmount } from "../../components/amountOfPeople/containers"
import { HandleMindsetTags } from "../../components/tags/mindsets"
import { useTranslation } from 'react-i18next'

export const PlaceSessionDetail: React.FC = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch()
    const currentPlace = useAppSelector((state) => state.places.currentPlace);
    const { currentSessionActions, cachedSession } = useAppSelector((state) => state.spotSession);
    const { userData } = useAppSelector((state) => state.user);
    const { socket, sessionID } = useAppSelector((state) => state.userSession);

    const [recentActivityOpen, setRecentActivityOpen] = useState<boolean>(false);
    const [mediaSelectedIndex, setMediaSelectedIndex] = useState<number>(0);
    const [ userInSession, setUserInSession ] = useState(false)
    const [ joiningSessionLoader, setJoiningSessionLoader ] = useState(false)

    const [ leaveSessionModal, setLeaveSessionModal ] = useState(false)
    const [ updateSessionModal, setUpdateSessionModal ] = useState(false)
    const [ quickActionModal, setQuickActionModal ] = useState(false)
    const [ quickActionType, setQuickActionType ] = useState<UPDATE_ACTIONS>()
    const [ quickActionValue, setQuickActionValue ] = useState<string>()

    function handleRecentActivityOpen(index: number) {
        setMediaSelectedIndex(index)
        setRecentActivityOpen(true);
    }


    // =========================
    // ACCESS TO SESSION METHODS
    // =========================
    async function connectUserToSession(placeID: string) {
        setJoiningSessionLoader(true)
        if(!socket && userData) {
            await dispatch( createSocket({ placeID: placeID, userID: userData.id, username: userData.username }) )
        }
        if(!socket) {
            setJoiningSessionLoader(false)
            return
        }
        await socket?.joinSession()

        setJoiningSessionLoader(false)
    }

    function handleJoinSession() {
        if(!currentPlace) return
        connectUserToSession(currentPlace.id)
    }

    async function disconnectUserFromSession(sessionID: string) {
        if(!socket || !userData?.id) return
        setJoiningSessionLoader(true)
        await dispatch( userLeftSession() )
        await dispatch( removeUserFromCachedSession({ userID: userData.id }) )
        await socket.leaveSession(sessionID)
        setJoiningSessionLoader(false)
    }

    async function handleLeaveSession() {
        if(!currentPlace || !sessionID) return
        await disconnectUserFromSession(sessionID)
        setLeaveSessionModal(false)
        setUserInSession(false)
    }
  

    useEffect(() => {
        if(!socket) return
         socket?.onSessionMessage(async payload => {
            if(payload.type === PLACE_SESSION_ACTIONS_ENUM.JOIN) {
                if(userData?.id === payload.userID) {
                    await dispatch( userJoinedSession({ sessionID: payload.sessionID }) )
                    await dispatch( addUserIntoCachedSession({ user: userData }) )
                    setUserInSession(true)
                }

            } else if(payload.type === PLACE_SESSION_ACTIONS_ENUM.LEAVE) {
                if(userData?.id === payload.userID) {
                    await dispatch( userLeftSession() )
                    setUserInSession(false)
                }
            }
            if(payload.action) {
                dispatch( addActionToCurrentSession( { action: payload.action } ) )
            }

        })

    }, [socket])

    useEffect(() => {
        if(!socket) return
         socket?.onSessionUpdated(async payload => {
            dispatch( addMultipleActionsToCurrentSession(payload) )
        })
    }, [socket])

    // Method to check if the user is in the session
    // If the user is in the session, then we need to add the user into the session
    async function isUserInSession() {
        if(cachedSession?.usersInSession?.find(user => user.id === userData?.id)) {
            if(!currentPlace || !userData) return
            const sessionID = cachedSession.lastActions[0].placeSessionID
            await dispatch( userJoinedSession({ sessionID: sessionID }) )
            await dispatch( createSocket({ 
                placeID: currentPlace.id,
                userID: userData.id,
                username: userData.username,
                quickJoin: true, 
            }) )
            setUserInSession(true)
            return
        }
        setUserInSession(false)
    }

    useEffect(() => {
        isUserInSession()
    }, [cachedSession?.usersInSession])

    // ============================
    // QUICK UPDATE ACTIONS METHODS
    // ============================
    function handleMindsetQuickAction(actionType: UPDATE_ACTIONS, value: MINDSETS) {
        setQuickActionModal(true)
        setQuickActionType(actionType)
        setQuickActionValue(value)
    }

    function handleAmountOfPeopleQuickAction(actionType: UPDATE_ACTIONS, value: string) {
        setQuickActionModal(true)
        setQuickActionType(actionType)
        setQuickActionValue(value)
    }

    if(!currentPlace) return null;

    return (
        <IonRow className="relative w-full h-full overflow-hidden">
            {
                currentPlace?.sessionCachedData?.lastRecentlyActivities?.length > 0 && (
                    <section className="w-full border-b-[1px] border-gray-300 p-3">
                        <div className="inline mr-4">
                            <RecentActivityCard callback={() => handleRecentActivityOpen(0) } />
                        </div>
                    </section>
                )
            }

            <IonRow className="w-full h-3/6 p-3 pb-5 relative flex flex-col flex-nowrap border-b border-gray-300">
                {
                    cachedSession?.lastUpdate && (
                        (
                            <section className="my-1">
                                <h2 className="text-xs font-light">
                                   {t('spots.messages.session.lastUpdateAt')} <span className="font-light"> { new Date(cachedSession?.lastUpdate).toISOString() } </span>
                                </h2>
                            </section>
                        )
                    )
                }
                <section className="mb-3">
                    <h2 className="font-bold text-lg mb-1">{t('spots.session.perfectTo')}</h2>
                    {
                        userInSession ? (
                            <AmountMindsetActions mindsetCallback={handleMindsetQuickAction} />
                        ) : (
                            <HandleMindsetTags mindset={MINDSETS.UNKNOWN} />
                        )
                    }
                </section>

                <IonRow className="relative w-full flex flex-row mb-3">
                    <IonCol size="12">
                        <h2 className="font-bold text-lg">{t('spots.session.amountOfPeople')}:</h2>
                        <div className="my-1">
                            {
                                userInSession && (
                                    <AmountOfPeopleActionsAmount callback={handleAmountOfPeopleQuickAction} />
                                )
                            }
                        </div>
                    </IonCol>
                    <AvatarGroup users={cachedSession?.usersInSession || []} />
                </IonRow>
                <section className="w-full mb-2">
                    {/* <p className="font-regular text-xs my-3 text-left">Last update made 30 minutes ago</p> */}
                </section>
                {
                    userInSession ? (
                        <article className="flex flex-row flex-nowrap w-full items-center justify-start">
                            <div className="w-5/10">
                                <SimpleButton action={() => setUpdateSessionModal(true)} text={t('actions.session.update')} />
                            </div>
                            <span className="cursor-pointer text-red-500 underline ml-6" onClick={() => setLeaveSessionModal(true)}>
                                {t('actions.session.leave')}
                            </span>
                        </article>
                    ) : (
                        // JOIN SESSION BUTTON
                        <SimpleButton
                            action={handleJoinSession}
                            text={t('actions.session.join')}
                            loading={joiningSessionLoader}
                        />
                    )
                }
            </IonRow>

            <section className="relative w-full h-3/6 overflow-y-auto">
                <article className="relative w-full pt-3 border-solid border-b-[1px] border-gray-300">
                    <h2 className="w-full font-bold text-lg mb-1 pb-3 px-3">{t('spots.session.communityActions')}:</h2>
                </article>
                <section className="relative h-full flex flex-col flex-nowrap mb-3">
                        <ol className="w-full min-h-full h-auto my-3">
                            {
                                currentSessionActions.length > 0 ? (
                                    currentSessionActions.map((action, index) => {
                                        return (
                                            <li key={index}>
                                                <HandleActionCardType
                                                    action={action}
                                                />
                                            </li>
                                        )
                                    })
                                ) : (
                                    <li className="px-3">
                                        <p className="text-xs font-light px-3 py-3 w-full bg-gray-200">
                                            {t('spots.messages.noCommunityActions')}
                                        </p>
                                    </li>
                                )
                            }
                        </ol>
                </section>
            </section>


            {recentActivityOpen && (
                <AppModal>
                    <MultimediaSliderModal
                        images={currentPlace?.sessionCachedData?.lastRecentlyActivities || []}
                        closeCallback={() => setRecentActivityOpen(false)}
                        currentImage={mediaSelectedIndex}
                    />
                </AppModal>
            )}

            {
                updateSessionModal && (
                    <BlurAppModal>
                        <UserActionsModal closeCallback={() => setUpdateSessionModal(false)} />
                    </BlurAppModal>
                )
            }

            {
                quickActionModal && quickActionType && quickActionValue && (
                    <AppModal>
                        <QuickActionModal 
                            onCancel={() => setQuickActionModal(false)} 
                            actionType={quickActionType}
                            value={quickActionValue}
                        />
                    </AppModal>
                )
            }

            {
                leaveSessionModal && (
                    <AppModal>
                        <article className="w-full max-w-xs bg-white rounded-lg text-black p-6">
                                <h2 className="font-bold text-2xl">
                                    {t('spots.information.leaveTheSession')}
                                </h2>
                                <div className="w-full h-[1px] bg-black my-3"></div>
                                <p className="text-md font-light">
                                    {t('spots.messages.session.leaveSessionConfirmation')}
                                </p>

                                <div className="flex flex-col flex-nowrap w-full items-center justify-center mt-4">
                                    <SimpleButton action={handleLeaveSession} text={t('actions.session.leave')} />
                                    <span onClick={() => setLeaveSessionModal(false)} className="cursor-pointer font-light my-3 underline text-gray-600 text-sm">
                                        {t('actions.general.cancel')}
                                    </span>
                                </div>
                        </article>
                    </AppModal>
                )
            }
        </IonRow>
    )
}