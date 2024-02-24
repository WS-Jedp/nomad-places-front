import { useTranslation } from "react-i18next";
import { FaBrain } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdInfo, MdPeopleAlt } from "react-icons/md";
import { PLACE_SESSION_ACTION_TYPE_ENUM } from "../../../../models/session/actions";

type CircleUserActionProps = {
    action: PLACE_SESSION_ACTION_TYPE_ENUM;
    callback: () => void;
    text?: string
    value?: any
    size?: 20 | 32 | 40
    iconSize?: number
    fontSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

export const CircleUserAction: React.FC<CircleUserActionProps> = ({ action, callback, size = 20, iconSize = 24, fontSize, value  }) => {

    const { t } = useTranslation();

    function defineActionName(action: PLACE_SESSION_ACTION_TYPE_ENUM) {
        switch (action) {
            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_AMOUNT_OF_PEOPLE:
                return t('spots.session.amountOfPeople')
            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_MINDSET:
                return t('spots.session.perfectTo')
            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_RECENT_ACTIVITY:
                return t('spots.session.recentActivity')
            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_STATUS:
                return t('spots.session.status')
        }
    }

    function defineActionColor() {
        switch (action) {
            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_MINDSET:
                return "bg-purple-100 text-purple-500 border-purple-500"
            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_AMOUNT_OF_PEOPLE:
                return "bg-blue-100 text-blue-500 border-blue-500"
            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_STATUS:
                return "bg-green-100 text-green-500 border-green-500"
            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_RECENT_ACTIVITY:
                return "bg-yellow-100 text-yellow-500 border-yellow-500"
        }
    }
    function defineActionIcon() {
        switch (action) {
            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_MINDSET:
                return <FaBrain size={iconSize} className="text-purple-500" />
            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_AMOUNT_OF_PEOPLE:
                return <MdPeopleAlt size={iconSize} className="text-blue-500" />
            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_STATUS:
                return <MdInfo size={iconSize} className="text-green-500" />
            case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_RECENT_ACTIVITY:
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
                    rounded-full w-${size || 20} h-${size || 20}
                    ${defineActionColor()}
                `}
            >
                { defineActionIcon() }
            </div>
            <span className={`text-center my-1 text-${fontSize || 'lg'} font-medium text-black capitalize`}>
                { defineActionName(action) }
            </span>

            {
                value && (
                    <span className={
                        `${defineActionColor()} rounded-lg text-sm p-2 capitalize`
                    }>
                        { value }
                    </span>
                )
            }

        </article>
    )
}