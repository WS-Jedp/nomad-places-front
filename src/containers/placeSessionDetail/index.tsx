import { IonCol, IonRow } from "@ionic/react"
import { AvatarGroup } from "../../components/avatar/group"
import { SimpleButton } from "../../components/buttons/simple"
import { RecentActivityCard } from "../../components/multimedia/cards/recentActivity"
import { CommunityCardAction } from "../../components/actions/cards/communityAction"
import { HandleMindsetTags } from "../../components/tags/mindsets"
import { MINDSETS } from "../../models/mindsets"

export const PlaceSessionDetail: React.FC = () => {

    return (
        <IonRow className="relative w-full h-auto">
            <section className="w-full border-b-[1px] border-gray-300 p-3">
                <div className="inline mr-4">
                    <RecentActivityCard />
                </div>
                <div className="inline mr-4">
                    <RecentActivityCard />
                </div>
                <div className="inline mr-4">
                    <RecentActivityCard />
                </div>
            </section>

            <IonRow className="w-full p-3 pb-5 relative flex flex-col flex-nowrap border-b border-gray-300">
                <section className="mb-3">
                    <h2 className="font-bold text-lg mb-1">Perfect to:</h2>
                    <div className="mr-1 inline">
                        <HandleMindsetTags mindset={MINDSETS.STUDY} />
                    </div>
                    <div className="mr-1 inline">
                        <HandleMindsetTags mindset={MINDSETS.WORK} />
                    </div>
                </section>

                <IonRow className="w-full relative flex flex-row mb-3">
                    <IonCol size="12">
                        <h2 className="font-bold text-lg">Amount of people:</h2>
                        <AvatarGroup users={[
                            {email: 'wemail@masl.com', id: '23sfdf2', username: 'User'},
                            {email: 'wemail@masl.com', id: '324234', username: 'User'},
                            {email: 'wemail@masl.com', id: 'sdfw2', username: 'User'},
                        ]} amountOfPeople={20}  />
                    </IonCol>
                </IonRow>
                <section className="w-full mb-2">
                    {/* <p className="font-regular text-xs my-3 text-left">Last update made 30 minutes ago</p> */}
                </section>
                <SimpleButton action={() => {}} text="Join" />
            </IonRow>

            <IonRow className="w-full py-3 pb-5 relative flex flex-col flex-nowrap">
                <section className="mb-3">
                    <h2 className="font-bold text-lg mb-1 px-3">Community Actions:</h2>
                    <CommunityCardAction />
                    <CommunityCardAction />
                    <CommunityCardAction />
                </section>

            </IonRow>
        </IonRow>
    )
}