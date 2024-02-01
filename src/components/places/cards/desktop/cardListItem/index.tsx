import { IonCol, IonItem, IonRow, IonText } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../../../../common/hooks/useTypedSelectors";
import { Place } from "../../../../../models/places";
import { resetPlaceOnFocus, setPlaceOnFocus } from "../../../../../store/redux/slices/places";
import { PlaceCardMultimediaSlider } from "../../../../slider/placeCardMultimedia";

interface PlaceCardListItemProps {
  place: Place;
  action: Function;
}

export const PlaceCardListItemDesktop: React.FC<PlaceCardListItemProps> = ({
  place,
  action,
}) => {
  const placeOnFocus = useAppSelector((state) => state.places.placeOnFocus);
  const dispatch = useAppDispatch()

  async function handleOnPlaceHover() {
    await dispatch( setPlaceOnFocus(place.id) )
  }
  async function handleOnLeavingHover() {
    await dispatch( resetPlaceOnFocus() )
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
        <PlaceCardMultimediaSlider multimedia={place.multimedia} />
      </IonRow>
      <IonItem
        class="relative w-full p-0 ion-no-padding flex flex-col"
        color="none"
      >
        <IonRow className="relative w-full p-3">
          <IonRow class="w-full mb-3 ion-no-padding">
            <IonCol size="12" class="flex flex-col justify-center items-start">
              <IonText>
                <h1 className="font-bold text-black">{place.name}</h1>
              </IonText>
              <IonText>
                <p className="font-sans font-regular text-sm text-black capitalize">
                  {/* <span className="capitalize">{ place.type[0] }</span> - 20+ people */}
                  20+ people
                </p>
              </IonText>
              <IonText>
                <span className="text-xs text-black font-light">3,4 km </span>
              </IonText>
            </IonCol>
          </IonRow>
        </IonRow>
      </IonItem>
    </IonRow>
  );
};
