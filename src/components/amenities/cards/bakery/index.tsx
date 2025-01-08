import { MdOutlineBakeryDining } from "react-icons/md"
import { AmenitiesCard } from "../../card"
import { useTranslation } from "react-i18next"
import { COMMODITY_QUALITY } from "../../../../models/places"

interface ParkingAmenitiesCardProps {
    state?: boolean
    value?: COMMODITY_QUALITY
}

export const BakeryAmenitiesCard:React.FC<ParkingAmenitiesCardProps> = ({ state, value = null }) => {
    const { t } = useTranslation()
    return (
        <AmenitiesCard 
            Icon={MdOutlineBakeryDining}
            amenities={t('filters.commodities.bakery.label')}
            state={state || false}
            value={t(`filters.options.${value}`)}
            tagValue
            commodityQuality={value as COMMODITY_QUALITY}
        />
    )
}