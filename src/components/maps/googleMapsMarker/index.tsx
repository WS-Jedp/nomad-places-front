import React, { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {} from "@googlemaps/react-wrapper";

interface GoogleMapCustomMarkerProps {
  map: google.maps.Map;
  position: google.maps.LatLngLiteral;
  children: JSX.Element;
  onClick: Function
}

export const GoogleMapCustomMaker: React.FC<GoogleMapCustomMarkerProps> = ({
  map,
  position,
  children,
  onClick
}) => {
  const customMakerRef = useRef<any>();
  const rootRef = useRef<any>();

  useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement("article");
      rootRef.current = createRoot(container);

      customMakerRef.current = new window.google.maps.marker.AdvancedMarkerView({
        map,
        position,
        content: container,
      });
    }
  }, []);

  // To handle changes in the map or the marker
  useEffect(() => {
    rootRef.current.render(children);
    customMakerRef.current.position = position;
    customMakerRef.current.map = map;
    const listener = customMakerRef.current.addListener('click', onClick)
    return () => listener.remove()
  }, [map, position, children]);

  return null;
};
