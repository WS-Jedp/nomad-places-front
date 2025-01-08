import { MdOutlineLocalParking } from "react-icons/md"
import { BsSignNoParking } from "react-icons/bs"
import { AmenitiesCard } from "../../card"
import { useTranslation } from "react-i18next"
import { PARKING_COMMODITY_ENUM } from "../../../../models/places"

interface ParkingAmenitiesCardProps {
    state?: boolean
    value?: PARKING_COMMODITY_ENUM | null
}

export const ParkingAmenitiesCard:React.FC<ParkingAmenitiesCardProps> = ({ state, value = null }) => {
    const { t } = useTranslation()
    return (
        <AmenitiesCard 
            Icon={state ? MdOutlineLocalParking : BsSignNoParking}
            amenities={t(`filters.commodities.parking.${value ? value : 'null'}`)}
            state={state || false}
        />
    )
}