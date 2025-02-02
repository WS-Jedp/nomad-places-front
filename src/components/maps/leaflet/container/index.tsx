import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../common/hooks/useTypedSelectors";
import { LeafletMapMarkers } from "../markers";
import { computeDistanceToSpot } from "../../../../common/utils/geoLocation";
import { SimpleDarkButton } from "../../../buttons/simple";
import { useTranslation } from "react-i18next";
import { setLastMapCenterSearch } from "../../../../store/redux/slices/places";
import { useIsMobile } from "../../../../common/hooks/useIsMobile";
import { useComputeLastSearchDistance } from "../../../../common/hooks/useComputeLastSearchDistance";

export interface LeafletMapProps {
  onSearchInArea: () => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ onSearchInArea }) => {
  const { t } = useTranslation();
  const { currentMapCenter } = useAppSelector((state) => state.places);
  const [isMobile] = useIsMobile();
  const [isAbleToNewSearch] = useComputeLastSearchDistance();
  const currentZoomInMap = useAppSelector((state) => state.user.zoomInMap);
  const { location } = useAppSelector((state) => state.user);

  const medellinLatLong = { lat: 6.250910937220285, lng: -75.57915349417806 };

  const firstMapCenter =
    location.latitude && location.longitude
      ? { lat: location.latitude, lng: location.longitude }
      : medellinLatLong;

  async function handleOnSearchInThisArea() {
    if (!currentMapCenter) return;
    onSearchInArea();
  }

  return (
    <MapContainer
      center={[firstMapCenter.lat, firstMapCenter.lng]} // Initial map center
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

      {!isMobile && isAbleToNewSearch && (
        <div className="absolute z-[9999] bottom-[100px] right-2">
          <SimpleDarkButton
            text={t("actions.general.searchInThisArea")}
            action={handleOnSearchInThisArea}
          />
        </div>
      )}
    </MapContainer>
  );
};

export default LeafletMap;
