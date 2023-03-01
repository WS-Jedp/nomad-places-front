import { AppLayout } from "../../layouts/AppLayout";
import { ItemsAndMapLayout } from "../../layouts/ItemsAndMapLayout";
import { GoogleMapWrapper } from '../../components/maps/googleMapWrapper'

export const SearchPlaces: React.FC = () => {
  return (
    <AppLayout>
        <ItemsAndMapLayout
            map={
                <GoogleMapWrapper />
            }
        >
            <h2>Hello form search places :D</h2>
        </ItemsAndMapLayout>
    </AppLayout>
  );
};
