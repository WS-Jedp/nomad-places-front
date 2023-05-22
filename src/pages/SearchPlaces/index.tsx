import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IonRow } from "@ionic/react";

import { ItemsAndMapLayout } from "../../layouts/ItemsAndMapLayout";
import { GoogleMapWrapper } from "../../components/maps/googleMapWrapper";
import { HandlePlaceCardListItem } from "../../components/places/cards/helpers/handleCardListItem";

import { findPlace, getNearestPlaces, setNearPlaces } from '../../store/redux/slices/places' 
import { getUserGeoLocation } from '../../store/redux/slices/user' 
import { useAppDispatch, useAppSelector } from "../../common/hooks/useTypedSelectors";
import { AppLayout } from "../../layouts/AppLayout";
import { BlurAppModal } from "../../components/modals/blurContainer";
import { UserActionsModal } from "../../containers/session/userActionsModal";

interface SearchPlacesProps {}

export const SearchPlaces: React.FC<SearchPlacesProps> = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const places = useAppSelector((state) => state.places);
  const userLocation = useAppSelector((state) => state.user.location);

  async function selectPlace(placeID: string) {
      await dispatch( findPlace({ placeID }) )
      history.push(`/home/detail/${placeID}`)
  }

  async function getUserLocation() {
    await dispatch(getUserGeoLocation())
  }

  async function getNearPlaces() {
    await dispatch(getNearestPlaces())
  }

  useEffect(() => {
    getUserLocation()
  }, []);


  useEffect(() => {
    if(userLocation.latitude && userLocation.longitude) getNearPlaces()
  }, [userLocation])

  return (
    <AppLayout>
      <IonRow  className="
          relative
          w-full h-full overflow-hidden
          flex flex-column md:flex-row md:flex-nowrap
          p-0
      ">
          <ItemsAndMapLayout map={<GoogleMapWrapper />}>
            <>
              {places.nearPlaces.length ? (
                places.nearPlaces.map((place) => (
                  <HandlePlaceCardListItem key={place.id} place={place} action={() => selectPlace(place.id)} />
                ))
              ) : (
                <h2>There is no places around here</h2>
              )}
            </>
          </ItemsAndMapLayout>
      </IonRow>

    </AppLayout>

  );
};
