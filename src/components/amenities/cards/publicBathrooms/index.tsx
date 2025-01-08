import { useTranslation } from "react-i18next"
import { MdOutlineWc } from "react-icons/md"
import { AmenitiesCard } from "../../card"


interface PublicBathroomsAmenitiesCardProps {
    state?: boolean
}

export const PublicBathroomsAmenitiesCard:React.FC<PublicBathroomsAmenitiesCardProps> = ({ state }) => {
    const { t } = useTranslation();
    return (
        <AmenitiesCard 
            Icon={MdOutlineWc}
            amenities={t('filters.commodities.publicBathrooms')}
            state={state || false}
        />
    )
}