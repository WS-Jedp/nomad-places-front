import { io } from 'socket.io-client'
import { useSelector } from "react-redux";
import type { RootState } from "../../store/redux";

import { ItemsAndMapLayout } from "../../layouts/ItemsAndMapLayout";
import { GoogleMapWrapper } from "../../components/maps/googleMapWrapper";
import { HandlePlaceCardListItem } from "../../components/places/cards/helpers/handleCardListItem";
import { useEffect, useState } from "react";
import { Place } from "../../models/places";
import { MULTIMEDIA_TYPE } from "../../models/multimedia";
import { PLACE_TYPES } from "../../models/placeTypes";
import { IonRow } from "@ionic/react";
import placesService from '../../services/places';

interface SearchPlacesProps {}

export const SearchPlaces: React.FC<SearchPlacesProps> = () => {
  const nearPlaces = useSelector((state: RootState) => state.places.nearPlaces);
  const [mockPlaces, setMockPlaces] = useState<Place[]>([
    {
      id: "random-id",
      multimedia: [
        {
          type: MULTIMEDIA_TYPE.IMAGE,
          url: "https://picsum.photos/200/300",
          createdDate: new Date()
        },
        {
          type: MULTIMEDIA_TYPE.IMAGE,
          url: "https://picsum.photos/200/300",
          createdDate: new Date()
        },
      ],
      name: "Cafe Velvet",
      type: [PLACE_TYPES.COFFEE],
    },
    {
      id: "another-id",
      multimedia: [
        {
          type: MULTIMEDIA_TYPE.IMAGE,
          url: "https://picsum.photos/200/300",
          createdDate: new Date()
        },
        {
          type: MULTIMEDIA_TYPE.IMAGE,
          url: "https://picsum.photos/200/300",
          createdDate: new Date()
        },
      ],
      name: "Cafe Semilla",
      type: [PLACE_TYPES.COFFEE],
    },
  ]);

  useEffect(() => {
    async function connecting() {
      // const socket =  await io('http://localhost:3080')
      const data = await placesService.getNearestPlaces({
        lng: -75.56384696441715,
        lte: 6.240164325293614,
        maxDistance: 10000
      })
      console.log(data)
    }
    connecting()
  }, []);

  return (
    <IonRow  className="
        relative
        w-full h-full overflow-hidden
        flex flex-column md:flex-row md:flex-nowrap
        p-0
    ">
        <ItemsAndMapLayout map={<GoogleMapWrapper />}>
          <>
            {mockPlaces.length ? (
              mockPlaces.map((place) => (
                <HandlePlaceCardListItem key={place.id} place={place} />
              ))
            ) : (
              <h2>There is no places around here</h2>
            )}
          </>
        </ItemsAndMapLayout>
        
    </IonRow>
  );
};
