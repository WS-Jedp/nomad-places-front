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
        },
        {
          type: MULTIMEDIA_TYPE.VIDEO,
          url: "https://cdn-useast1.kapwing.com/final_640395566b49a600a6052360_909552.mp4?GoogleAccessId=prod-sa-videoprocessing%40kapwing-prod.iam.gserviceaccount.com&Expires=1677985249&Signature=M14LINGyWzSvC1LzEkl0y1E4au76uFY%2FOFQX7ouD3Ps3I2glfPbglDwHaEZaTmwv%2B1JU%2BtdRwTVH0Ip9V3MUINxpHOHKKUqMJsY232xZo3hSdvk%2Bs6MgXlPgMznAK%2FlvXRjoOuNjK1Ajwz7JHvFl%2FO%2FC7cXvi97VCKDFGsI9JeE3kO8gd%2FfWD8%2FsUlhiRqxkRG%2BEBZEduNG1wDhJjPVD2aKNmJAk%2FMtzSsaAtW35YqrOyPWgtgZyw2vIU6VjMeFiQavRHPo355J7uYiFSaqrfWSGrMIrHLsB5uQvGsooOU2Ogcp0nhFX3Kqji5boIvyzA%2BckBXT4WbIgytTzK0ourg%3D%3D",
        },
      ],
      name: "Cafe Velvet",
      type: [PLACE_TYPES.COFFEE],
    },
  ]);

  useEffect(() => {
    console.log(nearPlaces, "Near places from redux store");
  }, []);

  return (
    <IonRow  className="
        relative
        w-full h-screen overflow-hidden
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
