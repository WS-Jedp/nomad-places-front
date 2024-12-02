import { IonRow } from "@ionic/react"
import { resetMindsetlaceFilters, removeSpotKnownForFilter, selectSpotKnownForFilter, resetSpotKnownForFilters } from '../../../store/redux/slices/filters'

import { SimpleMindsetCard } from "../../mindsets/cards/simpleCardMindset"
import { MINDSETS } from "../../../models/mindsets"
import { useAppDispatch, useAppSelector } from "../../../common/hooks/useTypedSelectors"
import { useTranslation } from "react-i18next"

export const PlaceKnownForFilter: React.FC = ()  => {

    const { t } = useTranslation()

    const dispatch = useAppDispatch()

    const { spotKnownForFilter: filters, selectedSpotKnownForFilter: selectedFilters } = useAppSelector(state => state.filters)

    const handleAction = (filterID: number) => {
        if(selectedFilters.some(id => id === filterID)) {
            dispatch( removeSpotKnownForFilter({ spotKnownForFilterID: filterID }) )
        } else {
            dispatch( selectSpotKnownForFilter({ spotKnownForFilterID: filterID }) )
        }
    }

    const isFilterActivated = (filterID: number):boolean => selectedFilters.some(id => id === filterID)

    const handleAllTagActions = () => {
        if(selectedFilters.length === filters.length) return
        dispatch( resetSpotKnownForFilters() )
    }

    return (
        <IonRow className="
            relative
            w-full overflow-x-auto overflow-y-hidden
            flex flex-nowrap items-center
        ">
            <div className="mr-3">
                <SimpleMindsetCard 
                    text={t('filters.labels.all')}
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
                            text={t(`filters.mindsets.${filter.name.toLowerCase()}`)}
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