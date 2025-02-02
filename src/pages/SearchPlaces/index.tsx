import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { ItemsAndMapLayout } from "../../layouts/ItemsAndMapLayout";
import { HandlePlaceCardListItem } from "../../components/places/cards/helpers/handleCardListItem";

import {
  findPlace,
  getNearestPlaces,
  getAllPlaces,
  setFilteredPlaces,
  setLastMapCenterSearch,
} from "../../store/redux/slices/places";
import { getUserGeoLocation } from "../../store/redux/slices/user";
import {
  useAppDispatch,
  useAppSelector,
} from "../../common/hooks/useTypedSelectors";
import { AppLayout } from "../../layouts/AppLayout";
import { SatelliteLoader } from "../../components/loaders/satellite";
import { IonRow } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { getUserLastSession } from "../../store/redux/slices/userSession";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserLastSession } from "../../dto/session";
import LeafletMap from "../../components/maps/leaflet/container";
import { useUserPermissions } from "../../common/hooks/useUserPermissions";
import { PLACE_CONFIRMATION_STATUS } from "../../models/places";
import { GeoLocation } from "../../models/location";

interface SearchPlacesProps {}

export const SearchPlaces: React.FC<SearchPlacesProps> = () => {
  const { t } = useTranslation();

  const history = useHistory();
  const dispatch = useAppDispatch();
  const places = useAppSelector((state) => state.places);
  const { location: userLocation } = useAppSelector((state) => state.user);
  const authUser = useAppSelector((state) => state.user.auth);
  const userSession = useAppSelector((state) => state.userSession);
  const { canViewDiscoveredPlaces } = useUserPermissions();
  const {
    spotKnownForFilter,
    selectedSpotKnownForFilter,
    selectedSpotAmountPeopleFilter,
    selectedSpotCommoditiesFilter,
    selectedValuesSpotCommoditiesFilter,
    selectedSpotRulesFilter,
    selectedValuesSpotRulesFilter,
    selectedSpotTypesFilter,
    spotAmountPeopleFilter,
    spotCommoditiesFilter,
    spotMindsetFilter,
    spotRulesFilters,
    spotTypesFilter,
    selectedSpotMindsetFilter,
  } = useAppSelector((state) => state.filters);
  const [isSearchingPlaces, setIsSearchingPlaces] = useState(false);

  async function selectPlace(placeID: string) {
    await dispatch(findPlace({ placeID }));
    history.push(`/home/detail/${placeID}`);
  }


  async function getNearPlaces() {
    try {
      setIsSearchingPlaces(true);
      const { payload: { latitude, longitude }} = await dispatch(getUserGeoLocation()) as PayloadAction<GeoLocation>

      if (latitude && longitude) {
        await dispatch(getNearestPlaces());
        dispatch(
          setLastMapCenterSearch({
            lat: latitude,
            lng: longitude,
          })
        );
      } else {
        await dispatch(getAllPlaces());
      }
    } catch (err) {
      toast.error(String(err));
    } finally {
      setIsSearchingPlaces(false);
    }
  }

  async function getAreaNearPlaces() {
    try {
      setIsSearchingPlaces(true);
      if (places.currentMapCenter && places.currentMapCenter.lat && places.currentMapCenter.lng) {
        await dispatch(getNearestPlaces());
        await dispatch(setLastMapCenterSearch({ lat: places.currentMapCenter.lat, lng: places.currentMapCenter.lng }))
      }
    } catch (err) {
      toast.error(String(err));
    } finally {
      setIsSearchingPlaces(false);
    }

  }

  async function getFilteredPlaces() {
    const filteredPlaces = places.nearPlaces.filter((place) => {
      let isValid = true;

      if (
        !canViewDiscoveredPlaces() &&
        place.discoveredByID &&
        place.confirmationStatus === PLACE_CONFIRMATION_STATUS.RECOMMENDED
      ) {
        isValid = false;
      }

      // ---------------------------------
      // Filtering for the spot type
      if (
        selectedSpotTypesFilter.length > 0 &&
        selectedSpotTypesFilter.length < spotTypesFilter.length
      ) {
        // Search for at least one match between array selectedSpotTypesFilter and place.type
        const hasMatch = selectedSpotTypesFilter.some((typeID) => {
          return place.type.some((type) => {
            const spotType = spotTypesFilter.find(
              (spotType) => spotType.id === typeID
            );
            return spotType?.name === type;
          });
        });

        if (!hasMatch) isValid = false;
      }

      // ---------------------------------
      // Filtering for the spot mindset
      if (
        selectedSpotKnownForFilter.length > 0 &&
        selectedSpotKnownForFilter.length < spotKnownForFilter.length
      ) {
        const currentSpotKnownForFilter = selectedSpotKnownForFilter.map(
          (typeID) => {
            return spotKnownForFilter.find((mindset) => mindset.id === typeID)
              ?.name;
          }
        );

        if (!currentSpotKnownForFilter.includes(place.knownFor)) {
          isValid = false;
        }

        // This code it's for the real time filtering (Premium service, not implemented yet)
        // const cachedBestMindsetTo =
        //   place.sessionCachedData.bestMindsetTo?.reduce((prev, curr) =>
        //     prev.actions.length > curr.actions.length ? prev : curr
        //   );

        // if (cachedBestMindsetTo && cachedBestMindsetTo.actions.length > 0) {
        //   if (
        //     !currentSpotKnownForFilter.includes(cachedBestMindsetTo.mindset)
        //   ) {
        //     isValid = false;
        //     return;
        //   }
        // } else {
        //   if (currentSpotKnownForFilter.length > 0) {
        //     if (!currentSpotKnownForFilter.includes(place.knownFor)) {
        //       isValid = false;
        //       return;
        //     }
        //   }
        // }
      }

      // Filtering by commodities
      if (selectedSpotCommoditiesFilter.length > 0) {
        const selectedSpotCommodities = selectedSpotCommoditiesFilter.map(
          (commodityID) => {
            return spotCommoditiesFilter.find(
              (commodity) => commodity.id === commodityID
            )?.commodity;
          }
        );

        selectedSpotCommodities.forEach((commodity) => {
          if (commodity && place.commodities && !place.commodities[commodity]) {
            isValid = false;
            return;
          }
        });
      }

      if (place.commodities && selectedValuesSpotCommoditiesFilter.length > 0) {
        selectedValuesSpotCommoditiesFilter
          .filter((opt) => opt.value)
          .forEach((commodity) => {
            if (!commodity.value || !commodity.value.length) return;

            if (place.commodities?.[commodity.commodity]) {
              const val = place.commodities[commodity.commodity] as
                | string
                | string[];
              const selectedValue = commodity.value;
              if (
                val &&
                Array.isArray(val) &&
                val.length > 0 &&
                Array.isArray(selectedValue)
              ) {
                // If there is no any math from selectedValue in Val, the place msut be invalid
                if (!selectedValue.some((value) => val.includes(value))) {
                  isValid = false;
                  return;
                }
              } else {
                if (val != selectedValue) {
                  isValid = false;
                  return;
                }
              }
            } else {
              isValid = false;
              return;
            }
          });
      }

      // Filtering by rules
      if (selectedSpotRulesFilter.length > 0) {
        const selectedSpotRules = selectedSpotRulesFilter.map((ruleID) => {
          return spotRulesFilters.find((rule) => rule.id === ruleID)?.rule;
        });

        selectedSpotRules.forEach((rule) => {
          if (rule && place.rules && !place.rules[rule]) {
            isValid = false;
            return;
          }
        });
      }

      if (place.rules && selectedValuesSpotRulesFilter.length > 0) {
        selectedValuesSpotRulesFilter
          .filter((opt) => opt.value)
          .forEach((rule) => {
            if (!rule.value || !rule.value.length) return;

            if (place.rules?.[rule.rule]) {
              const val = place.rules[rule.rule] as string | string[];
              const selectedValue = rule.value;
              if (
                val &&
                Array.isArray(val) &&
                val.length > 0 &&
                Array.isArray(selectedValue)
              ) {
                // If there is no any math from selectedValue in Val, the place msut be invalid
                if (!selectedValue.some((value) => val.includes(value))) {
                  isValid = false;
                  return;
                }
              } else {
                if (val != selectedValue) {
                  isValid = false;
                  return;
                }
              }
            } else {
              isValid = false;
              return;
            }
          });
      }

      // Filtering by current amount of people from cached data (Only for paid users)
      if (
        selectedSpotAmountPeopleFilter &&
        place.sessionCachedData.amountOfPeople
      ) {
        const amountOfPeopleFilter = spotAmountPeopleFilter.find(
          (amount) => amount.id === selectedSpotAmountPeopleFilter
        );
        if (!place.sessionCachedData) return;
        const mostAmountOfPeopleInCachedSession =
          place.sessionCachedData.amountOfPeople.reduce((prev, curr) =>
            prev.actions.length > curr.actions.length ? prev : curr
          );
        if (
          mostAmountOfPeopleInCachedSession.actions.length === 0 ||
          mostAmountOfPeopleInCachedSession.amount !==
            amountOfPeopleFilter?.text
        ) {
          isValid = false;
          return;
        }
      }

      // Filtering by current mindset from cached data (Only for paid users)
      if (
        selectedSpotMindsetFilter.length > 0 &&
        selectedSpotMindsetFilter.length < spotMindsetFilter.length &&
        place.sessionCachedData.bestMindsetTo
      ) {
        const selectedSpotMindset = selectedSpotMindsetFilter.map(
          (mindsetID) => {
            return spotMindsetFilter.find((mindset) => mindset.id === mindsetID)
              ?.name;
          }
        );

        if (!place.sessionCachedData) return;
        const mostMindsetInCachedSession =
          place.sessionCachedData.bestMindsetTo.reduce((prev, curr) =>
            prev.actions.length > curr.actions.length ? prev : curr
          );

        // If there is no real time data, we should use the knownFor data
        if (mostMindsetInCachedSession.actions.length === 0) {
          if (!selectedSpotMindset.includes(place.knownFor)) {
            isValid = false;
            return;
          }
        } else if (
          !selectedSpotMindset.includes(mostMindsetInCachedSession.mindset)
        ) {
          isValid = false;
          return;
        }
      } else {
        if (selectedSpotMindsetFilter.length !== 0) {
          const currentSpotMindsetFilter = selectedSpotMindsetFilter.map(
            (typeID) => {
              return spotMindsetFilter.find((mindset) => mindset.id === typeID)
                ?.name;
            }
          );

          if (
            selectedSpotMindsetFilter.length !== spotMindsetFilter.length &&
            !currentSpotMindsetFilter.includes(place.knownFor)
          ) {
            isValid = false;
          }
        }
      }
      return isValid;
    });

    await dispatch(setFilteredPlaces(filteredPlaces));
  }

  async function fetchUserLastSession() {
    if (!authUser.token) return;
    const lastSession = (await dispatch(
      getUserLastSession({ token: authUser.token })
    )) as PayloadAction<UserLastSession>;

    if (!lastSession.payload.inSession) return;

    if (lastSession && lastSession.payload.lastSession) {
      if (!lastSession.payload.expired) {
        await dispatch(
          findPlace({ placeID: lastSession.payload.lastSession.placeID })
        );
        history.push(
          `/home/detail/${lastSession.payload.lastSession.placeID}/session`
        );
      }
    }
  }

  useEffect(() => {
    fetchUserLastSession();
  }, [authUser.token]);

  useEffect(() => {
    getFilteredPlaces();
  }, [
    authUser.token,
    places.nearPlaces,
    selectedSpotKnownForFilter,
    selectedSpotAmountPeopleFilter,
    selectedSpotCommoditiesFilter,
    selectedValuesSpotCommoditiesFilter,
    selectedSpotRulesFilter,
    selectedValuesSpotRulesFilter,
    selectedSpotTypesFilter,
    spotAmountPeopleFilter,
    spotCommoditiesFilter,
    spotMindsetFilter,
    spotRulesFilters,
    spotTypesFilter,
    spotMindsetFilter,
    selectedSpotMindsetFilter,
  ]);

  useEffect(() => {
    getNearPlaces();
  }, [authUser.token, authUser.isAuth, authUser]);

  return (
    <AppLayout onSearchInThisArea={getAreaNearPlaces}> 
      <IonRow
        className="
          relative
          w-full h-full overflow-hidden
          flex flex-column md:flex-row md:flex-nowrap
          p-0 bg-white
      "
      >
        <ItemsAndMapLayout map={<LeafletMap onSearchInArea={getAreaNearPlaces} />}>
          <>
            {isSearchingPlaces ? (
              <div className="fixed h-full w-full flex items-center justify-center p-5">
                <SatelliteLoader text={t("actions.general.searching")} />
              </div>
            ) : places.filteredPlaces.length ? (
              places.filteredPlaces.map((place) => (
                <HandlePlaceCardListItem
                  key={place.id}
                  place={place}
                  action={() => selectPlace(place.id)}
                />
              ))
            ) : (
              <h2 className="p-3">{t("filters.messages.reduceFilters")}</h2>
            )}
          </>
        </ItemsAndMapLayout>
      </IonRow>
    </AppLayout>
  );
};
