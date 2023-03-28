import { IonRow } from "@ionic/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/redux"
import { HandleMindsetTags } from "../../tags/mindsets"
import { selectNearPlaceFilter, removeNearPlaceFilter, resetSelectedNearPlaceFilters } from '../../../store/redux/slices/filters'

import { AllMindsetTag } from "../../tags/mindsets/all"

export const RowPlacesFilterOptions: React.FC<{ chilren?: JSX.Element}> = ({ chilren })  => {

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
            w-full h-24 overflow-x-auto overflow-y-hidden
            flex-nowrap
            p-6
            border-y border-gray-300
        ">
            <AllMindsetTag disabled={ selectedFilters.length !== filters.length } onClick={handleAllTagActions} />

            <div className="inline-flex ml-3 mr-6 h-full w-[1px] bg-gray-300"></div>

            {/* Other filters */}
            {
                filters.map(filter => (
                    <div className="mr-1" key={filter.id}>
                        <HandleMindsetTags disabled={ !isFilterActivated(filter.id) } mindset={filter.name} action={() => handleAction(filter.id)} />
                    </div>
                ))
            }

        </IonRow>
    )
}