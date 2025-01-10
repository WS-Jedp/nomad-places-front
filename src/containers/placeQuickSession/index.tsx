import { IonCol, IonRow, IonText } from "@ionic/react";
import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import { MultimediaMasonryGrid } from "../../components/multimedia/grid/masonry";

import { QuickPlaceDetailRecentActivitySlider } from "../../components/slider/quickPlaceDetail/recentActivity";
import { SimpleButton } from "../../components/buttons/simple";
import { HandlePlaceStatus } from "../../components/tags/placeStatus";
import { PLACE_STATUS } from "../../models/placeStatus";
import { AvatarGroup } from "../../components/avatar/group";
import {
  useAppDispatch,
  useAppSelector,
} from "../../common/hooks/useTypedSelectors";
import { BackNavigationButton } from "../../components/buttons/navigation/goBack";
import { createSocket } from "../../store/redux/slices/userSession";
import { useDistanceToSpot } from "../../common/hooks/useDistanceToSpot";
import { useTranslation } from "react-i18next";
import {
  MAIN_PLACE_COMMODITIES_KEYS,
  MAIN_RULES_KEYS,
  PLACE_COMMODITIES_ENUM,
  PLACE_CONFIRMATION_STATUS,
  PLACE_RULES_ENUM,
} from "../../models/places";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { ConfirmPlaceDiscoveredModal } from "../discoveredPlaces/modals/confirmPlaceDiscovered";
import { newSpotDiscoveredConfirmedDTO } from "../../dto/places";
import { SpotApprovedSuccessfulModal } from "../discoveredPlaces/modals/spotApprovedSuccessful";
import { SpotConfirmedSuccessfulModal } from "../discoveredPlaces/modals/spotConfirmedSuccessful";
import {
  approvedCurrentPlace,
  updateCurrentPlace,
} from "../../store/redux/slices/places";
import { AppModal } from "../../components/modals/container";
import { MultimediaSliderModal } from "../multimediaSliderModal";
import { useUserPermissions } from "../../common/hooks/useUserPermissions";
import { SimpleTag } from "../../components/tags/simpleTag";
import { AvatarSingleCircle } from "../../components/avatar/singleCircle";
import { HandleRuleRender } from "../../components/rules/handleRuleRender";
import { HandleAmenitiesRender } from "../../components/amenities/handleAmenitiesRender";
import { getLocalISODate } from "../../common/utils/dates";
import { format, parseISO } from "date-fns";

interface PlaceQuickSessionProps {
  changePageCallback?: Function;
  onSessionPath?: boolean;
}

