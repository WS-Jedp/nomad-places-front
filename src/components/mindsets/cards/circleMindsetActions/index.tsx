import { BsHearts } from "react-icons/bs"
import { IoBook, IoColorWandOutline, IoGlassesOutline } from "react-icons/io5"
import { MdCelebration } from "react-icons/md"
import { MINDSETS } from "../../../../models/mindsets"
import { PLACE_SESSION_ACTION_TYPE_ENUM } from "../../../../models/session/actions"

interface CircleMindsetActionsProps {
    mindset: MINDSETS,
    actionsAmount: number
    callback?: () => void
    withBadge?: boolean
}

export const CircleMindsetActions:React.FC<CircleMindsetActionsProps> = ({ actionsAmount, mindset, callback = () => {}, withBadge = true }) => {
    function handleCardColor() {

        if(actionsAmount === 0) {
            return 'bg-gray-200 text-gray-400 border-gray-400 hover:bg-gray-300'
        }

        switch (mindset) {
            case MINDSETS.ALL:
                return 'bg-amber-100 text-amber-400 border-amber-400 hover:bg-amber-200'
            case MINDSETS.STUDY:
                return 'bg-indigo-100 text-indigo-500 border-indigo-500 hover:bg-indigo-200'
            case MINDSETS.WORK:
                return 'bg-blue-100 text-blue-600 border-blue-600 hover:bg-blue-200'
            case MINDSETS.ROMANTIC:
                return 'bg-pink-100 text-pink-600 border-pink-600 hover:bg-pink-200'
            case MINDSETS.VIBE:
                return 'bg-amber-100 text-amber-600 border-amber-600 hover:bg-amber-200'
        }
    }

    function handleTextColor() {
        if(actionsAmount === 0) {
            return 'text-gray-400'
        }

        switch (mindset) {
            case MINDSETS.ALL:
                return 'text-amber-400'
            case MINDSETS.STUDY:
                return 'text-indigo-500'
            case MINDSETS.WORK:
                return 'text-blue-600'
            case MINDSETS.ROMANTIC:
                return 'text-pink-500'
            case MINDSETS.VIBE:
                return 'text-amber-600'
        }
    }

    function handleBadgeColor() {
        if(actionsAmount === 0) {
            return 'bg-gray-400'
        }

        switch (mindset) {
            case MINDSETS.ALL:
                return 'bg-amber-400'
            case MINDSETS.STUDY:
                return 'bg-indigo-500'
            case MINDSETS.WORK:
                return 'bg-blue-600'
            case MINDSETS.ROMANTIC:
                return 'bg-pink-600'
            case MINDSETS.VIBE:
                return 'bg-amber-600'
        }
    }

    function handleIcon() {
        switch (mindset) {
            case MINDSETS.STUDY:
                return <IoBook size={18} className={handleTextColor()} />
            case MINDSETS.WORK:
                return <IoGlassesOutline size={18} className={handleTextColor()} />
            case MINDSETS.ROMANTIC:
                return <BsHearts size={18} className={handleTextColor()} />
            case MINDSETS.VIBE:
                return <MdCelebration size={18} className={handleTextColor()} />
        }
    }
    return (
        <article className={`
            relative
            cursor-pointer
            w-20 h-20
            rounded-full p-3
            flex flex-col items-center justify-center
            ${handleCardColor() }
            `}
            onClick={callback}
            >
                <div>
                    {
                        handleIcon()
                    }
                </div>
                <span className="text-[12px] font-bold my-1">
                    {
                        mindset
                    }
                </span>
                {
                    withBadge && (
                        <span className={`
                                absolute right-0 bottom-0
                                ${handleBadgeColor()}
                                w-5 h-5
                                flex items-center justify-center
                                text-center text-white text-[11px] font-bold rounded-full
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