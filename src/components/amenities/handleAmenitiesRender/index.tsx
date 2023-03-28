import { PLACE_COMMODITIES_ENUM } from "../../../models/places";
import { CoworkSpaceAmenitiesCard } from "../cards/coworkSpace";
import { ParkingAmenitiesCard } from "../cards/parking";
import { PlugsAmenitiesCard } from "../cards/plugs";
import { PublicWifiAmenitiesCard } from "../cards/publicWifi";

interface HandleAmenitiesRenderProps {
    amenities: PLACE_COMMODITIES_ENUM
    state: boolean
    value?: string
}

export const HandleAmenitiesRender: React.FC<HandleAmenitiesRenderProps> = ({ amenities, state, value }) => {
    switch (amenities) {
        case PLACE_COMMODITIES_ENUM.PUBLIC_WIFI:
            return (
                <PublicWifiAmenitiesCard 
                    state={state}
                    value={value}
                />
            )

        case PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS:
            return (
                <PlugsAmenitiesCard 
                    state={state}
                    value={value}
                />
            )
        case PLACE_COMMODITIES_ENUM.PARKING:
            return (
                <ParkingAmenitiesCard 
                    state={state}
                />
            )
        case PLACE_COMMODITIES_ENUM.COWORK_SPACE:
            return (
                <CoworkSpaceAmenitiesCard 
                    state={state}
                />
            )
    }

    return null
}