// This quickSession detail will only show what is going on in the place
// The page detail from a place or the session of a place should allow interact with it
export const PlaceQuickSession: React.FC<PlaceQuickSessionProps> = ({
  changePageCallback,
  onSessionPath,
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

  function getRuleValue(rule: PLACE_RULES_ENUM): {
    [key: string]: boolean | string | string[] | null;
  } {
    return {
      [rule]: currentPlace?.rules[rule] || null,
    };
  }

  const availableCommodities = useMemo(() => {
    if (!currentPlace || !currentPlace?.commodities) return [];
    return MAIN_PLACE_COMMODITIES_KEYS.filter((c) => {
      return currentPlace &&
        currentPlace.commodities &&
        currentPlace.commodities[c]
        ? true
        : false;
    });
  }, [currentPlace]);
  const unavailableCommodities = useMemo(() => {
    if (!currentPlace || !currentPlace?.commodities) return [];
    return MAIN_PLACE_COMMODITIES_KEYS.filter((c) =>
      currentPlace && currentPlace.commodities && currentPlace.commodities[c]
        ? false
        : true
    );
  }, [currentPlace]);

  useEffect(() => {
    if (!currentPlace) handleNoCurrentPlace();
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
      <IonRow
        className="
                relative
                flex flex-row w-full h-16 p-5 md:py-3
                items-center
                border-b border-gray-300
                mb-1
            "
      >
        <BackNavigationButton goToURL="/home" />
      </IonRow>

      {/* Scrollable section */}
      <section className="w-full h-auto overflow-y-auto mb-20 md:mb-0">
        {/* Place Headers */}
        {canApproveDiscoveredPlaces() &&
          currentPlace?.confirmationStatus &&
          currentPlace?.confirmationStatus ===
            PLACE_CONFIRMATION_STATUS.RECOMMENDED && (
            <IonRow class="w-full px-5 py-2 ion-no-padding border-b border-gray-300 shadow-sm">
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
        <IonRow className="w-full px-5 py-3 flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden">
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
        <IonRow class="w-full px-5 py-3 ion-no-padding border-b border-gray-300 shadow-sm">
          <IonCol size="8">
            {/* Users in session */}
            {canAuthSession() &&
            canViewPlaceRealTimeData() &&
            currentPlace?.sessionCachedData?.usersInSession.length ? (
              <div className="w-full flex items-start justify-start mb-1">
                <AvatarGroup
                  users={currentPlace?.sessionCachedData?.usersInSession || []}
                />
              </div>
            ) : (
              <></>
            )}
            <div></div>
            <IonRow className="flex flex-col justify-center">
              <div className="flex flex-row flex-nowrap items-center">
                <h1 className="font-bold text-lg md:text-xl mr-2">
                  {currentPlace?.name}
                </h1>
                <HandlePlaceStatus status={isOpenNow()} />
              </div>
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
            {!onSessionPath &&
              canAuthSession() &&
              canViewPlaceRealTimeData() && (
                <IonRow
                  className="
                    w-full
                    flex flex-row flex-nowrap
                    items-center justify-center
                "
                >
                  <SimpleButton
                    text={t("actions.session.seeRealTimeData")}
                    action={handleInformationButton}
                  />
                </IonRow>
              )}
          </IonCol>
        </IonRow>

        {/* ------------------------- */}
        {/* Tags of the place of the session */}
        {canAuthSession() && canViewPlaceRealTimeData() && (
          <IonRow className="w-full flex flex-row items-start justify-start px-5 py-3 border-b border-gray-300">
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

        <IonRow className="relative flex flex-col w-full">
          <IonRow className="flex flex-col w-full px-5 py-3 border-b border-gray-300">
            <IonText>
              <h3 className="text-md font-semibold">
                {t("spots.information.aboutTheSpot")}
              </h3>
            </IonText>
            <article className="mb-6">
              <IonRow className="w-full flex flex-row flex-nowrap items-center pt-1">
                <IonText className="text-md font-normal">
                  {currentPlace?.description}
                </IonText>
              </IonRow>
            </article>

            {/* Rules */}
            <article className="mb-6">
              <h2 className="font-medium text-md mb-2">
                {t("spots.information.rules")}
              </h2>
              <IonRow className="relative w-full h-auto">
                {MAIN_RULES_KEYS.map((rule, i) => {
                  const ruleValue = getRuleValue(rule);
                  return (
                    <IonCol size="12" sizeMd="6" className="my-1" key={i}>
                      <HandleRuleRender
                        rule={
                          ruleValue as {
                            [key: string]: boolean | string | string[] | null;
                          }
                        }
                      />
                    </IonCol>
                  );
                })}
              </IonRow>
            </article>

            {/* Commodities */}
            <article>
              <h2 className="font-medium text-md mb-2">
                {t("spots.information.commodities")}
              </h2>
              <IonRow className="relative w-full h-auto mb-3">
                {currentPlace &&
                  availableCommodities.map((commodity, i) => {
                    let optValue;
                    let quality;
                    if (currentPlace.commodities) {
                      const currCommidity = currentPlace.commodities[commodity];

                      if (
                        commodity === PLACE_COMMODITIES_ENUM.WIFI_SPEED &&
                        currCommidity
                      ) {
                        optValue = currCommidity;
                      }

                      if (
                        commodity === PLACE_COMMODITIES_ENUM.FOOD &&
                        currCommidity
                      ) {
                        optValue = currentPlace.commodities.food;
                        quality = currentPlace.commodities.foodQuality;
                      }

                      if (
                        commodity === PLACE_COMMODITIES_ENUM.CAFE &&
                        currCommidity
                      ) {
                        const cafeQuality =
                          currentPlace.commodities.cafeQuality;
                        optValue = cafeQuality;
                      }

                      if (
                        commodity === PLACE_COMMODITIES_ENUM.BAKERY &&
                        currCommidity
                      ) {
                        const bakeryQuality =
                          currentPlace.commodities.bakeryQuality;
                        optValue = bakeryQuality;
                      }

                      if (
                        commodity ===
                          PLACE_COMMODITIES_ENUM.TEMPERATURE_CONTROL &&
                        currCommidity
                      ) {
                        optValue = currentPlace.commodities.temperatureControl;
                      }

                      if (
                        commodity === PLACE_COMMODITIES_ENUM.COMFORT_LEVEL &&
                        currCommidity
                      ) {
                        const comfortLevel =
                          currentPlace.commodities.comfortLevel;
                        optValue = comfortLevel;
                      }

                      if (
                        commodity === PLACE_COMMODITIES_ENUM.MOBILE_SIGNAL &&
                        currCommidity
                      ) {
                        optValue = currentPlace.commodities.mobileSignal;
                      }

                      if (
                        commodity === PLACE_COMMODITIES_ENUM.PARKING &&
                        currCommidity
                      ) {
                        optValue = currentPlace.commodities.parking;
                      }
                    }

                    return (
                      <IonCol size="12" sizeMd="6" className="my-1" key={i}>
                        <HandleAmenitiesRender
                          amenities={commodity}
                          state={
                            currentPlace.commodities
                              ? currentPlace.commodities[commodity]
                                ? true
                                : false
                              : false
                          }
                          value={optValue as string | undefined}
                          quality={quality || null}
                        />
                      </IonCol>
                    );
                  })}
              </IonRow>

              <h2 className="font-medium text-md mb-2">
                {t("spots.information.unavailableCommodities")}
              </h2>
              <IonRow className="relative w-full h-auto">
                {currentPlace &&
                  unavailableCommodities.map((commodity, i) => {
                    return (
                      <IonCol size="12" sizeMd="6" className="my-1" key={i}>
                        <HandleAmenitiesRender
                          amenities={commodity}
                          state={
                            currentPlace.commodities
                              ? currentPlace.commodities[commodity]
                                ? true
                                : false
                              : false
                          }
                        />
                      </IonCol>
                    );
                  })}
              </IonRow>
            </article>
          </IonRow>
        </IonRow>

        <IonRow className="flex flex-col w-full h-auto px-5 py-3">
          <article className="mb-3">
            <IonText>
              <h3 className="text-md font-medium">
                {t("spots.information.discoveredBy")}
              </h3>
            </IonText>
            {currentPlace?.discoveredByID ? (
              <IonRow className="w-full flex flex-row flex-nowrap items-center pt-1">
                <AvatarSingleCircle
                  url={currentPlace?.discoveredBy?.profilePicture}
                  styles="mr-2"
                />

                <article className="flex flex-col items-start justify-start">
                  <IonText
                    className="text-sm font-medium underline cursor-pointer"
                    onClick={() => onDiscoveredBy(currentPlace.discoveredByID)}
                  >
                    {currentPlace?.discoveredBy?.username}
                  </IonText>
                  {currentPlace.discoveredDate && (
                    <IonText className="text-xs font-light">
                      {`${t("spots.information.discoveredOn")} ${format(
                        parseISO(getLocalISODate(currentPlace.discoveredDate)),
                        "dd/MM/yyyy"
                      )}`}
                    </IonText>
                  )}
                </article>
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
