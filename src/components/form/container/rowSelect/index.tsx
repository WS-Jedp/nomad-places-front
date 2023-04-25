import { IonTabButton } from "@ionic/react"

type InputRowSelectProps = {
    defaultOption: string
    options: string[]
    selectedOption: string
    onChange: (option: string) => void
}

export const InputRowSelect: React.FC<InputRowSelectProps> = ({ defaultOption, options, selectedOption }) => {

    function defineOptionBorderColor(option: string) {
        if (option.toLowerCase() === selectedOption.toLowerCase()) {
            return 'gray-900'
        } else {
            return 'gray-400'
        }
    }
    function defineOptionTextColor(option: string) {
        if (option.toLowerCase() === selectedOption.toLowerCase()) {
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
            <div className={`
                relative
                block items-center justify-center text-center
                cursor-pointer
                ${defaultOption.toLowerCase() === selectedOption.toLowerCase() ? 'bg-gray-900' : 'bg-white'}
                border border-solid border-${defineOptionBorderColor(defaultOption)}
                rounded-full px-3 py-2 min-w-[150px] w-[210px]
                hover:border-gray-900
                transition-all duration-300
                mr-2
            `}>
                <span className={`font-light text-md text-${defineOptionTextColor(defaultOption)}`}>
                    {
                        defaultOption
                    }
                </span>
            </div>

            {
                options.map((option, index) => (
                    <div key={index} className={`
                        relative
                        block flex-nowrap items-center justify-center text-center
                        cursor-pointer
                        border border-solid border-${defineOptionBorderColor(option)}
                        ${option.toLowerCase() === selectedOption.toLowerCase() ? 'bg-gray-900' : 'bg-white'}
                        rounded-full px-1 py-2 min-w-[90px] w-[120px]
                        hover:border-gray-900
                        transition-all duration-300
                        mr-2
                    `}>
                        <span className={`font-light text-md text-${defineOptionTextColor(option)} truncate`}>
                            {
                                option
                            }
                        </span>
                    </div>
                ))
            }
        </article>
    )
}