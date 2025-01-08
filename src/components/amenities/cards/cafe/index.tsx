import { MdOutlineCoffeeMaker } from "react-icons/md"
import { AmenitiesCard } from "../../card"
import { useTranslation } from "react-i18next"
import { COMMODITY_QUALITY } from "../../../../models/places"

interface CafeAmmenitiesCardProps {
    state?: boolean
    value?: COMMODITY_QUALITY | null
}

export const CafeAmenitiesCard:React.FC<CafeAmmenitiesCardProps> = ({ state, value = null }) => {
    const { t } = useTranslation()
    return (
        <AmenitiesCard 
            Icon={MdOutlineCoffeeMaker}
            amenities={t('filters.commodities.cafe')}
            state={state || false}
            value={t(`filters.options.${value}`)}
            tagValue
            commodityQuality={value as COMMODITY_QUALITY}
        />
    )
}