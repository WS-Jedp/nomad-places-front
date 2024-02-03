import { useHistory } from "react-router";
import { MdCoffee } from "react-icons/md";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../common/hooks/useTypedSelectors";
import { MINDSETS } from "../../../../models/mindsets";
import {
  findPlace,
  resetPlaceOnFocus,
  setPlaceOnFocus,
} from "../../../../store/redux/slices/places";
import { GoogleMapCustomMaker } from "../../googleMapsMarker";
import "./styles.css";
import { PlaceWithCachedSession } from "../../../../models/session";
import { PLACE_TYPES } from "../../../../models/placeTypes";
import { handleCardColor, handleMindsetIcon, handleSpotTypeIcon } from "../../../../common/utils/icons/icons";

interface NomadPlacesMarkersProps {
  map: google.maps.Map;
}

export const NomadPlacesMakers: React.FC<NomadPlacesMarkersProps> = ({
  map,
}) => {
  const places = useAppSelector((state) => state.places.nearPlaces);
  const placeHovered = useAppSelector((state) => state.places.placeOnFocus);
  const currentZoomInMap = useAppSelector((state) => state.user.zoomInMap);
  const history = useHistory();
  const dispatch = useAppDispatch();

  async function handleClickInPlace(id: string) {
    await dispatch(findPlace({ placeID: id }));
    history.push(`/home/detail/${id}`);
  }

  async function handleHoverInPlace(id: string) {
    await dispatch(setPlaceOnFocus(id));
  }
  async function handleHoverOutPlace() {
    await dispatch(resetPlaceOnFocus());
  }

  function getPinScale() {
    if (currentZoomInMap >= 16) {
      return "scale-100";
    }
    if (currentZoomInMap >= 14) {
      return "scale-75";
    }
    return "scale-50";
  }


  function handleIconToRender(place: PlaceWithCachedSession) {
    if (place.knownFor) {
      return handleMindsetIcon(place.knownFor);
    }

    if (place.type.length > 0 && place.type[0]) {
      return handleSpotTypeIcon(place.type[0]);
    }
    // If doesn't exist any of both, we should return the rating or some real time data
    return <MdCoffee size={21} />;
  }

  return (
    <>
      {places.map((place) => {
        return (
          <GoogleMapCustomMaker
            map={map}
            position={{
              lat: place.location.latitude,
              lng: place.location.longitude,
            }}
            key={place.id}
            onClick={() => handleClickInPlace(place.id)}
          >
            <article className="flex flex-col items-center justify-center text-center">
              
              <div
                className={`nomad-place-makers relative
                  ${placeHovered === place.id ? "nomad-place-marker--detail  scale-125 z-[999999]" : ""}
                  hover:scale-125 hover:z-[999999]
                  ${currentZoomInMap >= 15 ? "p-[21px]" : "p-[12px]"}
                  ${getPinScale()}
                  ${handleCardColor(place.knownFor)}
              `}
                // Simulate the hover in the marker
                onMouseEnter={() => {
                  handleHoverInPlace(place.id);
                }}
                onMouseLeave={() => {
                  handleHoverOutPlace();
                }}
              >
                  {
                    currentZoomInMap >= 15 && placeHovered === place.id ? (
                      <span className="absolute top-[-60%] max-w-none min-w-max w-auto font-normal text-xs">{handleIconToRender(place)}</span>
                      ) : placeHovered === place.id && (
                      <span className={`absolute top-[-60%] max-w-none min-w-max w-auto font-semibold text-[9px] px-3 rounded-sm ${handleCardColor(place.knownFor)}`}>{place.name}</span>
                    )
                  }
                  { currentZoomInMap >= 15 ? place.name : handleIconToRender(place)}
              </div>
            </article>
            
          </GoogleMapCustomMaker>
        );
      })}
    </>
  );
};
