interface AmountOfPeopleCircleCardProps {
    amount: string
    callback?: () => void
    actionsAmount: number
    withBadge?: boolean
}

export const AmountOfPeopleCircleCard: React.FC<AmountOfPeopleCircleCardProps> = ({ amount, callback, actionsAmount, withBadge = true }) => {
    function handleCardColor() {
        if(actionsAmount === 0) {
            return 'bg-gray-200 text-gray-400 border-gray-400 hover:bg-gray-300'
        }

        switch (amount) {
            case '0-5':
                return 'bg-blue-100 text-blue-500 border-blue-600 hover:bg-blue-200'
            case '5-10':
                return 'bg-indigo-200 text-indigo-500 border-indigo-500 hover:bg-indigo-300'
            case '10-15':
                return 'bg-yellow-200 text-yellow-600 border-yellow-600 hover:bg-yellow-300'
            case '15-20':
                return 'bg-amber-200 text-amber-600 border-amber-600 hover:bg-amber-300'
            case '20-25':
                return 'bg-red-100 text-red-600 border-red-600 hover:bg-red-200'
            case '+25':
                return 'bg-red-200 text-red-600 border-red-600 hover:bg-red-300'

        }
    }

    function handleBadgeColor() {
        if(actionsAmount === 0) {
            return 'bg-gray-400'
        }
        
        switch (amount) {
            case '0-5':
                return 'bg-blue-600'
            case '5-10':
                return 'bg-indigo-500'
            case '10-15':
                return 'bg-yellow-600'
            case '15-20':
                return 'bg-amber-600'
            case '20-25':
                return 'bg-rose-400'
            case '+25':
                return 'bg-red-600'
        }
    }
    
    return (
        <article className={`
        relative
        cursor-pointer
        w-20 h-12
        rounded-full p-3
        flex flex-col items-center justify-center
        ${handleCardColor()}
        `}
        onClick={callback}
        >
            <span className="text-md font-bold">
                {
                    amount
                }
            </span>
            {
                withBadge && (
                    <span className={`
                            absolute right-0 bottom-0
                            w-5 h-5
                            flex items-center justify-center
                            text-center text-white text-[11px] font-bold rounded-full
                            ${handleBadgeColor()}
                            `
                        }
                    >
                        {
                            actionsAmount || 0
                        }
                    </span>
                )
            }
        </article>
    )
}