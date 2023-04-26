import { IonRow, IonCol } from "@ionic/react"
import { SimpleCheckbox } from "../../form/inputs/checkbox"

export const PlaceRulesSelection: React.FC = () => {

    const placesRules = [
        {
            id: 0,
            rule: 'Pet allowed',
            isSelected: false
        },
        {
            id: 1,
            rule: 'Smoking Allowed',
            isSelected: false
        },
        {
            id: 2,
            rule: 'Under age allowed',
            isSelected: false
        },
    ]
    return (
        <IonRow>
            {
                placesRules.map((rule,) => (
                    <IonCol size="12" sizeMd="6" key={rule.id}>
                        <SimpleCheckbox 
                            label={rule.rule}
                            callback={() => rule.isSelected = !rule.isSelected}
                            isSelected={rule.isSelected}
                        />
                    </IonCol>
                ))
            }
            
        </IonRow>
    )
}