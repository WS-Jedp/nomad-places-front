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
import {
  useAppDispatch,
  useAppSelector,
} from "../../common/hooks/useTypedSelectors";
import { MdArrowBack } from "react-icons/md";
import { BackNavigationButton } from "../../components/buttons/navigation/goBack";
import { createSocket } from "../../store/redux/slices/userSession";
import { computeDistanceToSpot } from "../../common/utils/geoLocation";
import { useDistanceToSpot } from "../../common/hooks/useDistanceToSpot";
import { useTranslation } from "react-i18next";
import { PLACE_CONFIRMATION_STATUS } from "../../models/places";
import {
  IoIosInformation,
  IoIosInformationCircle,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { ConfirmPlaceDiscoveredModal } from "../discoveredPlaces/modals/confirmPlaceDiscovered";
import { newSpotDiscoveredConfirmedDTO } from "../../dto/places";
import { SpotApprovedSuccessfulModal } from "../discoveredPlaces/modals/spotApprovedSuccessful";
import { SpotConfirmedSuccessfulModal } from "../discoveredPlaces/modals/spotConfirmedSuccessful";
import {
  addDiscoverSpotIntoNearPlaces,
  approvedCurrentPlace,
  updateCurrentPlace,
} from "../../store/redux/slices/places";
import { AppModal } from "../../components/modals/container";
import { MultimediaSliderModal } from "../multimediaSliderModal";
import { useUserPermissions } from "../../common/hooks/useUserPermissions";
import { SimpleTag } from "../../components/tags/simpleTag";
import { AvatarSingleCircle } from "../../components/avatar/singleCircle";
import { useIsMobile } from "../../common/hooks/useIsMobile";

interface PlaceQuickSessionProps {
  changePageCallback?: Function;
}

// This quickSession detail will only show what is going on in the place
// The page detail from a place or the session of a place should allow interact with it
export const PlaceQuickSession: React.FC<PlaceQuickSessionProps> = ({
  changePageCallback,
}) => {
  const { t } = useTranslation();

  const {
    canApproveDiscoveredPlaces,
    canAuthSession,
    canViewPlaceRealTimeData,
  } = useUserPermissions();

  const history = useHistory();
  const dispatch = useAppDispatch();
  const { currentPlace } = useAppSelector((state) => state.places);
  const { userData, location: userLocation } = useAppSelector(
    (state) => state.user
  );
  const { socket } = useAppSelector((state) => state.userSession);
  const [confirmSpot, setConfirmSpot] = useState<boolean>(false);
  const [isSpotConfirmed, setIsSpotConfirmed] = useState<boolean>(false);
  const [isSpotApproved, setIsSpotApproved] = useState<boolean>(false);
  const [isRecentActivity, setIsRecentActivity] = useState<boolean>(false);

  const [multimediaModalOpen, setMultimediaModalOpen] =
    useState<boolean>(false);
  const [multimediaSelected, setMultimediaSelected] = useState<number>();

  const [isMobile] = useIsMobile();

  function handleOnMultimediaSelected(index: number) {
    setMultimediaSelected(index);
    setMultimediaModalOpen(true);
  }

  const [distanceToSpot] = useDistanceToSpot(currentPlace?.location);

  function handleConfirmSpot() {
    setConfirmSpot(!confirmSpot);
  }
  async function handleOnConfirmSpot(spotState: newSpotDiscoveredConfirmedDTO) {
    closeConfirmSpot();
    if (spotState.placeApproved) {
      await dispatch(approvedCurrentPlace());
      await dispatch(updateCurrentPlace(spotState.place));
      return setIsSpotApproved(true);
    }
    setIsSpotConfirmed(true);
  }

  function closeConfirmSpot() {
    setConfirmSpot(false);
  }

  function handleNoCurrentPlace() {
    return history.goBack();
  }

  function onDiscoveredBy(id?: string) {
    return history.push(`/profile/${id}`);
  }

  async function handleUserSession() {
    if (!userData || !currentPlace) return;

    if (!socket) {
      await dispatch(
        createSocket({
          userID: userData.id,
          placeID: currentPlace?.id,
          username: userData.username,
        })
      );
    }

    if (!socket) return;

    await socket.quickReview();
    await socket.onQuickReviewUpdate((quickReview) => {
      // console.log(quickReview, "THIS IS THE QUICK REVIEW");
    });
  }

  function isOpenNow(): PLACE_STATUS {
    const openAt = currentPlace?.rules.openAt;
    const closedAt = currentPlace?.rules.closedAt;
    if (!currentPlace || !closedAt || !openAt) return PLACE_STATUS.CLOSED;

    // Get the current time
    const now = new Date();
    const currentTime = now.getHours() + now.getMinutes() / 60; // Convert current time to decimal hours

    // Convert openHour and closedHour to decimal hours
    const [openHours, openMinutes] = openAt.split(":").map(Number);
    const [closedHours, closedMinutes] = closedAt.split(":").map(Number);
    const openTimeDecimal = openHours + openMinutes / 60;
    const closedTimeDecimal = closedHours + closedMinutes / 60;

    // Check if current time is within the open hours
    return currentTime >= openTimeDecimal && currentTime < closedTimeDecimal
      ? PLACE_STATUS.OPEN
      : PLACE_STATUS.CLOSED;
  }

  function handlePlaceLocation() {
    if (!currentPlace) return null;
    let location = "";

    if (currentPlace.location.zone) location += currentPlace.location.zone;
    if (currentPlace.location.city)
      location += `, ${currentPlace.location.city}`;
    if (currentPlace.location.country)
      location += `, ${currentPlace.location.country}`;

    return location.length > 0 ? location + " - " : location;
  }

  useEffect(() => {
    if (!currentPlace) handleNoCurrentPlace();
    // console.log(currentPlace)
    handleUserSession();
  }, []);

  useEffect(() => {
    handleUserSession();
  }, [socket]);

  function handleInformationButton(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (!changePageCallback) return;
    ev.preventDefault();
    if (!currentPlace) handleNoCurrentPlace();
    else {
      changePageCallback(currentPlace.id);
    }
  }

  return (
    <section
      className="
            relative
            w-full h-full
            flex flex-col items-start justify-start
            text-black
        "
    >
      {/* Go back action */}
      {!isMobile && (
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
      )}

      {/* Scrollable section */}
      <section className="w-full h-auto overflow-y-auto">
        {/* Place Headers */}
        {canApproveDiscoveredPlaces() &&
          currentPlace?.confirmationStatus &&
          currentPlace?.confirmationStatus ===
            PLACE_CONFIRMATION_STATUS.RECOMMENDED && (
            <IonRow class="w-full px-3 py-2 ion-no-padding border-b border-gray-300 shadow-sm">
              <IonCol size="12">
                <IonRow className="h-auto flex flex-col justify-center">
                  <h1 className="font-light text-sm flex flex-row items-center bg-indigo-50 px-3 py-3 rounded-md">
                    <IoIosInformationCircleOutline size={21} className="mr-1" />
                    <span>
                      {t("messages.discover.spot.stage.recommendation")}.{" "}
                      <span
                        className="underline font-semibold cursor-pointer"
                        onClick={handleConfirmSpot}
                      >
                        {t("messages.discover.spot.actions.wannaHelpConfirm")}
                      </span>
                    </span>
                  </h1>
                </IonRow>
              </IonCol>
            </IonRow>
          )}

        {/* Multimedia grid */}
        <IonRow className="w-full p-3 flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden">
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
            <div className="w-full h-[270px]">
              <MultimediaMasonryGrid
                multimedia={currentPlace?.multimedia || []}
                onMultimedia={handleOnMultimediaSelected}
              />
            </div>
          )}
        </IonRow>

        {/* Place information */}
        <IonRow class="w-full p-3 ion-no-padding border-b border-gray-300 shadow-sm">
          <IonCol size="8">
            {/* Users in session */}
            {canAuthSession() &&
            canViewPlaceRealTimeData() &&
            currentPlace?.sessionCachedData?.usersInSession.length ? (
              <div className="mb-1">
                <AvatarGroup
                  users={currentPlace?.sessionCachedData?.usersInSession || []}
                />
              </div>
            ) : (
              <></>
            )}
            <div></div>
            <IonRow className="flex flex-col justify-center">
              <IonText className="flex flex-row flex-nowrap items-center">
                <h1 className="font-bold text-lg md:text-xl mr-2">
                  {currentPlace?.name}
                </h1>
                <HandlePlaceStatus status={isOpenNow()} />
              </IonText>
              <IonText>
                <span className="text-xs font-light">
                  {handlePlaceLocation()}{" "}
                </span>
                {/* Distance from current location */}
                <span className="text-xs">{distanceToSpot} km</span>
              </IonText>
            </IonRow>
          </IonCol>
          <IonCol size="4">
            {canAuthSession() &&
              canViewPlaceRealTimeData() &&
              changePageCallback && (
                <IonRow
                  className="
                    w-full
                    flex flex-row flex-nowrap
                    items-center justify-center
                "
                >
                  <SimpleButton
                    text={t("actions.general.seeMore")}
                    action={handleInformationButton}
                  />
                </IonRow>
              )}
          </IonCol>
        </IonRow>

        {/* ------------------------- */}
        {/* Tags of the place of the session */}
        {canAuthSession() && canViewPlaceRealTimeData() && (
          <IonRow className="w-full flex flex-row items-start justify-start p-3 border-b border-gray-300">
            {currentPlace?.knownFor && (
              <div className="mr-1">
                <SimpleTag
                  text={t(
                    `filters.mindsets.${currentPlace?.knownFor.toLowerCase()}`
                  )}
                />
              </div>
            )}
            {currentPlace?.ambianceTags?.map((ambiance) => (
              <div className="mr-1 mb-1" key={ambiance}>
                <SimpleTag
                  text={t(`filters.options.places.ambiances.${ambiance}`)}
                />
              </div>
            ))}
            {currentPlace?.themeTags?.map((theme) => (
              <div className="mr-1 mb-1" key={theme}>
                <SimpleTag text={t(`filters.options.places.themes.${theme}`)} />
              </div>
            ))}
          </IonRow>
        )}

        <IonRow className="relative w-full">
          <IonRow className="flex flex-col w-full p-3 border-b border-gray-300">
            <article className="mb-3">
              <IonText>
                <h3 className="text-md font-medium">
                  {t("spots.information.aboutTheSpot")}
                </h3>
              </IonText>
              <IonRow className="w-full flex flex-row flex-nowrap items-center pt-1">
                <IonText className="text-sm font-normal">
                  {currentPlace?.description}
                </IonText>
              </IonRow>
            </article>
          </IonRow>

          {/* ------------------------- */}
          {/* Last stories of the place */}
          {/* If  the router is not hard to do we should do it with tabs if not we can do render logic to apply it */}
          {/* <IonRow className="w-full h-auto max-h-12 border-b border-gray-300">
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
          </IonRow>
        </IonRow> */}
        </IonRow>

        <IonRow className="flex flex-col w-full h-auto p-3">
          <article className="mb-3">
            <IonText>
              <h3 className="text-md font-medium">
                {t("spots.information.discoveredBy")}:
              </h3>
            </IonText>
            {currentPlace?.discoveredByID ? (
              <IonRow className="w-full flex flex-row flex-nowrap items-center pt-1">
                <AvatarSingleCircle
                  url={currentPlace?.discoveredBy?.profilePicture}
                  styles="mr-1"
                />

                <IonText
                  className="text-sm font-medium underline cursor-pointer"
                  onClick={() => onDiscoveredBy(currentPlace.discoveredByID)}
                >
                  {currentPlace?.discoveredBy?.username}
                </IonText>
              </IonRow>
            ) : (
              <IonRow className="w-full flex flex-row flex-nowrap items-center pt-1">
                <AvatarSingleCircle
                  url="/assets/images/coffi-logo.svg"
                  styles="mr-1"
                />

                <IonText className="text-sm font-medium">Coffi</IonText>
              </IonRow>
            )}
          </article>
        </IonRow>
      </section>

      {confirmSpot && (
        <ConfirmPlaceDiscoveredModal
          closeCallback={closeConfirmSpot}
          onSuccess={handleOnConfirmSpot}
        />
      )}

      {isSpotApproved && (
        <SpotApprovedSuccessfulModal
          closeDiscoveredSpot={() => setIsSpotApproved(false)}
        />
      )}

      {isSpotConfirmed && (
        <SpotConfirmedSuccessfulModal
          closeDiscoveredSpot={() => setIsSpotConfirmed(false)}
        />
      )}

      {/* Multimedia detail view with app modal */}
      {multimediaModalOpen && (
        <AppModal>
          <MultimediaSliderModal
            images={currentPlace?.multimedia || []}
            closeCallback={() => setMultimediaModalOpen(false)}
            currentImage={multimediaSelected}
          />
        </AppModal>
      )}
    </section>
  );
};
