import { useTranslation } from "react-i18next"
import { MdOutlineSpeed } from "react-icons/md"
import { AmenitiesCard } from "../../card"
import { WIFI_SPEED_COMMODITY_ENUM } from "../../../../models/places"


interface PublicWifiAmenitiesCardProps {
    value: WIFI_SPEED_COMMODITY_ENUM | null
}

export const WifiSpeedAmenitiesCard:React.FC<PublicWifiAmenitiesCardProps> = ({  value }) => {
    const { t } = useTranslation();
    return (
        <AmenitiesCard 
            Icon={MdOutlineSpeed}
            amenities={t(`filters.commodities.wifiSpeed.${value ? value : 'null'}`)}
            state={value ? true : false}
        />
    )
}