import { Status } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
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

  return (
    <>
      <div ref={refMap} id="map" className="w-full h-full" />
      {map && <NomadPlacesMakers map={map} />}
    </>
  );
}
