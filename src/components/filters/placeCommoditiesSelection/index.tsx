import { IonRow, IonCol } from "@ionic/react"
import { SimpleCheckbox } from "../../form/inputs/checkbox"

export const PlaceCommoditiesSelection: React.FC = () => {
    

    const placesCommodities = [
        {
            id: 0,
            commodity: 'Public Wifi',
            isSelected: false
        },
        {
            id: 1,
            commodity: 'Parking',
            isSelected: false
        },
        {
            id: 2,
            commodity: 'Public plugs',
            isSelected: false
        },
        {
            id: 3,
            commodity: 'Cowork space',
            isSelected: false
        },
        {
            id: 4,
            commodity: 'Public bathrooms',
            isSelected: false
        },
    ]
    return (
        <IonRow>
            {
                placesCommodities.map((commodity,) => (
                    <IonCol size="6" sizeMd="6" key={commodity.id}>
                        <SimpleCheckbox 
                            label={commodity.commodity}
                            callback={() => commodity.isSelected = !commodity.isSelected}
                            isSelected={commodity.isSelected}
                        />
                    </IonCol>
                ))
            }
            
        </IonRow>
    )
}