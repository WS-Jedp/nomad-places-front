import { IonRow, IonCol } from "@ionic/react"
import { SimpleCheckbox } from "../../form/inputs/checkbox"
import { useAppDispatch, useAppSelector } from "../../../common/hooks/useTypedSelectors"
import { selectCommodityFilter, removeCommodityFilter } from "../../../store/redux/slices/filters"

export const PlaceCommoditiesSelection: React.FC = () => {

    const { selectedSpotCommoditiesFilter, spotCommoditiesFilter } = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch()

    function isComoditySelected(commodityId: number) {
        return selectedSpotCommoditiesFilter.includes(commodityId)
    }

    function handleCallback(commidityId: number) {
        if(!isComoditySelected(commidityId)) {
            dispatch(selectCommodityFilter({ commodityFilterID: commidityId }))
        } else {
            dispatch(removeCommodityFilter({ commodityFilterID: commidityId }))
        }
    }
    return (
        <IonRow>
            {
                spotCommoditiesFilter.map((commodity) => (
                    <IonCol size="6" sizeMd="6" key={commodity.id}>
                        <SimpleCheckbox 
                            label={commodity.name}
                            callback={() => handleCallback(commodity.id)}
                            isSelected={isComoditySelected(commodity.id)}
                        />
                    </IonCol>
                ))
            }
            
        </IonRow>
    )
}