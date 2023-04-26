import { MdCheck } from "react-icons/md";

type SimpleCheckboxProps = {
    label: string;
    callback: () => void;
    isSelected?: boolean;
}

export const SimpleCheckbox: React.FC<SimpleCheckboxProps> = ({ label, callback, isSelected }) => {
    return (
        <article className={`
                relative
                flex flex-row items-center justify-start
                rounded-lg
                w-full h-12
                p-3
                cursor-pointer
                hover:bg-gray-100
                transition-all duration-300
            `}
            onClick={callback}
            >
            <span className={`
                relative
                flex items-center justify-center text-center
                w-6 h-6
                rounded-md
                mr-2
                border border-solid border-gray-400 
                bg-${isSelected ? 'gray-900' : 'white'} 
            `}>
                {
                    isSelected && (
                        <MdCheck size={15} color="white" />    
                    )
                }
            </span>
            <span className="text-md font-semibold text-start break-keep">
                {
                    label
                }
            </span>
        </article>
    )
}