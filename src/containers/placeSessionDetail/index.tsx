import { IonCol, IonRow } from "@ionic/react"
import { AvatarGroup } from "../../components/avatar/group"
import { SimpleButton } from "../../components/buttons/simple"
import { RecentActivityCard } from "../../components/multimedia/cards/recentActivity"
import { HandleMindsetTags } from "../../components/tags/mindsets"
import { MINDSETS } from "../../models/mindsets"
import { useEffect, useState } from "react"
import { AppModal } from "../../components/modals/container"
import { MultimediaSliderModal } from "../multimediaSliderModal"
import { useAppDispatch, useAppSelector } from "../../common/hooks/useTypedSelectors"
import { UserActionsModal } from "../session/userActionsModal"
import { BlurAppModal } from "../../components/modals/blurContainer"
import { addUserIntoSession, createSocket, userJoinedSession, userLeftSession } from "../../store/redux/slices/userSession"
import { PLACE_SESSION_ACTIONS_ENUM } from "../../models/session"
import { HandleActionCardType } from "../../components/actions/cards/handleActionType"
import { addActionToCurrentSession, addMultipleActionsToCurrentSession } from "../../store/redux/slices/spotSession"

export const PlaceSessionDetail: React.FC = () => {

    const dispatch = useAppDispatch()
    const currentPlace = useAppSelector((state) => state.places.currentPlace);
    const { currentSessionActions } = useAppSelector((state) => state.spotSession);
    const { userData } = useAppSelector((state) => state.user);
    const { socket, sessionID } = useAppSelector((state) => state.userSession);

    const [recentActivityOpen, setRecentActivityOpen] = useState<boolean>(false);
    const [mediaSelectedIndex, setMediaSelectedIndex] = useState<number>(0);
    const [ userInSession, setUserInSession ] = useState(false)
    const [ joiningSessionLoader, setJoiningSessionLoader ] = useState(false)

    const [ leaveSessionModal, setLeaveSessionModal ] = useState(false)
    const [ updateSessionModal, setUpdateSessionModal ] = useState(false)

    function handleRecentActivityOpen(index: number) {
        setMediaSelectedIndex(index)
        setRecentActivityOpen(true);
    }


    async function connectUserToSession(placeID: string) {
        setJoiningSessionLoader(true)
        if(!socket && userData) {
            await dispatch( createSocket({ placeID: placeID, userID: userData.id, username: userData.username }) )
        }
        if(!socket) return
        await socket?.joinSession()

        setJoiningSessionLoader(false)
    }

    function handleJoinSession() {
        if(!currentPlace) return
        connectUserToSession(currentPlace.id)
    }

    async function disconnectUserFromSession(sessionID: string) {
        if(!socket) return
        setJoiningSessionLoader(true)
        await dispatch( userLeftSession() )
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
        if(userInSession) return

        const userJOINAction = currentSessionActions.find(action => action.type === PLACE_SESSION_ACTIONS_ENUM.JOIN && action.userID === userData?.id)

        if(userJOINAction) {
            const userLeaveSession = currentSessionActions.find(action => action.type === PLACE_SESSION_ACTIONS_ENUM.LEAVE && action.userID === userData?.id)
            if(!userLeaveSession) {
                if(!currentPlace || !userData) return

                await dispatch( createSocket({ 
                    placeID: currentPlace.id,
                    userID: userData.id,
                    username: userData.username,
                    quickJoin: true, 
                }) )
                await dispatch( addUserIntoSession({ sessionID: userJOINAction.placeSessionID }) )
                setUserInSession(true)
            }
        }
    }

    useEffect(() => {
        isUserInSession()
    }, [currentSessionActions])

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

            <IonRow className="w-full p-3 pb-5 relative flex flex-col flex-nowrap border-b border-gray-300">
                <section className="mb-3">
                    <h2 className="font-bold text-lg mb-1">Perfect to:</h2>
                    <div className="mr-1 inline">
                        <HandleMindsetTags mindset={currentPlace.sessionCachedData?.bestMindsetTo || MINDSETS.UNKNOWN} />
                    </div>
                </section>

                <IonRow className="w-full relative flex flex-row mb-3">
                    <IonCol size="12">
                        <h2 className="font-bold text-lg">Amount of people:</h2>
                        <AvatarGroup users={[]} amountOfPeople={20}  />
                    </IonCol>
                </IonRow>
                <section className="w-full mb-2">
                    {/* <p className="font-regular text-xs my-3 text-left">Last update made 30 minutes ago</p> */}
                </section>
                {
                    userInSession ? (
                        <article className="flex flex-row flex-nowrap w-full items-center justify-start">
                            <div className="w-5/10">
                                <SimpleButton action={() => setUpdateSessionModal(true)} text="Update session" />
                            </div>
                            <span className="cursor-pointer text-red-500 underline ml-6" onClick={() => setLeaveSessionModal(true)}>
                                Leave the sesion
                            </span>
                        </article>
                    ) : (
                        // JOIN SESSION BUTTON
                        joiningSessionLoader ? (
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25 bg-blue-500" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <SimpleButton action={handleJoinSession} text="Join session" />
                        )
                    )
                }
            </IonRow>

            <IonRow className="w-full py-3 pb-5 relative flex flex-col flex-nowrap">
                <section className="mb-3">
                    <h2 className="font-bold text-lg mb-1 pb-3 px-3  border-solid border-b-[1px] border-gray-300">Community Actions:</h2>
                    <ol className="w-full h-screen overflow-y-auto mt-3">
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
                                        There are no actions shared by the community yet
                                    </p>
                                </li>
                            )
                        }
                    </ol>
                </section>
            </IonRow>

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
                leaveSessionModal && (
                    <AppModal>
                        <article className="w-full max-w-xs bg-white rounded-lg text-black p-6">
                                <h2 className="font-bold text-2xl">
                                    Leave The Session
                                </h2>
                                <div className="w-full h-[1px] bg-black my-3"></div>
                                <p className="text-md font-light">
                                    Are you sure you want to leave the session?
                                </p>

                                <div className="flex flex-col flex-nowrap w-full items-center justify-center mt-4">
                                    <SimpleButton action={handleLeaveSession} text="Leave" />
                                    <span onClick={() => setLeaveSessionModal(false)} className="cursor-pointer font-light my-3 underline text-gray-600 text-sm">
                                        Cancel
                                    </span>
                                </div>
                        </article>
                    </AppModal>
                )
            }
        </IonRow>
    )
}