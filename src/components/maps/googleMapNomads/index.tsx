import { Status } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../common/hooks/useTypedSelectors";
import { setZoomMap } from "../../../store/redux/slices/user";
import { NomadPlacesMakers } from "../markers/nomadPlacesMarkers";

export function GoogleMapNomadsComponent({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const refMap = useRef<any>();
  const [map, setMap] = useState<google.maps.Map>();
  const dispatch = useAppDispatch()

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
            console.log(newZoom)
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
