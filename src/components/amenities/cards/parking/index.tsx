import { FaParking } from "react-icons/fa"
import { BsSignNoParkingFill } from "react-icons/bs"
import { AmenitiesCard } from "../../card"

interface ParkingAmenitiesCardProps {
    state?: boolean
}

export const ParkingAmenitiesCard:React.FC<ParkingAmenitiesCardProps> = ({ state }) => {
    return (
        <AmenitiesCard 
            Icon={state ? FaParking : BsSignNoParkingFill}
            amenities="Parking"
            state={state || false}
        />
    )
}