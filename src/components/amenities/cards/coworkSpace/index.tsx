import { useTranslation } from "react-i18next"
import { MdGroupWork } from "react-icons/md"
import { AmenitiesCard } from "../../card"

interface CoworkSpaceAmenitiesCardProps {
    state?: boolean
}

export const CoworkSpaceAmenitiesCard:React.FC<CoworkSpaceAmenitiesCardProps> = ({ state }) => {
    const { t } = useTranslation()
    return (
        <AmenitiesCard 
            Icon={MdGroupWork}
            amenities={t('filters.commodities.coworkSpace')}
            state={state || false}
        />
    )
}