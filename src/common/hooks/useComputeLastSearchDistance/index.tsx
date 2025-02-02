import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../useTypedSelectors";
import { computeDistanceToSpot } from "../../utils/geoLocation";

export const useComputeLastSearchDistance = () => {
  const { lastMapCenterSearch, currentMapCenter } = useAppSelector(
    (state) => state.places
  );

  const [isAbleToDoNewSearch, setIsAbleToDoNewSearch] =
    useState<boolean>(false);

  useEffect(() => {
    if (
      !lastMapCenterSearch ||
      !lastMapCenterSearch.lat ||
      !lastMapCenterSearch.lng
    ) {
      isAbleToDoNewSearch && setIsAbleToDoNewSearch(false);
      return;
    }

    if (!currentMapCenter || !currentMapCenter.lat || !currentMapCenter.lng) {
      isAbleToDoNewSearch && setIsAbleToDoNewSearch(false);
      return;
    }

    const kmDistanceFromLastMapCenterSearch = computeDistanceToSpot(
      { latitude: lastMapCenterSearch.lat, longitude: lastMapCenterSearch.lng },
      { latitude: currentMapCenter.lat, longitude: currentMapCenter.lng }
    );

    if (Number(kmDistanceFromLastMapCenterSearch) >= 4) {
      setIsAbleToDoNewSearch(true);
    } else {
      isAbleToDoNewSearch && setIsAbleToDoNewSearch(false);
    }
  }, [currentMapCenter, lastMapCenterSearch]);

  return [isAbleToDoNewSearch]
};
