import { IonAvatar, IonCol, IonItem, IonRow, IonText } from "@ionic/react"
import { Place } from "../../../../../models/places"
import { HandleMultimediaCard } from "../../../../multimedia/cards/helpers/handleMultimediaCard"

interface PlaceCardListItemProps {
    place: Place
    action: Function

}

export const PlaceCardListItemMobile: React.FC<PlaceCardListItemProps> = ({ place, action }) => {

    function handleClick (ev: React.MouseEvent<HTMLIonRowElement, MouseEvent>)  {
        ev.preventDefault()
        action()
    }

    return (
        <IonRow className="bg-none bg-white-300 flex items-center p-0 m-0 w-full md:bg-white">
            <IonItem class="relative w-full p-0 ion-no-padding flex flex-col" color="none">
                <IonRow className="relative w-full p-3" >

                    {/* Place information */}
                    <IonRow class="w-full mb-3 ion-no-padding" onClick={handleClick}>
                        <IonCol size="2">
                            <IonAvatar color="white" className="bg-gray-300 mr-3">
                            </IonAvatar>
                        </IonCol>
                        <IonCol size="10" class="flex flex-col justify-center items-start">
                            <IonText>
                                <h1 className="font-bold">{place.name}</h1>
                            </IonText>
                            <IonText>
                                <p className="font-sans font-regular text-sm capitalize">
                                    {/* { place.type[0] } - 20+ people */}
                                    20+ people
                                </p>
                            </IonText>
                            <IonText>
                                <span className="text-xs font-light">3,4 km </span>
                            </IonText>
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