import { FaBrain } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdInfo, MdPeopleAlt } from "react-icons/md";

type CircleUserActionProps = {
    action: string;
    callback: () => void;
    text: string
    size?: 20 | 32 | 40
    iconSize?: number
    fontSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

export const CircleUserAction: React.FC<CircleUserActionProps> = ({ action, callback, size = 20, iconSize = 24, fontSize = 'lg' }) => {

    function defineActionColor() {
        switch (action) {
            case 'mindset':
                return "bg-purple-100 text-purple-500 border-purple-500"
            case 'people':
                return "bg-blue-100 text-blue-500 border-blue-500"
            case 'status':
                return "bg-green-100 text-green-500 border-green-500"
            case 'recent-activity':
                return "bg-yellow-100 text-yellow-500 border-yellow-500"
        }
    }
    function defineActionIcon() {
        switch (action) {
            case 'mindset':
                return <FaBrain size={iconSize} className="text-purple-500" />
            case 'people':
                return <MdPeopleAlt size={iconSize} className="text-blue-500" />
            case 'status':
                return <MdInfo size={iconSize} className="text-green-500" />
            case 'recent-activity':
                return <IoMdAdd size={iconSize} className="text-yellow-500" />
        }
    }

    return (
        <article className="
            relative
            flex flex-col items-center justify-center
            w-full p-3
            cursor-pointer
        "
        onClick={callback}
        >
            <div className={`
                    flex flex-col 
                    items-center justify-center 
                    rounded-full w-${size} h-${size}
                    ${defineActionColor()}
                `}
            >
                { defineActionIcon() }
            </div>
            <span className={`text-center my-1 text-${fontSize} font-medium text-black capitalize`}>
                { action }
            </span>

        </article>
    )
}