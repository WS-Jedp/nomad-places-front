import { FaParking } from "react-icons/fa"
import { BsSignNoParkingFill } from "react-icons/bs"
import { AmenitiesCard } from "../../card"
import { useTranslation } from "react-i18next"

interface ParkingAmenitiesCardProps {
    state?: boolean
}

export const ParkingAmenitiesCard:React.FC<ParkingAmenitiesCardProps> = ({ state }) => {
    const { t } = useTranslation()
    return (
        <AmenitiesCard 
            Icon={state ? FaParking : BsSignNoParkingFill}
            amenities={t('filters.commodities.parking')}
            state={state || false}
        />
    )
}