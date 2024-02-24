import { useTranslation } from "react-i18next"
import { MdWifi, MdWifiOff } from "react-icons/md"
import { AmenitiesCard } from "../../card"


interface PublicWifiAmenitiesCardProps {
    state?: boolean
    value?: string
}

export const PublicWifiAmenitiesCard:React.FC<PublicWifiAmenitiesCardProps> = ({ state, value }) => {
    const { t } = useTranslation();
    return (
        <AmenitiesCard 
            Icon={state ? MdWifi : MdWifiOff}
            amenities={t('filters.commodities.publicWifi')}
            state={state || false}
            value={value ? value : undefined}
        />
    )
}