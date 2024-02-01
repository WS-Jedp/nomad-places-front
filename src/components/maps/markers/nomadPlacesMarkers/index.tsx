import { useState } from "react";
import { useHistory } from "react-router";
import { MdCelebration, MdCoffee, MdRestaurant } from "react-icons/md";
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
import {
  IoBook,
  IoColorWandOutline,
  IoGlassesOutline,
  IoLibrary,
} from "react-icons/io5";
import { BsHearts } from "react-icons/bs";
import { PlaceWithCachedSession } from "../../../../models/session";
import { PLACE_TYPES } from "../../../../models/placeTypes";
import { TbFountain } from "react-icons/tb";
import { FaBuilding, FaMountain } from "react-icons/fa";

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

  function handleIcon(mindset: MINDSETS) {
    switch (mindset) {
      case MINDSETS.ALL:
        return <IoColorWandOutline size={21} />;
      case MINDSETS.STUDY:
        return <IoBook size={21} />;
      case MINDSETS.WORK:
        return <IoGlassesOutline size={21} />;
      case MINDSETS.ROMANTIC:
        return <BsHearts size={21} />;
      case MINDSETS.VIBE:
        return <MdCelebration size={21} />;
      default:
        return <IoColorWandOutline size={21} />;
    }
  }

  function handleSpotTypeIcon(spotType: PLACE_TYPES) {
    switch (spotType) {
      case PLACE_TYPES.COFFEE:
        return <MdCoffee size={21} />;
      case PLACE_TYPES.LIBRARY:
        return <IoLibrary size={21} />;
      case PLACE_TYPES.PARK:
        return <TbFountain size={21} />;
      case PLACE_TYPES.LOOKOUT:
        return <FaMountain size={21} />;
      case PLACE_TYPES.RESTAURANT:
        return <MdRestaurant size={21} />;
      case PLACE_TYPES.ROOFTOP:
        return <FaBuilding size={21} />;
      default:
        return <MdCoffee size={21} />;
    }
  }

  function handleCardColor(mindset: MINDSETS) {
    switch (mindset) {
      case MINDSETS.ALL:
        return "bg-amber-400 text-white border-amber-400";
      case MINDSETS.STUDY:
        return "bg-indigo-400 text-white border-indigo-500";
      case MINDSETS.WORK:
        return "bg-blue-400 text-white border-blue-600";
      case MINDSETS.ROMANTIC:
        return "bg-pink-400 text-white border-pink-600";
      case MINDSETS.VIBE:
        return "bg-amber-400 text-white border-amber-600";
    }
  }

  function handleIconToRender(place: PlaceWithCachedSession) {
    if (place.knownFor) {
      return handleIcon(place.knownFor);
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
            <div
              className={`nomad-place-makers
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
                  {placeHovered === place.id ? (
                    <span className="m-5">{place.name}</span>
                  ) : currentZoomInMap >= 15 ? place.name : handleIconToRender(place)}
            </div>
          </GoogleMapCustomMaker>
        );
      })}
    </>
  );
};
