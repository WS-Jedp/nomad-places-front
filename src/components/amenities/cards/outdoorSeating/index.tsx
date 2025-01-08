import { useTranslation } from "react-i18next"
import { MdOutlineBalcony } from "react-icons/md"
import { AmenitiesCard } from "../../card"


interface OutdoorSeatingAmenitiesCardProps {
    state?: boolean
}

export const OutdoorSeatingAmenitiesCard:React.FC<OutdoorSeatingAmenitiesCardProps> = ({ state }) => {
    const { t } = useTranslation();
    return (
        <AmenitiesCard 
            Icon={MdOutlineBalcony}
            amenities={t('filters.commodities.outdoorSeating')}
            state={state || false}
        />
    )
}