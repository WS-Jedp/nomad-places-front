import { BsHearts } from "react-icons/bs";
import { IoBook, IoColorWandOutline, IoGlassesOutline } from "react-icons/io5";
import { MdCelebration } from "react-icons/md";
import { MINDSETS } from "../../../../models/mindsets";

type SimpleMindsetCard = {
    text: string;
    isSelected?: boolean;
    mindset: MINDSETS
    callback: () => void;
}

export const SimpleMindsetCard: React.FC<SimpleMindsetCard> = ({ text, isSelected, callback, mindset }) => {

    function handleCardColor() {
        switch (mindset) {
            case MINDSETS.ALL:
                return 'bg-amber-100 text-amber-400 border-amber-400'
            case MINDSETS.STUDY:
                return 'bg-indigo-100 text-indigo-500 border-indigo-500'
            case MINDSETS.WORK:
                return 'bg-blue-100 text-blue-600 border-blue-600'
        }
    }

    function handleTextColor() {
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

    function handleHoverColor() {
        switch (mindset) {
            case MINDSETS.ALL:
                return 'border-amber-400'
            case MINDSETS.STUDY:
                return 'border-indigo-500'
            case MINDSETS.WORK:
                return 'border-blue-600'
            case MINDSETS.WORK:
                return 'border-pink-500'
            case MINDSETS.VIBE:
                return 'border-amber-600'
        }
    }

    function handleIcon() {
        switch (mindset) {
            case MINDSETS.ALL:
                return <IoColorWandOutline size={24} className={handleTextColor()} />
            case MINDSETS.STUDY:
                return <IoBook size={24} className={handleTextColor()} />
            case MINDSETS.WORK:
                return <IoGlassesOutline size={24} className={handleTextColor()} />
            case MINDSETS.ROMANTIC:
                return <BsHearts size={24} className={handleTextColor()} />
            case MINDSETS.VIBE:
                return <MdCelebration size={24} className={handleTextColor()} />
        }
    }

    return (
        <article className={`
                relative
                ${isSelected ? handleCardColor() : 'white'}
                ${isSelected ? 'border-2' : 'border'} border-solid
                flex flex-col items-start justify-between
                rounded-lg
                w-28 h-28
                p-3
                cursor-pointer
                hover:${handleHoverColor()}
                transiation-all duration-300 text-
            `}
            onClick={callback}
        >

            <span className="">
                { handleIcon() }
            </span>

            <h3 className="font-semibold capitalize">
                {
                    text
                }
            </h3>
        </article>
    )
}