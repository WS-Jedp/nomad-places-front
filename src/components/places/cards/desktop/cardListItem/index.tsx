import {  IonCol, IonItem, IonRow, IonText } from "@ionic/react"
import { useHistory } from "react-router-dom"
import { Place } from "../../../../../models/places"
import { PlaceCardMultimediaSlider } from '../../../../slider/placeCardMultimedia'

interface PlaceCardListItemProps {
    place: Place
}


export const PlaceCardListItemDesktop: React.FC<PlaceCardListItemProps> = ({ place }) => {

    const history = useHistory()

    return (
        <IonRow className="bg-none bg-white-300 flex items-center p-0 m-0 w-4/12 md:bg-white" onClick={() => history.push(`/home/detail/${place.id}`)}>
            <IonRow 
                className="
                    relative
                    w-full
                    flex flex-row flex-nowrap items-center justify-center
                    px-3
                "
            > 
                <PlaceCardMultimediaSlider 
                    multimedia={ place.multimedia }
                />
            </IonRow>
            <IonItem class="relative w-full p-0 ion-no-padding flex flex-col" color="none">
                
                <IonRow className="relative w-full p-3">
                    <IonRow class="w-full mb-3 ion-no-padding">
                        
                        <IonCol size="12" class="flex flex-col justify-center items-start">
                            <IonText>
                                <h1 className="font-bold text-black">{ place.name }</h1>
                            </IonText>
                            <IonText>
                                <p className="font-sans font-regular text-sm text-black capitalize">
                                    <span className="capitalize">{ place.type[0] }</span> - 20+ people
                                </p>
                            </IonText>
                            <IonText>
                                <span className="text-xs text-black font-light">3,4 km </span>
                            </IonText>
                        </IonCol>
                    </IonRow>
                </IonRow>
            </IonItem>
        </IonRow>
    )
}