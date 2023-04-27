import { IonRow } from "@ionic/react"
import { MdCoffee, MdRestaurant } from "react-icons/md"
import { IoLibrary } from "react-icons/io5"
import { TbFountain } from "react-icons/tb"
import { FaMountain, FaBuilding } from "react-icons/fa"
import { SimplePlaceTypeCard } from "../../places/types/cards/simple"
import { PLACE_TYPES } from "../../../models/placeTypes"
import { useAppDispatch, useAppSelector } from "../../../common/hooks/useTypedSelectors"
import { selectSpotTypeFilter, removeSpotTypeFilter } from '../../../store/redux/slices/filters'

export const PlaceTypesFilter:React.FC = () => {

    const { spotTypesFilter, selectedSpotTypesFilter } = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch()

    function handleSpotTypeIcon(spotType: PLACE_TYPES) {
        switch (spotType) {
            case PLACE_TYPES.COFFEE:
                return <MdCoffee size={24} color="black" />
            case PLACE_TYPES.LIBRARY:
                return <IoLibrary size={24} color="black" />
            case PLACE_TYPES.PARK:
                return <TbFountain size={24} color="black" />
            case PLACE_TYPES.LOOKOUT:
                return <FaMountain size={24} color="black" />
            case PLACE_TYPES.RESTAURANT:
                return <MdRestaurant size={24} color="black" />
            case PLACE_TYPES.ROOFTOP:
                return <FaBuilding size={24} color="black" />
        }
    }

    function handleCallback(spotTypeId: number) {
        if(selectedSpotTypesFilter.includes(spotTypeId)) {
            dispatch(removeSpotTypeFilter({ spotTypeFilterID: spotTypeId }))
        } else {
            dispatch(selectSpotTypeFilter({ spotTypeFilterID: spotTypeId }))
        }
    }

    return (
        <IonRow className="flex flex-row flex-nowrap">
            {
                spotTypesFilter.map((spotType, index) => (
                    <div key={index} className="mr-3">
                        <SimplePlaceTypeCard
                            text={spotType.title.toLowerCase()}
                            icon={handleSpotTypeIcon(spotType.name)}
                            callback={() => handleCallback(spotType.id)}
                            isSelected={selectedSpotTypesFilter.includes(spotType.id)}
                        />
                    </div>
                ))
            }
        </IonRow>
    )

}