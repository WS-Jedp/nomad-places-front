import {
  IonAvatar,
  IonCol,
  IonContent,
  IonIcon,
  IonRouterLink,
  IonRow,
  IonText,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useState } from "react";

import { StoryMultimediaCard } from "../../components/multimedia/stories/cards";

// This quickSession detail will only show what is going on in the place
// The page detail from a place or the session of a place should allow interact with it
export const PlaceQuickSession: React.FC = () => {
  const [isRecentActivity, setIsRecentActivity] = useState<boolean>(true);

  return (
    <section
      className="
            relative
            w-full h-screen
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
        <IonRouterLink
          className="text-md font-bold font-sans"
          routerLink="/home"
        >
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
          <IonRow className="h-full flex flex-col justify-center px-7 md:px-5">
            <IonText>
              <h1 className="font-bold">Place name</h1>
            </IonText>
            <IonText>
              <span className="text-xs font-light">Av. Pobaldo - 3,4 km </span>
            </IonText>
          </IonRow>
        </IonCol>
        <IonCol size="4">
          <IonRow
            className="
                w-full h-full
                flex flex-row
                items-center justify-center
            "
          >
            <IonText className="m-1">See</IonText>
            <IonText className="m-1">Subs</IonText>
          </IonRow>
        </IonCol>
      </IonRow>


    {/* Scrollable data */}
      <section className="
        relative flex flex-col w-full h-full overflow-y-auto mb-3
      ">
        {/* Quick session data */}
        <IonRow className="flex flex-col w-full p-3 border-b border-gray-300">
            {/* People in the sesion */}
            <article className="mb-3">
                <IonText>
                    <h3 className="text-lg font-bold">People In the session</h3>
                </IonText>
                <IonRow className="w-full flex flex-row flex-nowrap items-center justify-between">
                    <div className="mr-6 flex flex-row flex-nowrap items-center justify-center">
                        <figure className="relative inline-flex w-8 h-8 rounded-full bg-gray-300 mr-[-9px] shadow-md"></figure>
                        <figure className="relative inline-flex w-8 h-8 rounded-full bg-gray-300 mr-[-9px] shadow-md"></figure>
                        <figure className="relative inline-flex w-8 h-8 rounded-full bg-gray-300 mr-[-9px] shadow-md"></figure>
                        <figure className="relative inline-flex w-8 h-8 rounded-full bg-gray-300 mr-[-9px] shadow-md"></figure>
                        <strong className="mx-4 font-semibold text-sm">+20</strong>
                    </div>
                    {/* Button to be part of the session and redirect the user */}
                    <div>
                        <button>Join</button>
                    </div>
                </IonRow>
            </article>

            {/* Status information */}
            <IonRow className="mt-3">
                <IonCol size="6">
                    <IonText>
                        <h3 className="text-lg font-bold">Status</h3>
                        </IonText>
                        <IonRow className="w-full flex flex-row flex-nowrap items-center">
                        Open <span className="text-sm font-light">- Close at 18:00pm</span>
                    </IonRow>
                </IonCol>
                <IonCol size="6">
                    <IonText>
                        <h3 className="text-lg font-bold">Perfect Mindset</h3>
                    </IonText>
                    <IonRow className="w-full flex flex-row flex-nowrap items-center">
                        Study
                    </IonRow>
                </IonCol>
            </IonRow>


        </IonRow>

        {/* Last stories of the place */}
        <IonRow className="w-full h-auto border-b border-gray-300">
            {/* If  the router is not hard to do we should do it with tabs if not we can do render logic to apply it */}
            <IonRow className="relative w-full h-auto">
            <IonCol size="6" onClick={() => setIsRecentActivity(true)}>
                <section
                className={`
                            h-full
                            flex items-center justify-center 
                            cursor-pointer hover:bg-gray-200 p-3
                            ${isRecentActivity ? "bg-gray-200" : ""}
                        `}
                >
                <h2 className={`${isRecentActivity ? "font-bold" : ""}`}>
                    Recent Activity
                </h2>
                </section>
            </IonCol>
            <IonCol size="6" onClick={() => setIsRecentActivity(false)}>
                <section
                className={`
                            h-full
                            flex items-center justify-center 
                            cursor-pointer hover:bg-gray-200 p-3
                            ${!isRecentActivity ? "bg-gray-200" : ""}
                        `}
                >
                <h2 className={`${!isRecentActivity ? "font-bold" : ""}`}>
                    Place multimedia
                </h2>
                </section>
            </IonCol>
            </IonRow>
        </IonRow>

        {/* Multimedia grid */}
        <article className="relative w-full h-auto py-3 flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden">
            <StoryMultimediaCard />
            <StoryMultimediaCard />
            <StoryMultimediaCard />
        </article>
        </section>
      </section>

  );
};
