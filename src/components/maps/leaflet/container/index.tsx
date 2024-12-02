import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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
import { LeafletMapMarkers } from "../markers";


const LeafletMap: React.FC = () => {
  const currentZoomInMap = useAppSelector((state) => state.user.zoomInMap);

  const medellinLatLong = { lat: 6.250910937220285, lng: -75.57915349417806 };

  return (
    <MapContainer
      center={[medellinLatLong.lat, medellinLatLong.lng]} // Initial map center
      zoom={currentZoomInMap} // Initial zoom level
      style={{ height: "100vh", width: "100%" }} // Full-page map
    >
      {/* Tile layer (map style) */}
      <TileLayer
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <LeafletMapMarkers />
    </MapContainer>
  );
};

export default LeafletMap;
