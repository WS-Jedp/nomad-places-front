import { Status } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../common/hooks/useTypedSelectors";
import { resetPlaceOnFocus, setPlaceOnFocus } from "../../../store/redux/slices/places";
import { setZoomMap } from "../../../store/redux/slices/user";
import { NomadPlacesMakers } from "../markers/nomadPlacesMarkers";

export function GoogleMapNomadsComponent({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const userLocation = useAppSelector(state => state.user.location)
  const currentPlace = useAppSelector(state => state.places.currentPlace)
  const placeOnFocus = useAppSelector(state => state.places.placeOnFocus)
  const places = useAppSelector(state => state.places.nearPlaces)
  const refMap = useRef<any>();
  const [map, setMap] = useState<google.maps.Map>();
  const dispatch = useAppDispatch()
  
  useEffect(() => {
      if(!currentPlace || !map) {
        dispatch( resetPlaceOnFocus() )
        dispatch( setZoomMap({ zoom: 13 }) )
        return
      }

      map.panTo({
        lat: currentPlace.location.latitude,
        lng: currentPlace.location.longitude,
      })
      dispatch( setPlaceOnFocus(currentPlace.id) )
      dispatch( setZoomMap({ zoom: 11 }) )
  }, [currentPlace])

  useEffect(() => {
    if(!map || !placeOnFocus || placeOnFocus === currentPlace?.id) {
      return
    }
    const focusedPlace = places.find(spot => spot.id === placeOnFocus)
    if(!focusedPlace) return

    map.panTo({
      lat: focusedPlace.location.latitude,
      lng: focusedPlace.location.longitude,
    })
}, [placeOnFocus])

// Panning to user location
// Commented while we are in dev and international mode
// useEffect(() => {
//   if(!map || !userLocation || !userLocation.latitude || !userLocation.longitude) return

//   map.panTo({
//     lat: userLocation.latitude,
//     lng: userLocation.longitude,
//   })
//   dispatch( setZoomMap({ zoom: 11 }) )
// }, [userLocation])

  useEffect(() => {
    // if(!refMap || !refMap.current) return

    const ref = new window.google.maps.Map(refMap.current, {
      center,
      zoom,
      mapId: "3f38a0ee04c48235",
      zoomControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      disableDefaultUI: true,
    });


   setMap(ref);
  }, []);

  useEffect(() => {
    if (map) {
        map.addListener("zoom_changed", () => {
            const newZoom = map.getZoom();
            if(newZoom) {
              dispatch( setZoomMap({ zoom: newZoom }) )
            }
        });
    }
  }, [map]);

  return (
    <>
      <div ref={refMap} id="map" className="w-full h-full" />
      {map && <NomadPlacesMakers map={map} />}
    </>
  );
}
