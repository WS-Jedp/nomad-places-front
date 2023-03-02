import { AppLayout } from "../../layouts/AppLayout";
import { ItemsAndMapLayout } from "../../layouts/ItemsAndMapLayout";
import { GoogleMapWrapper } from '../../components/maps/googleMapWrapper'
import { HandlePlaceCardListItem } from "../../components/places/cards/helpers/handleCardListItem";

export const SearchPlaces: React.FC = () => {
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
            </>
        </ItemsAndMapLayout>
    </AppLayout>
  );
};
