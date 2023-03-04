import { IonAvatar, IonCol, IonItem, IonLabel, IonRow, IonText } from "@ionic/react"

export const PlaceCardListItemMobile: React.FC = () => {

    return (
        <IonRow className="bg-none bg-white-300 flex items-center p-0 m-0 w-full md:bg-white">
            <IonItem class="relative w-full p-0 ion-no-padding flex flex-col" color="none">
                <IonRow className="relative w-full p-3">
                    <IonRow class="w-full mb-3 ion-no-padding">
                        <IonCol size="2">
                            <IonAvatar color="white" className="bg-gray-300 mr-3">
                            </IonAvatar>
                        </IonCol>
                        <IonCol size="10" class="flex flex-col justify-center items-start">
                            <IonText>
                                <h1 className="font-bold">Name of the place</h1>
                            </IonText>
                            <IonText>
                                <p className="font-sans font-regular text-sm">
                                    Type of place - 20+ people
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
                            flex flex-row flex-nowrap items-center justify-center
                            px-3
                        "
                    >
                        <IonCol size="4" className="bg-gray-200 mr-1 w-32 h-32 rounded-md"></IonCol>
                        <IonCol size="4" className="bg-gray-200 mr-1 w-32 h-32 rounded-md"></IonCol>
                        <IonCol size="4" className="bg-gray-200 mr-1 w-32 h-32 rounded-md"></IonCol>
                    </IonRow>
                </IonRow>
            </IonItem>
        </IonRow>
    )
}