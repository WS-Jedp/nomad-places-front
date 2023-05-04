import { IonCol, IonRow } from "@ionic/react"
import { useState } from "react"
import { SimpleMindsetCard } from "../../../../../components/mindsets/cards/simpleCardMindset"
import { PlaceMindsetsFilter } from "../../../../../models/filters"
import { MINDSETS } from "../../../../../models/mindsets"

export const BestMindsetForm: React.FC = () => {

    const mindsetOptions: PlaceMindsetsFilter[] = [
        {
            id: 0,
            name: MINDSETS.STUDY,
        },
        {
            id: 1,
            name: MINDSETS.WORK,
        },
        {
            id: 2,
            name: MINDSETS.ROMANTIC,
        },
        {
            id: 3,
            name: MINDSETS.VIBE,
        }
    ]

    const [options, setOptions] = useState(mindsetOptions)
    const [optionSelected, setOptionSelected] = useState<number | null>(null)

    return (
        <IonRow className='relative w-full h-auto flex flex-row'>
            {
                options.map((option, index) => (
                    <IonCol size="4" 
                    key={index}
                    className={`
                            relative
                            flex flex-col items-center justify-center 
                            w-full
                            text-center text-black
                            h-32 px-6
                    `}
                        onClick={() => setOptionSelected(option.id)}
                    >
                        <SimpleMindsetCard 
                            text={option.name.toLowerCase()}
                            isSelected={ false }
                            mindset={option.name}
                            callback={() => {}}
                        />
                    </IonCol>
                ))
            }
        </IonRow>
        )
}