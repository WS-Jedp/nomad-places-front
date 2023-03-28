import { MdGroupWork } from "react-icons/md"
import { AmenitiesCard } from "../../card"

interface CoworkSpaceAmenitiesCardProps {
    state?: boolean
}

export const CoworkSpaceAmenitiesCard:React.FC<CoworkSpaceAmenitiesCardProps> = ({ state }) => {
    return (
        <AmenitiesCard 
            Icon={MdGroupWork}
            amenities="Cowork Space"
            state={state || false}
        />
    )
}