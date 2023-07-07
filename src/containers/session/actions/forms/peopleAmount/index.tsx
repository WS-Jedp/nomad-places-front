import { IonCol, IonRow } from "@ionic/react"
import { useEffect, useState } from "react"
import { MdPeople } from "react-icons/md"
import { useAppDispatch, useAppSelector } from "../../../../../common/hooks/useTypedSelectors"
import { SimpleButton } from "../../../../../components/buttons/simple"
import { PLACE_SESSION_ACTIONS_ENUM } from "../../../../../models/session"
import { PLACE_AMOUNT_OF_PEOPLE_ACTION_OPTION } from "../../../../../models/session/actions"
import { resetSessionAmountOfPeople, updateSessionAmountOfPeople } from "../../../../../store/redux/slices/sessionActions/update"

interface PeopleAmountActionFormProps {
    onSave: () => void
}

export const PeopleAmountActionForm: React.FC<PeopleAmountActionFormProps> = ({ onSave }) => {

    const { payload: currentPeopleAmountOption } = useAppSelector(state => state.placeSession.sessionAmountOfPeopleAction)
    const dispatch = useAppDispatch()

    const opts: PLACE_AMOUNT_OF_PEOPLE_ACTION_OPTION[] = [
        {
            id: 0,
            amount: '0-5',
            min: 0,
            max: 5,
            range: [0, 5]
        },
        {
            id: 1,
            amount: '5-10',
            min: 5,
            max: 10,
            range: [5, 10]
        },
        {
            id: 2,
            amount: '10-15',
            min: 10,
            max: 15,
            range: [10, 15]
        },
        {
            id: 3,
            amount: '15-20',
            min: 15,
            max: 20,
            range: [15, 20]
        },
        {
            id: 4,
            amount: '20-25',
            min: 20,
            max: 25,
            range: [20, 25]
        },
        {
            id: 5,
            amount: '+25',
            min: 25,
            max: 99,
            range: [25, 99]
        },

    ]

    const [options, setOptions] = useState(opts)
    const [currentOption, setCurrentOption] = useState(currentPeopleAmountOption)

    function isOptionSelected(optionID: number) {
        return currentOption?.id === optionID
    }

    function handleCurrentOptionSelected(option: PLACE_AMOUNT_OF_PEOPLE_ACTION_OPTION) {
        if(currentOption) {
            if(currentOption.id === option.id) {
                setCurrentOption(null)
                return
            }
        }
        setCurrentOption(option)
    }

    function handleSaveSessionAction() {
        if(!currentOption) {
            dispatch( resetSessionAmountOfPeople() )
        } else {
            dispatch( updateSessionAmountOfPeople({ amountOfPeople: currentOption }) )
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
                                w-full border
                                border-solid border-gray-100 
                                text-center text-black
                                h-32
                                cursor-pointer
                        `}
                            onClick={() => handleCurrentOptionSelected(option)}
                        >
                            <div className={`
                                w-full h-full
                                flex flex-col items-center justify-center
                                ${isOptionSelected(option.id) ? 'bg-blue-200 text-blue-500' : 'bg-white text-black'}
                                hover:bg-blue-100 
                            `}>
                                <MdPeople size={30} />
                                <h3 className="font-light text-md my-3">
                                    { option.amount }
                                </h3>
                            </div>
                        </IonCol>
                    ))
                }
            </IonRow>
            <IonRow className="flex items-center justify-center p-6 w-full">
                <SimpleButton 
                    text='Save'
                    action={handleSaveSessionAction}
                />
            </IonRow>
        </>
        )
}