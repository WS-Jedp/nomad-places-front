import { IonAvatar, IonCol, IonIcon, IonRouterLink, IonRow, IonText } from "@ionic/react";
import { arrowBack } from "ionicons/icons";

// This quickSession detail will only show what is going on in the place
// The page detail from a place or the session of a place should allow interact with it 
export const PlaceQuickSession: React.FC = () => {
  return (
    <IonRow
      className="
            relative
            w-full h-auto
            flex flex-col items-start justify-start
        "
    >
    {/* Go back action */}
      <IonRow
        className="
                relative
                flex flex-row w-full max-h-20 p-6 md:py-3
                items-center
                border-b border-gray-300
                mb-1
            "
      >
        <IonRouterLink className="text-md font-bold font-sans" routerLink="/home">
            <IonIcon icon={arrowBack} className="mr-1" />

            <IonText color="white" className="inline">
                Go back
            </IonText>
        </IonRouterLink>
      </IonRow>

      {/* Place Headers */}
      {/* Place information */}
      <IonRow class="w-full p-3 ion-no-padding border-b border-gray-300">
        <IonCol size="1">
          <IonAvatar color="white" className="bg-gray-300"></IonAvatar>
        </IonCol>
        <IonCol size="7">
            <IonRow className="flex flex-col justify-center items-start px-7 md:px-5">
                <IonText>
                    <h1 className="font-bold">Place name</h1>
                </IonText>
              
                <IonText>
                    <span className="text-xs font-light">Av. Pobaldo - 3,4 km </span>
                </IonText>
            </IonRow>
        </IonCol>
        <IonCol size="4">
            <IonRow className="
                w-full h-full
                flex flex-row
                items-center justify-center
            "
            >
                <IonText className="m-1">
                    See
                </IonText>
                <IonText className="m-1">
                    Subs
                </IonText>
            </IonRow>
        </IonCol>
      </IonRow>


    {/* Quick session data */}
      <IonRow className="w-full p-3 border-b border-gray-300">
            <IonText>
                <h3 className="text-lg font-bold">People In the session</h3>
            </IonText>
            <IonRow className="w-full flex flex-row flex-nowrap">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>+20</div>
                {/* Button to be part of the session and redirect the user */}
                <div>- Be part of it</div> 
            </IonRow>

            <IonText>
                <h3 className="text-lg font-bold">Status</h3>
            </IonText>
            <IonRow className="w-full flex flex-row flex-nowrap items-center">
                Open <span className="text-sm font-light">- Close at 18:00pm</span>
            </IonRow>

            <IonText>
                <h3 className="text-lg font-bold">Perfect Mindset</h3>
            </IonText>
            <IonRow className="w-full flex flex-row flex-nowrap items-center">
                Study
            </IonRow>
      </IonRow>
      
    {/* Last stories of the place */}
      <IonRow className="w-full p-3 border-b border-gray-300">
            {/* If  the router is not hard to do we should do it with tabs if not we can do render logic to apply it */}
            <IonText>
                <h3 className="text-lg font-bold">Recent Activity | Place Multimedia</h3>
            </IonText>
            
      </IonRow>

      {/* Tabs */}
      {/* Last stories */}
      {/* Quick information about the place */}
        {/* rules - Status - People in the place - People in the session - Tags of the place*/}
        {/* See more -> Redirect to Specific place detail page*/}
    </IonRow>
  );
};
