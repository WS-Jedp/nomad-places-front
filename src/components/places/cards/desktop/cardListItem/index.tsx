import { IonCol, IonItem, IonRow, IonText } from "@ionic/react";
import { MdPeople } from "react-icons/md";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../common/hooks/useTypedSelectors";
import { computeDistanceToSpot } from "../../../../../common/utils/geoLocation";
import { Place } from "../../../../../models/places";
import { PlaceWithCachedSession } from "../../../../../models/session";
import {
  resetPlaceOnFocus,
  setPlaceOnFocus,
} from "../../../../../store/redux/slices/places";
import { PlaceCardMultimediaSlider } from "../../../../slider/placeCardMultimedia";

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
  const dispatch = useAppDispatch();

  async function handleOnPlaceHover() {
    await dispatch(setPlaceOnFocus(place.id));
  }
  async function handleOnLeavingHover() {
    await dispatch(resetPlaceOnFocus());
  }

  function getAmountOfPeopleState() {
    const mostAmountOfPeople = place.sessionCachedData.amountOfPeople.reduce(
      (prev, curr) => (prev.actions.length > curr.actions.length ? prev : curr)
    );
    if (mostAmountOfPeople.actions.length === 0) return null;
    return mostAmountOfPeople.amount;
  }

  function getDistanceToSpot(spot: PlaceWithCachedSession) {
    if(!userLocation || !userLocation.latitude || !userLocation.longitude) return null

    return computeDistanceToSpot({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude
    }, spot.location)
  }

  function handleClick(ev: React.MouseEvent<HTMLIonRowElement, MouseEvent>) {
    ev.preventDefault();
    action();
  }

  return (
    <IonRow
      className={`
            bg-none bg-white-300 cursor-pointer rounded-md
            flex items-center p-2 my-1 mx-0 w-4/12 border-1 border-black md:bg-white
            transition-all duration-300 ease-in-out
            ${placeOnFocus === place.id ? "shadow-md border-black" : ""}
            hover:shadow-md hover:border-black
        `}
      onClick={handleClick}
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
        />
      </IonRow>
      <IonItem
        class="relative w-full p-0 ion-no-padding flex flex-col border-none"
        color="none"
      >
        <IonRow className="relative w-full p-3">
          <IonRow class="w-full mb-3 ion-no-padding">
            <IonCol size="12" class="flex flex-col justify-center items-start">
              <IonText>
                <h1 className="font-bold text-black">{place.name}</h1>
              </IonText>
              <IonText>
                {getAmountOfPeopleState() && (
                  <span className="flex flex-row flex-nowrap items-center justify-center font-sans font-regular text-[12px] capitalize mt-1 px-3 border border-black rounded-lg">
                    {getAmountOfPeopleState()}{" "}
                    {<MdPeople className="mx-1" size={12} />}
                  </span>
                )}
              </IonText>
              <IonText>
                <span className="text-xs text-black font-light">{getDistanceToSpot(place)} km </span>
              </IonText>
            </IonCol>
          </IonRow>
        </IonRow>
      </IonItem>
    </IonRow>
  );
};
