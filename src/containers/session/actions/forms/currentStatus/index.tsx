import { IonCol, IonRow } from "@ionic/react"
import { useState } from "react"
import { IoMdAlert, IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io"
import { MdPeople } from "react-icons/md"
import { SimpleButton } from "../../../../../components/buttons/simple"

export const CurrentStatusForm: React.FC = () => {

    const opts = [
        {
            id: 0,
            value: true,
            name: 'Open',
            type: 'OPEN',
        },
        {
            id: 1,
            value: false,
            name: 'Closed',
            type: 'CLOSED',
        }
    ]

    const [options, setOptions] = useState(opts)
    const [optionSelected, setOptionSelected] = useState<number | null>(null)

    function handleBackgroundColor(type: string) {
        switch (type) {
            case 'OPEN':
                return 'bg-green-100 hover:bg-green-200'
            case 'CLOSED':
                return 'bg-red-100 hover:bg-red-200'
        }
    }

    function handleTextColor(type: string) {
        switch (type) {
            case 'OPEN':
                return 'text-green-500'
            case 'CLOSED':
                return 'text-red-500'
        }
    }

    function handleIcon(type: string) {
        switch (type) {
            case 'OPEN':
                return <IoMdCheckmarkCircleOutline size={30}  color="green"/>
            case 'CLOSED':
                return <IoMdCloseCircleOutline size={30}  color="red"/>
        }
    }

    function isOptionSelected(optionID: number) {
        return optionSelected === optionID
    }
    return (
        <IonRow className='relative w-full h-auto flex flex-row'>
            {
                options.map((option, index) => (
                    <IonCol size="6" 
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
                            ${handleBackgroundColor(option.type)}
                    `}
                        onClick={() => setOptionSelected(option.id)}
                    >
                        {
                            handleIcon(option.type)
                        }
                        <h3 className="font-light text-md my-3">
                            { option.name }
                        </h3>
                    </IonCol>
                ))
            }
        </IonRow>
        )
}