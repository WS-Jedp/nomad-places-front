import { IonCol, IonRow } from "@ionic/react"
import { useState } from "react"
import { SimpleMindsetCard } from "../../../../../components/mindsets/cards/simpleCardMindset"
import { SimpleButton } from "../../../../../components/buttons/simple"
import { PlaceMindsetsFilter } from "../../../../../models/filters"
import { MINDSETS } from "../../../../../models/mindsets"
import { useAppDispatch, useAppSelector } from "../../../../../common/hooks/useTypedSelectors"
import { resetSessionMindset, updateSessionMindset } from "../../../../../store/redux/slices/sessionActions/update"
import { useTranslation } from "react-i18next"

interface BestMindsetFormProps {
    onSave: () => void
}

export const BestMindsetForm: React.FC<BestMindsetFormProps> = ({ onSave }) => {

    const {t} = useTranslation();
    const { payload: currentMindsetOption } = useAppSelector(state => state.placeSession.sessionMindsetAction)
    const dispatch = useAppDispatch()

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
    const [optionSelected, setOptionSelected] = useState<MINDSETS | null>(currentMindsetOption)

    function handleSelectOption(mindset: MINDSETS) {
        if(optionSelected === mindset) {
            setOptionSelected(null)
            return
        }
        setOptionSelected(mindset)
    }

    function onSaveAction() {
        if(!optionSelected) {
            dispatch( resetSessionMindset() )
        } else {
            dispatch( updateSessionMindset({ mindset: optionSelected }) )
        }
        onSave()
    }

    return (
        <>
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
                            onClick={() => handleSelectOption(option.name)}
                        >
                            <SimpleMindsetCard 
                                text={t(`filters.mindsets.${option.name.toLowerCase()}`)}
                                isSelected={ optionSelected === option.name }
                                mindset={option.name}
                                callback={() => {}}
                            />
                        </IonCol>
                    ))
                }
            </IonRow>
            <IonRow className="flex items-center justify-center p-6 w-full">
                <SimpleButton 
                    text={t('actions.general.save')}
                    action={onSaveAction}
                />
            </IonRow>
        </>
        )
}