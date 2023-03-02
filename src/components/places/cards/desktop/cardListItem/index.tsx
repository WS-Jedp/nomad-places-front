import { IonAvatar, IonCol, IonItem, IonLabel, IonRow, IonText } from "@ionic/react"

export const PlaceCardListItemDesktop: React.FC = () => {

    return (
        <IonRow className="bg-none bg-white-300 flex items-center p-0 m-0 w-4/12 md:bg-white">
            <IonRow 
                className="
                    relative
                    w-full
                    flex flex-row flex-nowrap items-center justify-center
                    px-3
                "
            >
                <IonCol size="12" className="bg-gray-200 mr-1 w-32 h-32 rounded-md"></IonCol>
            </IonRow>
            <IonItem class="relative w-full p-0 ion-no-padding flex flex-col" color="none">
                
                <IonRow className="relative w-full p-3">
                    <IonRow class="w-full mb-3 ion-no-padding">
                        
                        <IonCol size="12" class="flex flex-col justify-center items-start">
                            <IonText>
                                <h1 className="font-bold text-black">H1 Heading</h1>
                            </IonText>
                            <IonText>
                                <p className="font-sans font-regular text-sm text-black">Paragraph</p>
                            </IonText>
                        </IonCol>
                    </IonRow>

                </IonRow>
            </IonItem>
        </IonRow>
    )
}