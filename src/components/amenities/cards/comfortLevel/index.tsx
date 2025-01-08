import { useTranslation } from "react-i18next"
import { MdOutlineChair } from "react-icons/md"
import { AmenitiesCard } from "../../card"
import { COMFORT_LEVEL_COMMODITY_ENUM, WIFI_SPEED_COMMODITY_ENUM } from "../../../../models/places"


interface ComfortLevelAmenitiesCardProps {
    value: COMFORT_LEVEL_COMMODITY_ENUM | null
}

export const ComfortLevelAmenitiesCard:React.FC<ComfortLevelAmenitiesCardProps> = ({  value }) => {
    const { t } = useTranslation();
    return (
        <AmenitiesCard 
            Icon={MdOutlineChair}
            amenities={t(`filters.commodities.comfortLevel.${value ? value : 'null'}`)}
            state={value ? true : false}
        />
    )
}