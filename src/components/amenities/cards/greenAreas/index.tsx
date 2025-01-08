import { useTranslation } from "react-i18next"
import { MdOutlinePark } from "react-icons/md"
import { AmenitiesCard } from "../../card"


interface GreenAreasAmenitiesCardProps {
    state?: boolean
}

export const GreenAreasAmenitiesCard:React.FC<GreenAreasAmenitiesCardProps> = ({ state }) => {
    const { t } = useTranslation();
    return (
        <AmenitiesCard 
            Icon={MdOutlinePark}
            amenities={t('filters.commodities.greenAreas')}
            state={state || false}
        />
    )
}