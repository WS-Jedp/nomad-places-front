import { MdOutlineNoDrinks } from "react-icons/md"
import { FaWineGlassAlt } from "react-icons/fa"
import { AmenitiesCard } from "../../card"
import { useTranslation } from "react-i18next"

interface ParkingAmenitiesCardProps {
    state?: boolean
}

export const AlcoholAvailabilityAmenitiesCard:React.FC<ParkingAmenitiesCardProps> = ({ state }) => {
    const { t } = useTranslation()
    return (
        <AmenitiesCard 
            Icon={state ? FaWineGlassAlt : MdOutlineNoDrinks}
            amenities={t('filters.commodities.alcoholAvailability')}
            state={state || false}
        />
    )
}