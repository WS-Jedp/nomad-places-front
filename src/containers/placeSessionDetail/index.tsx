import { IonCol, IonRow } from "@ionic/react"
import { AvatarGroup } from "../../components/avatar/group"
import { SimpleButton } from "../../components/buttons/simple"
import { RecentActivityCard } from "../../components/multimedia/cards/recentActivity"
import { CommunityCardAction } from "../../components/actions/cards/communityAction"
import { HandleMindsetTags } from "../../components/tags/mindsets"
import { MINDSETS } from "../../models/mindsets"
import { useState } from "react"
import { AppModal } from "../../components/modals/container"
import { MultimediaSliderModal } from "../multimediaSliderModal"
import { useAppSelector } from "../../common/hooks/useTypedSelectors"
import { UserActionsModal } from "../session/userActionsModal"
import { BlurAppModal } from "../../components/modals/blurContainer"

export const PlaceSessionDetail: React.FC = () => {

    const currentPlace = useAppSelector((state) => state.places.currentPlace);

    const [recentActivityOpen, setRecentActivityOpen] = useState<boolean>(false);
    const [mediaSelectedIndex, setMediaSelectedIndex] = useState<number>(0);
    const [ userInSession, setUserInSession ] = useState(false)
    const [ leaveSessionModal, setLeaveSessionModal ] = useState(false)
    const [ updateSessionModal, setUpdateSessionModal ] = useState(false)

    function handleRecentActivityOpen(index: number) {
        setMediaSelectedIndex(index)
        setRecentActivityOpen(true);
    }

    function handleJoinSession() {
        setUserInSession(true)
    }

    function handleLeaveSession() {
        setLeaveSessionModal(false)
        setUserInSession(false)
    }

    if(!currentPlace) return null;

    return (
        <IonRow className="relative w-full h-auto">
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
                        <SimpleButton action={handleJoinSession} text="Join session" />
                    )
                }
            </IonRow>

            <IonRow className="w-full py-3 pb-5 relative flex flex-col flex-nowrap">
                <section className="mb-3">
                    <h2 className="font-bold text-lg mb-1 px-3">Community Actions:</h2>
                    {
                        currentPlace?.sessionCachedData?.lastActions.length > 0 ? (
                            currentPlace?.sessionCachedData?.lastActions.map((action, index) => {
                                return (
                                    <CommunityCardAction
                                        key={index}
                                    />
                                )
                            })
                        ) : (
                            <section className="p-3">
                                <p>
                                    There is no actions yet for this place :(
                                </p>
                            </section>
                        )
                    }
                    
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