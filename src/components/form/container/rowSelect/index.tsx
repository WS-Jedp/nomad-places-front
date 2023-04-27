import { IonTabButton } from "@ionic/react"

type option = {
    id: number
    text: string
}

type InputRowSelectProps = {
    defaultOption: option
    options: option[]
    selectedOptionId: number
    onChange: (optionId: number) => void
    onDefaultOptionClick?: () => void
}

export const InputRowSelect: React.FC<InputRowSelectProps> = ({ defaultOption, options, selectedOptionId, onDefaultOptionClick, onChange }) => {

    function isOptionSelected(optionId: number) {
        return selectedOptionId === optionId
    }

    function defineOptionBorderColor(optionId: number) {
        if (isOptionSelected(optionId)) {
            return 'gray-900'
        } else {
            return 'gray-400'
        }
    }
    function defineOptionTextColor(optionId: number) {
        if (isOptionSelected(optionId)) {
            return 'white'
        } else {
            return 'black'
        }
    }

    return (
        <article className="
            relative
            w-full h-auto overflow-x-auto
            flex flex-row flex-nowrap
            items-start justify-start
            py-3
        ">
            <div onClick={onDefaultOptionClick} className={`
                relative
                block items-center justify-center text-center
                cursor-pointer
                ${isOptionSelected(defaultOption.id) ? 'bg-gray-900' : 'bg-white'}
                border border-solid border-${defineOptionBorderColor(defaultOption.id)}
                rounded-full px-3 py-2 min-w-[150px] w-[210px]
                hover:border-gray-900
                transition-all duration-300
                mr-2
            `}>
                <span className={`font-light text-md text-${defineOptionTextColor(defaultOption.id)}`}>
                    {
                        defaultOption.text
                    }
                </span>
            </div>

            {
                options.map((option, index) => (
                    <div onClick={() => onChange(option.id)} key={index} className={`
                        relative
                        block flex-nowrap items-center justify-center text-center
                        cursor-pointer
                        border border-solid border-${defineOptionBorderColor(option.id)}
                        ${isOptionSelected(option.id) ? 'bg-gray-900' : 'bg-white'}
                        rounded-full px-1 py-2 min-w-[90px] w-[120px]
                        hover:border-gray-900
                        transition-all duration-300
                        mr-2
                    `}>
                        <span className={`font-light text-md text-${defineOptionTextColor(option.id)} truncate`}>
                            {
                                option.text
                            }
                        </span>
                    </div>
                ))
            }
        </article>
    )
}