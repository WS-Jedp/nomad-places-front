import { IonAvatar, IonCol, IonItem, IonRow, IonText } from "@ionic/react"
import { MdPeople } from "react-icons/md"
import { handleCardColor, handleMindsetIcon } from "../../../../../common/utils/icons/icons"
import { Place } from "../../../../../models/places"
import { PlaceWithCachedSession } from "../../../../../models/session"
import { HandleMultimediaCard } from "../../../../multimedia/cards/helpers/handleMultimediaCard"

interface PlaceCardListItemProps {
    place: PlaceWithCachedSession
    action: Function

}

export const PlaceCardListItemMobile: React.FC<PlaceCardListItemProps> = ({ place, action }) => {

    function handleClick (ev: React.MouseEvent<HTMLIonRowElement, MouseEvent>)  {
        ev.preventDefault()
        action()
    }

    function getAmountOfPeopleState() {
        const mostAmountOfPeople = place.sessionCachedData.amountOfPeople.reduce(
          (prev, curr) => (prev.actions.length > curr.actions.length ? prev : curr)
        );
        if (mostAmountOfPeople.actions.length === 0) return null;
        return mostAmountOfPeople.amount;
      }

    return (
        <IonRow className="bg-white text-black flex items-center p-0 m-0 w-full md:bg-white border-b border-t border-solid border-gray-100">
            <IonItem class="relative w-full p-0 ion-no-padding flex flex-col" color="none">
                <IonRow className="relative w-full p-3" >

                    {/* Place information */}
                    <IonRow class="w-full mb-3 ion-no-padding text-black" onClick={handleClick}>
                        <IonCol size="2">
                            <IonAvatar className="bg-gray-300 mr-3">
                            </IonAvatar>
                        </IonCol>
                        <IonCol size="10" class="pl-3 flex flex-row justify-center items-start">
                            <IonCol size="9">
                                <IonText>
                                    <h1 className="font-bold">{place.name}</h1>
                                </IonText>
                                <IonText>
                                {getAmountOfPeopleState() && (
                                    <span className="flex flex-row flex-nowrap items-center justify-center font-sans font-regular text-[12px] capitalize mt-1 px-3 border border-black rounded-lg max-w-[90px]">
                                        {getAmountOfPeopleState()}{" "}
                                        {<MdPeople className="mx-1" size={12} />}
                                    </span>
                                    )}
                                </IonText>
                                <IonText>
                                    <span className="text-xs font-light">3,4 km </span>
                                </IonText>
                            </IonCol>
                            <IonCol size="3">
                                <IonRow class="flex flex-row flex-nowrap items-end justify-end">
                                    {
                                        place.knownFor && (
                                            <div className={`opacity-90 rounded-full flex items-center justify-center p-2 ${handleCardColor(place.knownFor)}`}>
                                                {place.knownFor && handleMindsetIcon(place.knownFor, 15)}
                                            </div>
                                        )
                                    }
                                </IonRow>
                            </IonCol>
                        </IonCol>
                    </IonRow>

                    {/* Multimedia */}
                    <IonRow 
                        className="
                            relative
                            w-full
                            flex flex-row flex-nowrap items-center justify-start
                            px-1
                        "
                    >
                        {
                            place.multimedia?.length > 0 && place.multimedia.map((media, index) => (
                                <IonCol size="4" className="bg-gray-200 mr-2 w-24 h-32 rounded-md" key={index}>
                                    <HandleMultimediaCard url={media.url} type={media.type} />
                                </IonCol>
                            ))
                        }
                    </IonRow>
                </IonRow>
            </IonItem>
        </IonRow>
    )
}