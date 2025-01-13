import { IonCol, IonItem, IonRow, IonText } from "@ionic/react";
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
import {
  resetPlaceOnFocus,
  setPlaceOnFocus,
} from "../../../../../store/redux/slices/places";
import { PlaceCardMultimediaSlider } from "../../../../slider/placeCardMultimedia";
import { useUserPermissions } from "../../../../../common/hooks/useUserPermissions";
import { IdealForTag } from "../../../../tags/idealFor";
import { t } from "i18next";
import { useMemo } from "react";

interface PlaceCardListItemProps {
  place: PlaceWithCachedSession;
  action: Function;
}

export const PlaceCardListItemDesktop: React.FC<PlaceCardListItemProps> = ({
  place,
  action,
}) => {
  const placeOnFocus = useAppSelector((state) => state.places.placeOnFocus);
  const userLocation = useAppSelector((state) => state.user.location);
  const { isAuth } = useAppSelector((state) => state.user.auth);
  const dispatch = useAppDispatch();

  const { canViewPlaceRealTimeData } = useUserPermissions();

  async function handleOnPlaceHover() {
    await dispatch(setPlaceOnFocus(place.id));
  }
  async function handleOnLeavingHover() {
    await dispatch(resetPlaceOnFocus());
  }

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
    if (!place.sessionCachedData?.bestMindsetTo?.length)
      return place?.knownFor || null;

    const mostMindset = place.sessionCachedData.bestMindsetTo.reduce(
      (prev, curr) => (prev.actions.length > curr.actions.length ? prev : curr)
    );
    if (mostMindset.actions.length === 0) return place.knownFor || null;
    return mostMindset.mindset;
  }

  const isMindsetRealTime = useMemo(() => {
    if (!place.sessionCachedData?.bestMindsetTo?.length) return false;

    const mostMindset = place.sessionCachedData.bestMindsetTo.reduce(
      (prev, curr) => (prev.actions.length > curr.actions.length ? prev : curr)
    );
    if (mostMindset.actions.length === 0) return false;
    return true;
  }, [place]);

  function handleClick() {
    action();
  }

  return (
    <IonCol
      className={`
            bg-none bg-white-300 cursor-pointer rounded-md
            flex flex-col items-start justify-between py-5 px-2 my-1 mx-0  max-w-[270px] h-[260px] border-1 border-black md:bg-white
            transition-all duration-300 ease-in-out
            ${placeOnFocus === place.id ? "shadow-md border-black" : ""}
            hover:shadow-md hover:border-black
        `}
      onMouseEnter={handleOnPlaceHover}
      onMouseLeave={handleOnLeavingHover}
    >
      <IonRow
        className="
                    relative
                    w-full
                    flex flex-row flex-nowrap items-center justify-center
                    px-3
                "
      >
        <PlaceCardMultimediaSlider
          place={place}
          multimedia={place.multimedia}
          onImage={() => handleClick()}
        />
      </IonRow>
      <IonItem
        className="relative w-full p-0 ion-no-padding flex flex-col border-none mt-2"
        color="none"
        onClick={handleClick}
      >
        <IonRow className="relative w-full p-3">
          <IonRow class="w-full mb-3 ion-no-padding">
            <IonCol
              size="12"
              class="relative flex flex-col justify-start items-start"
            >
              <h1 className="truncate max-w-full overflow-ellipsis font-bold text-coffi-black">
                {place.name}
              </h1>

              {/* Real time data */}
              {/* If user have at least the basic subscription plan */}
              {canViewPlaceRealTimeData() && (
                <IonRow className="flex flex-row flex-wrap items-center justify-start w-full my-1">
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
                        : "bg-white border-[1px] border-solid border-coffi-black"
                    }
                      `}
                    >
                      <span
                        className={`text-xs font-normal ${
                          isMindsetRealTime
                            ? "text-white"
                            : "text-coffi-black"
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

              {/* TODO: Add for at least basic subscription current mood of the place */}
              {/* TODO: Add for at least basic subscription friends that are in the sesion and if not, how many users are in the session */}
              <IonText>
                <span className="text-xs text-coffi-black font-light">
                  {getDistanceToSpot(place)} km{" "}
                </span>
              </IonText>
            </IonCol>
          </IonRow>
        </IonRow>
      </IonItem>
    </IonCol>
  );
};
