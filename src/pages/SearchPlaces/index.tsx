import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IonRow } from "@ionic/react";

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
import { BlurAppModal } from "../../components/modals/blurContainer";
import { UserActionsModal } from "../../containers/session/userActionsModal";

interface SearchPlacesProps {}

export const SearchPlaces: React.FC<SearchPlacesProps> = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const places = useAppSelector((state) => state.places);
  const userLocation = useAppSelector((state) => state.user.location);
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
    await dispatch(getAllPlaces());
  }

  function getFilteredPlaces() {
    const filteredPlaces = places.nearPlaces.filter((place) => {
      let isValid = true;

      // Filtering for the spot type
      if (selectedSpotTypesFilter.length > 0 && selectedSpotTypesFilter.length < spotTypesFilter.length) {
        selectedSpotTypesFilter.forEach((typeID) => {
          const spotTypeName = spotTypesFilter.find(
            (type) => type.id === typeID
          )?.name;
          if (!spotTypeName || !place.type.includes(spotTypeName)) {
            isValid = false;
            return;
          }
        });
      }

      // Filtering for the spot mindset
      if (selectedSpotMindsetFilter.length > 0 && selectedSpotMindsetFilter.length < spotMindsetFilter.length) {
        const selectedSpotMindsetsFilter = selectedSpotMindsetFilter.map(typeID => {
          return spotMindsetFilter.find(mindset => mindset.id === typeID)?.name
        })

        const cachedBestMindsetTo =
            place.sessionCachedData.bestMindsetTo.reduce((prev, curr) =>
              prev.actions.length > curr.actions.length ? prev : curr
            );

        if(cachedBestMindsetTo && cachedBestMindsetTo.actions.length > 0) {
          if(!selectedSpotMindsetsFilter.includes(cachedBestMindsetTo.mindset)) {
            isValid = false
            return
          }
        } else {
          if (selectedSpotMindsetsFilter.length > 0) {
            if (!selectedSpotMindsetsFilter.includes(place.knownFor)) {
              isValid = false;
              return;
            }
          }
        }
      }

      // Filtering by commodities
      if(selectedSpotCommoditiesFilter.length > 0 && selectedSpotCommoditiesFilter.length < spotCommoditiesFilter.length) {
        const selectedSpotCommodities = selectedSpotCommoditiesFilter.map(commodityID => {
          return spotCommoditiesFilter.find(commodity => commodity.id === commodityID)?.commodity
        })

        selectedSpotCommodities.forEach(commodity => {
          if(commodity && place.commodities && !place.commodities[commodity]) {
            isValid = false
            return
          }
        })
      }

      // Filtering by rules
      if(selectedSpotRulesFilter.length > 0 && selectedSpotRulesFilter.length < spotRulesFilters.length) {
        const selectedSpotRules = selectedSpotRulesFilter.map(ruleID => {
          return spotRulesFilters.find(rule => rule.id === ruleID)?.rule
        })

        selectedSpotRules.forEach(rule => {
          if(rule && place.rules && !place.rules[rule]) {
            isValid = false
            return
          }
        })
      }

      // Filtering by Amount of people
      if(selectedSpotAmountPeopleFilter) {
        const amountOfPeopleFilter = spotAmountPeopleFilter.find(amount => amount.id === selectedSpotAmountPeopleFilter)
        if(!place.sessionCachedData) return
        const mostAmountOfPeopleInCachedSession = place.sessionCachedData.amountOfPeople.reduce((prev, curr) => prev.actions.length > curr.actions.length ? prev : curr) 
        if(mostAmountOfPeopleInCachedSession.actions.length === 0 || mostAmountOfPeopleInCachedSession.amount !== amountOfPeopleFilter?.text) {
          isValid = false
          return
        }
      }
      return isValid;
    });
    dispatch(setFilteredPlaces(filteredPlaces));
  }

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
          p-0
      "
      >
        <ItemsAndMapLayout map={<GoogleMapWrapper />}>
          <>
            {places.filteredPlaces.length ? (
              places.filteredPlaces.map((place) => (
                <HandlePlaceCardListItem
                  key={place.id}
                  place={place}
                  action={() => selectPlace(place.id)}
                />
              ))
            ) : (
              <h2>
                There is no places around here or try to reduce your filters
              </h2>
            )}
          </>
        </ItemsAndMapLayout>
      </IonRow>
    </AppLayout>
  );
};
