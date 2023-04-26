import { IonRow } from "@ionic/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/redux"
import { selectNearPlaceFilter, removeNearPlaceFilter, resetSelectedNearPlaceFilters } from '../../../store/redux/slices/filters'

import { SimpleMindsetCard } from "../../mindsets/cards/simpleCardMindset"
import { MINDSETS } from "../../../models/mindsets"

export const PlaceMindsetsFilters: React.FC = ()  => {

    const dispatch = useDispatch()

    const { nearPlacesFilter: filters, selectedNearPlacesFilter: selectedFilters } = useSelector((state: RootState) => state.filters)

    const handleAction = (filterID: number) => {
        if(selectedFilters.some(id => id === filterID)) {
            dispatch( removeNearPlaceFilter({ placeFilterID: filterID }) )
        } else {
            dispatch( selectNearPlaceFilter({ placeFilterID: filterID }) )
        }
    }

    const isFilterActivated = (filterID: number):boolean => selectedFilters.some(id => id === filterID)

    const handleAllTagActions = () => {
        if(selectedFilters.length === filters.length) return
        dispatch( resetSelectedNearPlaceFilters() )
    }

    return (
        <IonRow className="
            relative
            w-full overflow-x-auto overflow-y-hidden
            flex flex-nowrap items-center
        ">
            <div className="mr-3">
                <SimpleMindsetCard 
                    text={MINDSETS.ALL.toLowerCase()}
                    isSelected={ selectedFilters.length === filters.length }
                    mindset={MINDSETS.ALL}
                    callback={handleAllTagActions}
                />
            </div>

            {/* Other filters */}
            {
                filters.map(filter => (
                    <div className="mr-3" key={filter.id}>
                        <SimpleMindsetCard 
                            text={filter.name.toLowerCase()}
                            isSelected={ isFilterActivated(filter.id) }
                            mindset={filter.name}
                            callback={() => handleAction(filter.id)}
                        />
                    </div>
                ))
            }

        </IonRow>
    )
}