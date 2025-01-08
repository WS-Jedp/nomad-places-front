import { useTranslation } from "react-i18next"
import { MdOutlineSignalCellularAlt, MdOutlineSignalCellularConnectedNoInternet0Bar } from "react-icons/md"
import { AmenitiesCard } from "../../card"
import { MOBILE_SIGNAL_COMMODITY_ENUM } from "../../../../models/places"


interface MobileSignalAmenitiesCardProps {
    value: MOBILE_SIGNAL_COMMODITY_ENUM | null
}

export const MobileSignalAmenitiesCard:React.FC<MobileSignalAmenitiesCardProps> = ({  value }) => {
    const { t } = useTranslation();
    return (
        <AmenitiesCard 
            Icon={!value ? MdOutlineSignalCellularConnectedNoInternet0Bar : MdOutlineSignalCellularAlt}
            amenities={t(`filters.commodities.mobileSignal.${value ? value : 'null'}`)}
            state={value ? true : false}
        />
    )
}