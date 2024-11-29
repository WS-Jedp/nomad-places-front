import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { ItemsAndMapLayout } from "../../layouts/ItemsAndMapLayout";
import { GoogleMapWrapper } from "../../components/maps/googleMapWrapper";
import { HandlePlaceCardListItem } from "../../components/places/cards/helpers/handleCardListItem";

import {
  findPlace,
  getNearestPlaces,
  getAllPlaces,
  setFilteredPlaces,
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

interface SearchPlacesProps {}

export const SearchPlaces: React.FC<SearchPlacesProps> = () => {
  const { t } = useTranslation();

  const history = useHistory();
  const dispatch = useAppDispatch();
  const places = useAppSelector((state) => state.places);
  const userLocation = useAppSelector((state) => state.user.location);
  const authUser = useAppSelector((state) => state.user.auth);
  const userSession = useAppSelector((state) => state.userSession);
  const {
    selectedSpotMindsetFilter,
    selectedSpotAmountPeopleFilter,
    selectedSpotCommoditiesFilter,
    selectedSpotRulesFilter,
    selectedSpotTypesFilter,
    spotAmountPeopleFilter,
    spotCommoditiesFilter,
    spotMindsetFilter,
    spotRulesFilters,
    spotTypesFilter,
  } = useAppSelector((state) => state.filters);
  const allFilters = useAppSelector((state) => state.filters);
  const [isSearchingPlaces, setIsSearchingPlaces] = useState(false);

  async function selectPlace(placeID: string) {
    await dispatch(findPlace({ placeID }));
    history.push(`/home/detail/${placeID}`);
  }

  async function getUserLocation() {
    await dispatch(getUserGeoLocation());
  }

  async function getNearPlaces() {
    // temporal change while I'm outside of Medellin
    // await dispatch(getNearestPlaces()) // Original
    try {
      setIsSearchingPlaces(true);
      await dispatch(getAllPlaces());
    } catch (err) {
      toast.error(String(err));
    } finally {
      setIsSearchingPlaces(false);
    }
  }

  function getFilteredPlaces() {
    const filteredPlaces = places.nearPlaces.filter((place) => {
      let isValid = true;

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
        selectedSpotMindsetFilter.length > 0 &&
        selectedSpotMindsetFilter.length < spotMindsetFilter.length
      ) {
        const selectedSpotMindsetsFilter = selectedSpotMindsetFilter.map(
          (typeID) => {
            return spotMindsetFilter.find((mindset) => mindset.id === typeID)
              ?.name;
          }
        );

        if (!selectedSpotMindsetsFilter.includes(place.knownFor)) {
          isValid = false;
        }

        // This code it's for the real time filtering (Premium service, not implemented yet)
        // const cachedBestMindsetTo =
        //   place.sessionCachedData.bestMindsetTo.reduce((prev, curr) =>
        //     prev.actions.length > curr.actions.length ? prev : curr
        //   );

        // if (cachedBestMindsetTo && cachedBestMindsetTo.actions.length > 0) {
        //   if (
        //     !selectedSpotMindsetsFilter.includes(cachedBestMindsetTo.mindset)
        //   ) {
        //     isValid = false;
        //     return;
        //   }
        // } else {
        //   if (selectedSpotMindsetsFilter.length > 0) {
        //     if (!selectedSpotMindsetsFilter.includes(place.knownFor)) {
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

      // This feature for premium users (Not implemented yet)
      // Filtering by Amount of people
      // if (
      //   selectedSpotAmountPeopleFilter &&
      //   place.sessionCachedData.amountOfPeople
      // ) {
      //   const amountOfPeopleFilter = spotAmountPeopleFilter.find(
      //     (amount) => amount.id === selectedSpotAmountPeopleFilter
      //   );
      //   if (!place.sessionCachedData) return;
      //   const mostAmountOfPeopleInCachedSession =
      //     place.sessionCachedData.amountOfPeople.reduce((prev, curr) =>
      //       prev.actions.length > curr.actions.length ? prev : curr
      //     );
      //   if (
      //     mostAmountOfPeopleInCachedSession.actions.length === 0 ||
      //     mostAmountOfPeopleInCachedSession.amount !==
      //       amountOfPeopleFilter?.text
      //   ) {
      //     isValid = false;
      //     return;
      //   }
      // }
      return isValid;
    });

    dispatch(setFilteredPlaces(filteredPlaces));
  }

  async function fetchUserLastSession() {
    if (!authUser.token) return;
    const lastSession = (await dispatch(
      getUserLastSession({ token: authUser.token })
    )) as PayloadAction<UserLastSession>;
  }

  useEffect(() => {
    fetchUserLastSession();
  }, [authUser.token]);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    getFilteredPlaces();
  }, [
    selectedSpotMindsetFilter,
    selectedSpotAmountPeopleFilter,
    selectedSpotCommoditiesFilter,
    selectedSpotRulesFilter,
    selectedSpotTypesFilter,
    spotAmountPeopleFilter,
    spotCommoditiesFilter,
    spotMindsetFilter,
    spotRulesFilters,
    spotTypesFilter,
  ]);

  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) getNearPlaces();
  }, [userLocation]);

  return (
    <AppLayout>
     
      <IonRow
        className="
          relative
          w-full h-full overflow-hidden
          flex flex-column md:flex-row md:flex-nowrap
          p-0 bg-white
      "
      >
        <ItemsAndMapLayout map={<GoogleMapWrapper />}>
          <>
            {isSearchingPlaces ? (
              <div className="w-full flex items-center justify-center p-5">
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
