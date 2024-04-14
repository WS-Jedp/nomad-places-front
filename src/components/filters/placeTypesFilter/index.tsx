import { IonRow } from "@ionic/react"
import { useTranslation } from "react-i18next"
import { MdCoffee, MdRestaurant } from "react-icons/md"
import { IoLibrary } from "react-icons/io5"
import { TbFountain } from "react-icons/tb"
import { FaMountain, FaBuilding } from "react-icons/fa"
import { SimplePlaceTypeCard } from "../../places/types/cards/simple"
import { PLACE_TYPES } from "../../../models/placeTypes"
import { useAppDispatch, useAppSelector } from "../../../common/hooks/useTypedSelectors"
import { selectSpotTypeFilter, removeSpotTypeFilter } from '../../../store/redux/slices/filters'
import { handleSpotTypeIcon } from "../../../common/utils/icons/icons"

export const PlaceTypesFilter:React.FC = () => {

    const { t } = useTranslation()

    const { spotTypesFilter, selectedSpotTypesFilter } = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch()

    function handleCallback(spotTypeId: number) {
        if(selectedSpotTypesFilter.includes(spotTypeId)) {
            dispatch(removeSpotTypeFilter({ spotTypeFilterID: spotTypeId }))
        } else {
            dispatch(selectSpotTypeFilter({ spotTypeFilterID: spotTypeId }))
        }
    }

    return (
        <IonRow className="relative
            w-full overflow-x-auto overflow-y-hidden
            flex flex-nowrap items-center">
            {
                spotTypesFilter.map((spotType, index) => (
                    <div key={index} className="mr-3">
                        <SimplePlaceTypeCard
                            text={ t(`filters.spotTypes.${spotType.title.toLowerCase()}`)}
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