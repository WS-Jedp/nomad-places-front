import { useTranslation } from "react-i18next"
import { FaWifi } from "react-icons/fa"
import { MdOutlineWifiPassword } from "react-icons/md"
import { AmenitiesCard } from "../../card"


interface PublicWifiAmenitiesCardProps {
    state?: boolean
    value?: string
}

export const PublicWifiAmenitiesCard:React.FC<PublicWifiAmenitiesCardProps> = ({ state, value }) => {
    const { t } = useTranslation();
    return (
        <AmenitiesCard 
            Icon={state ? FaWifi : MdOutlineWifiPassword}
            amenities={t('filters.commodities.publicWifi')}
            state={state || false}
            value={value ? value : undefined}
        />
    )
}