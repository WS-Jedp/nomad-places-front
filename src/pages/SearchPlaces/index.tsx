import { useSelector } from 'react-redux'
import type { RootState } from '../../store/redux' 

import { AppLayout } from "../../layouts/AppLayout";
import { ItemsAndMapLayout } from "../../layouts/ItemsAndMapLayout";
import { GoogleMapWrapper } from '../../components/maps/googleMapWrapper'
import { HandlePlaceCardListItem } from "../../components/places/cards/helpers/handleCardListItem";
import { useEffect } from 'react';

export const SearchPlaces: React.FC = () => {

  const nearPlaces = useSelector((state: RootState) => state.places.nearPlaces)

  useEffect(() => {
    console.log(nearPlaces, 'Near places from redux store')
  }, [])

  return (
    <AppLayout>
        <ItemsAndMapLayout
            map={
                <GoogleMapWrapper />
            }
        >
            <>
              <HandlePlaceCardListItem />
              <HandlePlaceCardListItem />
              <HandlePlaceCardListItem />
              <HandlePlaceCardListItem />
              <HandlePlaceCardListItem />
              <HandlePlaceCardListItem />
              <HandlePlaceCardListItem />
              <HandlePlaceCardListItem />
              <HandlePlaceCardListItem />
            </>
        </ItemsAndMapLayout>
    </AppLayout>
  );
};
