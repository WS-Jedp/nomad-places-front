import { MdOutlineAccessibleForward, MdOutlineNotAccessible } from "react-icons/md"
import { AmenitiesCard } from "../../card"
import { useTranslation } from "react-i18next"

interface ParkingAmenitiesCardProps {
    state?: boolean
}

export const AccessibilityAmenitiesCard:React.FC<ParkingAmenitiesCardProps> = ({ state }) => {
    const { t } = useTranslation()
    return (
        <AmenitiesCard 
            Icon={state ? MdOutlineAccessibleForward : MdOutlineNotAccessible}
            amenities={t('filters.commodities.accessibility')}
            state={state || false}
        />
    )
}