import { MdWifi, MdWifiOff } from "react-icons/md"
import { AmenitiesCard } from "../../card"


interface PublicWifiAmenitiesCardProps {
    state?: boolean
    value?: string
}

export const PublicWifiAmenitiesCard:React.FC<PublicWifiAmenitiesCardProps> = ({ state, value }) => {
    return (
        <AmenitiesCard 
            Icon={state ? MdWifi : MdWifiOff}
            amenities="Public Wifi"
            state={state || false}
            value={value ? value : undefined}
        />
    )
}