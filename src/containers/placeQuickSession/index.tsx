import {
  IonAvatar,
  IonCol,
  IonIcon,
  IonRouterLink,
  IonRow,
  IonText,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { MultimediaMasonryGrid } from "../../components/multimedia/grid/masonry";

import { QuickPlaceDetailRecentActivitySlider } from "../../components/slider/quickPlaceDetail/recentActivity";
import { SimpleButton } from "../../components/buttons/simple";
import { HandleMindsetTags } from "../../components/tags/mindsets";
import { MINDSETS } from "../../models/mindsets";
import { HandlePlaceStatus } from "../../components/tags/placeStatus";
import { PLACE_STATUS } from "../../models/placeStatus";
import { AvatarGroup } from "../../components/avatar/group";
import { useAppDispatch, useAppSelector } from "../../common/hooks/useTypedSelectors";
import { MdArrowBack } from "react-icons/md";
import { BackNavigationButton } from "../../components/buttons/navigation/goBack";
import { createSocket } from "../../store/redux/slices/userSession";


interface PlaceQuickSessionProps {
  changePageCallback: Function
}

// This quickSession detail will only show what is going on in the place
// The page detail from a place or the session of a place should allow interact with it
export const PlaceQuickSession: React.FC<PlaceQuickSessionProps> = ({ changePageCallback }) => {
  const history = useHistory();
  const dispatch = useAppDispatch()
  const { currentPlace } = useAppSelector((state) => state.places);
  const { userData } = useAppSelector((state) => state.user);
  const { socket } = useAppSelector((state) => state.userSession);
  const [isRecentActivity, setIsRecentActivity] = useState<boolean>(false);

  function handleNoCurrentPlace() {
    return history.goBack();
  }

  async function handleUserSession() {
    if(!userData || !currentPlace) return

    if(!socket) {
      await dispatch( createSocket({ userID: userData.id, placeID: currentPlace?.id, username: userData.username }) )
    }

    if(!socket) return

    await socket.quickReview()
    await socket.onQuickReviewUpdate(quickReview => {
      console.log(quickReview, "THIS IS THE QUICK REVIEW")
    })
  }

  function handlePlaceOpenStatus(): PLACE_STATUS {
    if(!currentPlace) return PLACE_STATUS.CLOSED

    const currentTime = new Date()
    const closedAt = currentPlace.rules.closedAt.split(':')
    const openAt = currentPlace.rules.openAt.split(':')

    if(currentTime.getHours() >= Number(openAt[0])) {
      if(currentTime.getMinutes() >= Number(openAt[1])) {
        if(currentTime.getHours() <= Number(closedAt[0])) {
          if(currentTime.getMinutes() <= Number(closedAt[1])) {
            return PLACE_STATUS.OPEN
          }
        }
      }
    }
    return PLACE_STATUS.CLOSED
  }

  function handlePlaceLocation() {
    if(!currentPlace) return null
    let location = ""

    if(currentPlace.location.zone) location += currentPlace.location.zone
    if(currentPlace.location.city) location += `, ${currentPlace.location.city}`
    if(currentPlace.location.country) location += `, ${currentPlace.location.country}`

    return location
  }

  useEffect(() => {
    if(!currentPlace) handleNoCurrentPlace()
    // console.log(currentPlace)
    handleUserSession()
  }, []);

  useEffect(() => {
    handleUserSession()
  }, [socket])


  function handleInformationButton(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.preventDefault()
    if (!currentPlace) handleNoCurrentPlace()
    else {
      changePageCallback(currentPlace.id)
    }
  }

  return (
    <section
      className="
            relative
            w-full h-screen
            flex flex-col items-start justify-start
            text-black
        "
    >
      {/* Go back action */}
      <IonRow
        className="
                relative
                flex flex-row w-full h-16 p-6 md:py-3
                items-center
                border-b border-gray-300
                mb-1
            "
      >
        <BackNavigationButton />
      </IonRow>

      {/* Place Headers */}
      {/* Place information */}
      <IonRow class="w-full p-3 ion-no-padding border-b border-gray-300 shadow-sm">
        <IonCol size="8">
          <IonRow className="h-full flex flex-col justify-center">
            <IonText>
              <h1 className="font-bold text-lg md:text-xl">{currentPlace?.name}</h1>
            </IonText>
            <IonText>
              <span className="text-xs font-light">{handlePlaceLocation()} </span>
              {/* Distance from current location */}
              {/* <span>- 3,4 km</span> */}
            </IonText>
          </IonRow>
        </IonCol>
        <IonCol size="4">
          <IonRow
            className="
                w-full h-full
                flex flex-row flex-nowrap
                items-center justify-center
            "
          >
            <SimpleButton text="Information" action={handleInformationButton} />
            {/* <SimpleButton text="Subscribe" action={(ev) => {}} /> */}
          </IonRow>
        </IonCol>
      </IonRow>

      {/* Scrollable data */}
      <IonRow
        className="
        relative w-full h-full overflow-y-auto mb-9
      "
      >
        {/* Quick session data */}
        <IonRow className="flex flex-col w-full p-3 border-b border-gray-300">
          {/* People in the sesion */}
          <article className="mb-3">
            <IonText>
              <h3 className="text-lg font-bold">People In the session</h3>
            </IonText>
            <IonRow className="w-full flex flex-row flex-nowrap items-center pt-3 md:pt-2">
              <AvatarGroup
                users={currentPlace?.sessionCachedData?.usersInSession || []}
                amountOfPeople={
                  currentPlace?.sessionCachedData?.amountOfPeople || 0
                }
              />
              {/* Button to join quickly to the session of the place, temporarily commented */}
              {/* <SimpleButton text="Join" action={(ev) => {}} /> */}
            </IonRow>
          </article>

          {/* ------------------------- */}
          {/* Status of the place in the session */}
          <IonRow className="mt-3">
            <IonCol size="6">
              <IonText>
                <h3 className="text-lg font-bold">Status</h3>
              </IonText>
              <IonRow className="w-full flex flex-row flex-nowrap items-center">
                <HandlePlaceStatus
                  status={
                    handlePlaceOpenStatus()
                  }
                />
                <span className="text-sm font-light ml-1">
                  Close at {currentPlace?.rules?.closedAt}
                </span>
              </IonRow>
            </IonCol>

            {/* ------------------------- */}
            {/* Mindset of the session */}
            <IonCol size="6">
              <IonText>
                <h3 className="text-lg font-bold">Known for</h3>
              </IonText>
              <IonRow className="w-full flex flex-row flex-nowrap items-center">
                <HandleMindsetTags mindset={currentPlace?.knownFor || MINDSETS.UNKNOWN} />
              </IonRow>
            </IonCol>
          </IonRow>
        </IonRow>

        {/* ------------------------- */}
        {/* Last stories of the place */}
        <IonRow className="w-full h-auto max-h-12 border-b border-gray-300">
          {/* If  the router is not hard to do we should do it with tabs if not we can do render logic to apply it */}
          <IonRow className="relative w-full h-auto">
            <IonCol size="12" onClick={() => setIsRecentActivity(false)}>
              <section
                className={`
                            h-full
                            flex items-center justify-center 
                            cursor-pointer hover:bg-gray-200 p-3
                        `}
              >
                <h2 className={`${!isRecentActivity ? "font-bold" : ""}`}>
                  Place multimedia
                </h2>
              </section>
            </IonCol>
            {/* <IonCol size="6" onClick={() => setIsRecentActivity(true)}>
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
            </IonCol> */}
          </IonRow>
        </IonRow>

        {/* Multimedia grid */}
        <IonRow className="w-full h-full p-3 flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden">
          {isRecentActivity ? (
            currentPlace?.sessionCachedData?.lastRecentlyActivities?.length ? (
              <QuickPlaceDetailRecentActivitySlider
                recentActivity={
                  currentPlace?.sessionCachedData?.lastRecentlyActivities || []
                }
              />
            ) : (
              <p>There is no recent activity</p>
            )
          ) : (
            <MultimediaMasonryGrid
              multimedia={currentPlace?.multimedia || []}
            />
          )}
        </IonRow>
      </IonRow>
    </section>
  );
};
