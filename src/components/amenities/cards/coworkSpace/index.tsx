import { useTranslation } from "react-i18next"
import { MdOutlineGroup } from "react-icons/md"
import { AmenitiesCard } from "../../card"

interface CoworkSpaceAmenitiesCardProps {
    state?: boolean
}

export const CoworkSpaceAmenitiesCard:React.FC<CoworkSpaceAmenitiesCardProps> = ({ state }) => {
    const { t } = useTranslation()
    return (
        <AmenitiesCard 
            Icon={MdOutlineGroup}
            amenities={t('filters.commodities.coworkSpace')}
            state={state || false}
        />
    )
}