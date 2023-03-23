import { MouseEventHandler } from "react";

export const FilterTag: React.FC<{ text: string, action: MouseEventHandler<HTMLButtonElement>, isSelected?: boolean }> = ({ action, text, isSelected }) => (
    <button 
        className={`
            inline-flex
            text-center
            h-7
            p-1 px-3 mr-3
            shadow-md
            rounded-full
            bg-white
            transition-all ease-in-out duration-[.42s]
            hover:bg-gray-300 hover:shadow-lg
            ${isSelected ? 'bg-gray-400' : ''}
        `}
        onClick={action}
    >
    <span className="text-sm text-gray-500 font-bold">
        { text }
    </span>
</button>
) 