import { IonRow } from "@ionic/react"
import { MdCoffee, MdRestaurant } from "react-icons/md"
import { IoLibrary } from "react-icons/io5"
import { TbFountain } from "react-icons/tb"
import { FaMountain, FaBuilding } from "react-icons/fa"
import { SimplePlaceTypeCard } from "../../places/types/cards/simple"
import { PLACE_TYPES } from "../../../models/placeTypes"

export const PlaceTypesFilter:React.FC = () => {

    const placeTypes: { [key: string]: { type: PLACE_TYPES, icon: React.ReactNode } } = {
        coffee: {
            type: PLACE_TYPES.COFFEE,
            icon: <MdCoffee size={24} color="black" />,
        },
        library: {
            type: PLACE_TYPES.LIBRARY,
            icon: <IoLibrary size={24} color="black" />,
        },
        park: {
            type: PLACE_TYPES.PARK,
            icon: <TbFountain size={24} color="black" />,
        },
        lookout: {
            type: PLACE_TYPES.LOOKOUT,
            icon: <FaMountain size={24} color="black" />,
        },
        restaurant: {
            type: PLACE_TYPES.RESTAURANT,
            icon: <MdRestaurant size={24} color="black" />,
        },
        rooftop: {
            type: PLACE_TYPES.ROOFTOP,
            icon: <FaBuilding size={24} color="black" />,
        },
    }


    return (
        <IonRow className="flex flex-row flex-nowrap">
            {
                Object.keys(placeTypes).map((key, index) => (
                    <div key={index} className="mr-3">
                        <SimplePlaceTypeCard
                            text={placeTypes[key].type.toLowerCase()}
                            icon={placeTypes[key].icon}
                            callback={() => {}}
                        />
                    </div>
                ))
            }
        </IonRow>
    )

}