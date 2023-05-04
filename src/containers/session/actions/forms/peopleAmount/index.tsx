import { IonCol, IonRow } from "@ionic/react"
import { useState } from "react"
import { MdPeople } from "react-icons/md"
import { SimpleButton } from "../../../../../components/buttons/simple"

export const PeopleAmountActionForm: React.FC = () => {

    const opts = [
        {
            id: 0,
            amount: '0-5',
            min: 0,
            max: 5,
        },
        {
            id: 1,
            amount: '5-10',
            min: 5,
            max: 10,
        },
        {
            id: 2,
            amount: '10-15',
            min: 10,
            max: 15,
        },
        {
            id: 3,
            amount: '15-20',
            min: 15,
            max: 20,
        },
        {
            id: 4,
            amount: '20-25',
            min: 20,
            max: 25,
        },
        {
            id: 5,
            amount: '+25',
            min: 25,
            max: 99,
        },

    ]

    const [options, setOptions] = useState(opts)
    const [optionSelected, setOptionSelected] = useState<number | null>(null)

    function isOptionSelected(optionID: number) {
        
        return optionSelected === optionID
    }
    
    return (
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
                            bg-white ${isOptionSelected(option.id) ? 'bg-gray-200' : ''}
                            hover:bg-gray-200
                    `}
                        onClick={() => setOptionSelected(option.id)}
                    >
                        <MdPeople size={30}  color="gray"/>
                        <h3 className="font-light text-md my-3">
                            { option.amount }
                        </h3>
                    </IonCol>
                ))
            }
        </IonRow>
        )
}