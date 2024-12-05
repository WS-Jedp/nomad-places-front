import { useEffect, useMemo, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../common/hooks/useTypedSelectors";
import { useHistory } from "react-router";
import { setZoomMap } from "../../../../store/redux/slices/user";
import {
  findPlace,
  setPlaceOnFocus,
} from "../../../../store/redux/slices/places";

import "./custom-marker.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import { PlaceWithCachedSession } from "../../../../models/session";
import { createCustomPlaceMarker } from "./placeMarker";
import { createCustomClusterIcon } from "./clusterPlaceMarker";
import { createUserMarker } from "./userLocationMarker";
import L from 'leaflet';

const CustomProfileMarkerContent: React.FC<{
  place: PlaceWithCachedSession;
}> = ({ place }) => (
  <div>
    <strong>{place.name}</strong>
  </div>
);

export const LeafletMapMarkers: React.FC = () => {
  const map = useMap();
  const userLocation = useAppSelector((state) => state.user.location);
  const { filteredPlaces: places, nearPlaces } = useAppSelector(
    (state) => state.places
  );
  const placeHovered = useAppSelector((state) => state.places.placeOnFocus);
  const currentPlace = useAppSelector((state) => state.places.currentPlace);
  const placeOnFocus = useAppSelector((state) => state.places.placeOnFocus);
  const currentZoomInMap = useAppSelector((state) => state.user.zoomInMap);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [zoomLevel, setZoomLevel] = useState(map.getZoom());

  //   Handling zoom of the map
  useEffect(() => {
    const handleZoom = () => {
      setZoomLevel(map.getZoom()); // Update the zoom level
    };

    // Listen for zoom events
    map.on("zoomend", handleZoom);

    // Cleanup the listener on unmount
    return () => {
      map.off("zoomend", handleZoom);
    };
  }, [map]);

  function handleSizeAccordingToZoom() {
    if (zoomLevel >= 9) {
      return "scale-75 hover:scale-[.80]";
    }
    return "scale-50 hover:scale-[.60]";
  }

  // Panning to user location
  useEffect(() => {
    if (
      !map ||
      !userLocation ||
      !userLocation.latitude ||
      !userLocation.longitude
    )
      return;

    map.panTo({
      lat: userLocation.latitude,
      lng: userLocation.longitude,
    });
    dispatch(setZoomMap({ zoom: 12 }));
  }, [userLocation]);

  //   Panning to focused place
  useEffect(() => {
    if (!map || !placeOnFocus || placeOnFocus === currentPlace?.id) {
      return;
    }

    const focusedPlace = places.find((spot) => spot.id === placeOnFocus);
    if (!focusedPlace) return;

    map.panTo({
      lat: focusedPlace.location.latitude,
      lng: focusedPlace.location.longitude,
    });
  }, [placeOnFocus]);

  async function handleClickInPlace(id: string) {
    await dispatch(findPlace({ placeID: id }));
    history.push(`/home/detail/${id}`);
  }

  async function handleHoverInPlace(id: string) {
    await dispatch(setPlaceOnFocus(id));
  }

  const renderFilteredPlaces = useMemo(() => {
    return places.map((place) => (
      <Marker
        key={place.id}
        position={[place.location.latitude, place.location.longitude]}
        icon={createCustomPlaceMarker(place, handleSizeAccordingToZoom())}
        eventHandlers={{
          click: () => handleClickInPlace(place.id),
          mouseover: () => handleHoverInPlace(place.id),
          mouseout: () => dispatch(setPlaceOnFocus("")),
        }}
      >
        {placeOnFocus === place.id && (
          <Popup closeButton={false} autoPan={false}>
            <h3>{place.name}</h3>
          </Popup>
        )}
      </Marker>
    ));
  }, [places]);


  return (
    <>
      {/* User location marker */}
      {userLocation.latitude && userLocation.longitude && (
        <Marker
          position={[userLocation.latitude, userLocation.longitude]}
          icon={createUserMarker(handleSizeAccordingToZoom())}
        />
      )}

      {/* Render place markers */}
      <MarkerClusterGroup
        key={places.length}
        {...({} as any)}
        spiderfyOnMaxZoom={false}
        showCoverageOnHover={false}
        maxClusterRadius={40}
        chunkedLoading={true}
        iconCreateFunction={createCustomClusterIcon}
      >
        {renderFilteredPlaces}
      </MarkerClusterGroup>
    </>
  );
};
