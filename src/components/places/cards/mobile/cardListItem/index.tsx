import { IonAvatar, IonCol, IonItem, IonRow, IonText } from "@ionic/react";
import { MdPeople } from "react-icons/md";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../common/hooks/useTypedSelectors";
import { computeDistanceToSpot } from "../../../../../common/utils/geoLocation";
import {
  handleCardColor,
  handleMindsetIcon,
} from "../../../../../common/utils/icons/icons";
import { Place } from "../../../../../models/places";
import { PlaceWithCachedSession } from "../../../../../models/session";
import { HandleMultimediaCard } from "../../../../multimedia/cards/helpers/handleMultimediaCard";
import { useUserPermissions } from "../../../../../common/hooks/useUserPermissions";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface PlaceCardListItemProps {
  place: PlaceWithCachedSession;
  action: Function;
}

export const PlaceCardListItemMobile: React.FC<PlaceCardListItemProps> = ({
  place,
  action,
}) => {
  const userLocation = useAppSelector((state) => state.user.location);
  const { canViewPlaceRealTimeData } = useUserPermissions();
  const { t } = useTranslation()

  function handleClick(ev: React.MouseEvent<HTMLIonRowElement, MouseEvent>) {
    ev.preventDefault();
    action();
  }

  const isMindsetRealTime = useMemo(() => {
    if (!place.sessionCachedData?.bestMindsetTo?.length) return false;

    const mostMindset = place.sessionCachedData.bestMindsetTo.reduce(
      (prev, curr) => (prev.actions.length > curr.actions.length ? prev : curr)
    );
    if (mostMindset.actions.length === 0) return false;
    return true;
  }, [place]);

  function getAmountOfPeopleState() {
    if (!place.sessionCachedData?.amountOfPeople?.length) return;
    const mostAmountOfPeople = place.sessionCachedData.amountOfPeople.reduce(
      (prev, curr) => (prev.actions.length > curr.actions.length ? prev : curr)
    );
    if (mostAmountOfPeople.actions.length === 0) return null;
    return mostAmountOfPeople.amount;
  }

  function getDistanceToSpot(spot: PlaceWithCachedSession) {
    if (!userLocation || !userLocation.latitude || !userLocation.longitude)
      return null;

    return computeDistanceToSpot(
      {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
      spot.location
    );
  }

  function getMindsetOrKnownForState() {
    if (!place?.sessionCachedData?.bestMindsetTo?.length)
      return place.knownFor || null;

    const mostMindset = place.sessionCachedData.bestMindsetTo.reduce(
      (prev, curr) => (prev.actions.length > curr.actions.length ? prev : curr)
    );
    if (mostMindset.actions.length === 0) return place.knownFor || null;
    return mostMindset.mindset;
  }

  return (
    <IonRow className="bg-white text-coffi-black flex items-center p-0 m-0 w-full md:bg-white border-b border-t border-solid border-gray-100">
      <IonItem
        className="relative w-full p-0 ion-no-padding flex flex-col"
        color="none"
      >
        <IonRow className="relative w-full p-3">
          {/* Place information */}
          <IonRow
            class="w-full mb-3 ion-no-padding text-coffi-black"
            onClick={handleClick}
          >
            <IonCol size="2">
              <IonAvatar className="bg-gray-300 mr-3"></IonAvatar>
            </IonCol>
            <IonCol
              size="10"
              className="pl-3 flex flex-row justify-center items-start"
            >
              <IonCol size="12">
                <IonText>
                  <h1 className="font-bold">{place.name}</h1>
                </IonText>

                {/* Real time data */}
                {/* If user have at least the basic subscription plan */}
                {canViewPlaceRealTimeData() && (
                  <IonRow className="relative w-full flex flex-row flex-nowrap items-center justify-start my-1">
                    {getAmountOfPeopleState() && (
                      <span
                        className="flex flex-row flex-nowrap items-center justify-center py-1 font-regular text-xs rounded-md mr-1 
                          text-coffi-white capitalize px-3 bg-gradient-to-r from-coffi-blue-400 to-coffi-purple-400 drop-shadow-md"
                      >
                        {getAmountOfPeopleState()}{" "}
                        {<MdPeople className="mx-1" size={12} />}
                      </span>
                    )}
                    {getMindsetOrKnownForState() && (
                      <article
                        className={`flex flex-row itmes-center justify-centerpx-3 rounded-md p-1 px-3
                        ${
                          isMindsetRealTime
                            ? "bg-gradient-to-r from-coffi-blue-400 to-coffi-purple-400 drop-shadow-md"
                            : "bg-coffi-purple/10"
                        }
                          `}
                      >
                        <span
                          className={`text-xs font-medium ${
                            isMindsetRealTime
                              ? "text-white"
                              : "text-coffi-purple-400"
                          }`}
                        >
                          {t(
                            `filters.idealFor.${getMindsetOrKnownForState().toLowerCase()}`
                          )}
                        </span>
                      </article>
                    )}
                  </IonRow>
                )}
                <IonText>
                  <span className="text-xs font-light">
                    {getDistanceToSpot(place)} km
                  </span>
                </IonText>
              </IonCol>
            </IonCol>
          </IonRow>

          {/* Multimedia */}
          <IonRow
            className="
                            relative
                            w-full
                            flex flex-row flex-nowrap items-center justify-start
                            px-1
                        "
          >
            {place.multimedia?.length > 0 &&
              place.multimedia.map((media, index) => (
                <IonCol
                  size="4"
                  className="bg-gray-200 mr-2 w-24 h-32 rounded-md"
                  key={index}
                >
                  <HandleMultimediaCard url={media.url} type={media.type} />
                </IonCol>
              ))}
          </IonRow>
        </IonRow>
      </IonItem>
    </IonRow>
  );
};
