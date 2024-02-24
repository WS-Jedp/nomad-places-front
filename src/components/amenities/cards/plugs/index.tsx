import { useTranslation } from "react-i18next"
import { FaPlug } from "react-icons/fa"
import { AmenitiesCard } from "../../card"

interface PlugsAmenitiesCardProps {
    state?: boolean
    value?: string
}

export const PlugsAmenitiesCard:React.FC<PlugsAmenitiesCardProps> = ({ state, value }) => {
    const { t } = useTranslation();
    return (
        <AmenitiesCard 
            Icon={FaPlug}
            amenities={t('filters.commodities.publicPlugs')}
            state={state || false}
            value={value ? value : undefined}
        />
    )
}