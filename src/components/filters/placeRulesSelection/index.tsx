import { IonRow, IonCol } from "@ionic/react"
import { SimpleCheckbox } from "../../form/inputs/checkbox"
import { useAppDispatch, useAppSelector } from "../../../common/hooks/useTypedSelectors"
import { selectSpotRuleFilter, removeSpotRuleFilter } from "../../../store/redux/slices/filters"
import { useTranslation } from "react-i18next"

export const PlaceRulesSelection: React.FC = () => {

    const { t } = useTranslation()

    const { spotRulesFilters, selectedSpotRulesFilter } = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch()

    function isRuleSelected(id: number) {
        return selectedSpotRulesFilter.includes(id)
    }

    function handleCallback(spotId: number) {
        if(isRuleSelected(spotId)) {
            dispatch(removeSpotRuleFilter({ spotRuleFilterID: spotId }))
        } else {
            dispatch(selectSpotRuleFilter({ spotRuleFilterID: spotId }))
        }
    }

    return (
        <IonRow>
            {
                spotRulesFilters.map((rule) => (
                    <IonCol size="12" sizeMd="6" key={rule.id}>
                        <SimpleCheckbox 
                            label={t(`filters.rules.${rule.rule}`)}
                            callback={() => handleCallback(rule.id)}
                            isSelected={isRuleSelected(rule.id)}
                        />
                    </IonCol>
                ))
            }
        </IonRow>
    )
}