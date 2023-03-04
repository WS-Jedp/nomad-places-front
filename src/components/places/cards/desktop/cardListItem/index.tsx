import {  IonCol, IonItem, IonRow, IonText } from "@ionic/react"
import { MULTIMEDIA_TYPE } from "../../../../../models/multimedia"
import { PlaceCardMultimediaSlider } from '../../../../slider/placeCardMultimedia'

export const PlaceCardListItemDesktop: React.FC = () => {

    const handlePlaceClick = () => {
        console.log("I jsut click this thing!")
    }


    return (
        <IonRow className="bg-none bg-white-300 flex items-center p-0 m-0 w-4/12 md:bg-white" onClick={() => handlePlaceClick()}>
            <IonRow 
                className="
                    relative
                    w-full
                    flex flex-row flex-nowrap items-center justify-center
                    px-3
                "
            > 

                <PlaceCardMultimediaSlider 
                    multimedia={ [{ type: MULTIMEDIA_TYPE.IMAGE, url: "HELLO WORLD" }, { type: MULTIMEDIA_TYPE.VIDEO, url: "HELLO WORLD" }] }
                />
              
            </IonRow>
            <IonItem class="relative w-full p-0 ion-no-padding flex flex-col" color="none">
                
                <IonRow className="relative w-full p-3">
                    <IonRow class="w-full mb-3 ion-no-padding">
                        
                        <IonCol size="12" class="flex flex-col justify-center items-start">
                            <IonText>
                                <h1 className="font-bold text-black">Name of the place</h1>
                            </IonText>
                            <IonText>
                                <p className="font-sans font-regular text-sm text-black">
                                    Type of place - 20+ people
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