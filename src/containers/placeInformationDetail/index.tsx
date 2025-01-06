import { IonCol, IonRow, IonText } from "@ionic/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "../../common/hooks/useIsMobile";
import { useAppSelector } from "../../common/hooks/useTypedSelectors";
import { HandleAmenitiesRender } from "../../components/amenities/handleAmenitiesRender";
import { AppModal } from "../../components/modals/container";
import { MultimediaMasonryGrid } from "../../components/multimedia/grid/masonry";
import { HandleRuleRender } from "../../components/rules/handleRuleRender";
import { PlaceDetailMultimediaSlider } from "../../components/slider/placeDetailMultimediaSlider";
import {
  MAIN_PLACE_COMMODITIES_KEYS,
  MAIN_RULES_KEYS,
  PLACE_COMMODITIES_ENUM,
  PLACE_RULES_ENUM,
} from "../../models/places";
import { MultimediaSliderModal } from "../multimediaSliderModal";
import { BackNavigationButton } from "../../components/buttons/navigation/goBack";
import { useDistanceToSpot } from "../../common/hooks/useDistanceToSpot";
import { HandlePlaceStatus } from "../../components/tags/placeStatus";
import { PLACE_STATUS } from "../../models/placeStatus";
import { AvatarGroup } from "../../components/avatar/group";
import { SimpleTag } from "../../components/tags/simpleTag";
import { useUserPermissions } from "../../common/hooks/useUserPermissions";

export const PlaceInformationDetail: React.FC = () => {
  const { t } = useTranslation();
  const { currentPlace } = useAppSelector((state) => state.places);

  const [multimediaModalOpen, setMultimediaOpen] = useState<boolean>(false);
  const [mediaSelectedIndex, setMediaSelectedIndex] = useState<number>(0);

  const { canAuthSession, canViewPlaceRealTimeData } = useUserPermissions();

  function handleSelectMedia(index: number) {
    setMediaSelectedIndex(index);
    setMultimediaOpen(true);
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

  const [distanceToSpot] = useDistanceToSpot(currentPlace?.location);

  const [isMobile] = useIsMobile();

  function getRuleValue(rule: PLACE_RULES_ENUM): {
    [key: string]: boolean | string | null;
  } {
    return {
      [rule]: Boolean(currentPlace?.rules[rule]) || false,
    };
  }

  return (
    <IonRow className="w-full h-auto flex flex-col overflow-y-auto">
      {/* Multimedia grid */}
      <section className="py-3  mb-3 w-full border-b-[1px] border-b-gray-300">
        <IonRow className="px-3 d-flex flex-row flex-nowrap">
          <BackNavigationButton />
        </IonRow>
      </section>

      {/* Multimedia */}
      <IonRow className="w-full px-3">
        <div className="w-full h-[270px]">
          <MultimediaMasonryGrid
            multimedia={currentPlace?.multimedia || []}
            onMultimedia={handleSelectMedia}
          />
        </div>
      </IonRow>

      {/* Information */}
      <IonRow className="w-full flex flex-col ion-no-padding justify-center border-b border-gray-300 shadow-sm py-3">
        <section className="px-3">
          {/* Users in session */}
          {currentPlace?.sessionCachedData?.usersInSession.length ? (
            <div className="mb-1">
              <AvatarGroup
                users={currentPlace?.sessionCachedData?.usersInSession || []}
              />
            </div>
          ) : (
            <></>
          )}
          <IonText className="flex flex-row flex-nowrap items-center">
            <h1 className="font-bold text-lg md:text-xl mr-2">
              {currentPlace?.name}
            </h1>
            <HandlePlaceStatus status={isOpenNow()} />
          </IonText>
          <IonText>
            <span className="text-xs font-light">{handlePlaceLocation()} </span>
            {/* Distance from current location */}
            <span className="text-xs">{distanceToSpot} km</span>
          </IonText>
        </section>
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

      <section className="mb-3">
        <h2 className="font-bold text-lg">
          {t("spots.information.description")}:
        </h2>
        <p className="font-regular text-md">
          {currentPlace?.description || t("spots.messages.noDescription")}
        </p>
      </section>

      <section className="mb-3">
        <h2 className="font-bold text-lg">{t("spots.information.rules")}:</h2>
        <IonRow className="relative w-full h-auto">
          {currentPlace &&
            MAIN_RULES_KEYS.map((rule, i) => {
              const ruleValue = getRuleValue(rule);
              if (typeof ruleValue[rule] === "string") return null;
              return (
                <IonCol size="12" sizeMd="6" className="my-3" key={i}>
                  <HandleRuleRender
                    rule={ruleValue as { [key: string]: boolean | null }}
                  />
                </IonCol>
              );
            })}
        </IonRow>
      </section>

      <section className="my-3">
        <h2 className="font-bold text-lg">
          {t("spots.information.commodities")}:
        </h2>
        <IonRow className="relative w-full h-auto">
          {currentPlace &&
            MAIN_PLACE_COMMODITIES_KEYS.map((commodity, i) => {
              let optValue;

              if (commodity === PLACE_COMMODITIES_ENUM.PUBLIC_WIFI) {
                optValue = currentPlace.commodities?.wifiSpeed
                  ? `${t("spots.messages.commodities.publicWifi")} ${
                      currentPlace.commodities?.wifiSpeed
                    }Mbs`
                  : undefined;
              }

              if (commodity === PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS) {
                optValue = currentPlace.commodities?.plugsAmount
                  ? `${t("spots.messages.commodities.plugs")} ${
                      currentPlace.commodities?.plugsAmount
                    }`
                  : undefined;
              }

              return (
                <IonCol size="6" className="my-3" key={i}>
                  <HandleAmenitiesRender
                    amenities={commodity}
                    state={
                      currentPlace.commodities
                        ? currentPlace.commodities[commodity]
                          ? true
                          : false
                        : false
                    }
                    value={optValue}
                  />
                </IonCol>
              );
            })}
        </IonRow>
      </section>

      <section className="relative my-3 w-full flex flex-col flex-nowrap overflow-x-auto">
        <h2 className="font-bold text-lg">
          {t("spots.information.multimedia")}
        </h2>
        <section>
          <PlaceDetailMultimediaSlider
            multimedia={currentPlace?.multimedia || []}
            callback={handleSelectMedia}
          />
        </section>
      </section>

      {/* Multimedia detail view with app modal */}
      {multimediaModalOpen && (
        <AppModal>
          <MultimediaSliderModal
            images={currentPlace?.multimedia || []}
            closeCallback={() => setMultimediaOpen(false)}
            currentImage={mediaSelectedIndex}
          />
        </AppModal>
      )}
    </IonRow>
  );
};
