import { FaPlug } from "react-icons/fa"
import { AmenitiesCard } from "../../card"

interface PlugsAmenitiesCardProps {
    state?: boolean
    value?: string
}

export const PlugsAmenitiesCard:React.FC<PlugsAmenitiesCardProps> = ({ state, value }) => {
    return (
        <AmenitiesCard 
            Icon={FaPlug}
            amenities="Plugs"
            state={state || false}
            value={value ? value : undefined}
        />
    )
}