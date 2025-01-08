import { useTranslation } from "react-i18next"
import { MdOutlineElectricalServices } from "react-icons/md"
import { AmenitiesCard } from "../../card"

interface PlugsAmenitiesCardProps {
    state?: boolean
    value?: string
}

export const PlugsAmenitiesCard:React.FC<PlugsAmenitiesCardProps> = ({ state, value }) => {
    const { t } = useTranslation();
    return (
        <AmenitiesCard 
            Icon={MdOutlineElectricalServices}
            amenities={t('filters.commodities.publicPlugs')}
            state={state || false}
            value={value ? value : undefined}
        />
    )
}