import { format, formatDate, parseISO } from "date-fns"
import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next'
import { getLocalISODate } from "../../../../common/utils/dates"
import { PlaceSessionActionDataPayload, PLACE_SESSION_ACTIONS_ENUM } from "../../../../models/session"
import { PlaceSessionAction } from "../../../../models/session/actions"
interface AccessSessionActionProps {
    action: PlaceSessionAction
}

export const AccessSessionAction: React.FC<AccessSessionActionProps> = ({ action }) => {

    const {t} = useTranslation()
    const [payloadData, setPayloadData] = useState<PlaceSessionActionDataPayload['JOIN' | 'LEAVE']>()


    function getActionType() {
        if(action.type === PLACE_SESSION_ACTIONS_ENUM.JOIN) {
            return t('spots.messages.session.userJoin')
        }

        return t('spots.messages.session.userLeave')
    }

    useEffect(() => {
        const payload = JSON.parse(action.payload)
        setPayloadData(payload)
    }, [])

    return (
        <article className="
            relative
            w-full px-3 bg-gray-100
            flex flex-row flex-nowrap items-center justify-between
        "
        >
            <div className="flex py-3 flex-row flex-nowrap items-center justify-start">
                <div className="mr-2 w-2 h-2 rounded-full shadow-sm bg-gray-300"></div>
                <p className="text-md md:text-sm font-light">
                    <span className="font-semibold">@{payloadData?.data.username}</span> {getActionType()}
                </p>
            </div>

            <span className="font-extralight text-gray-600 text-xs">
                {/* Time of the actions accroding to the date */}
                { format(parseISO(getLocalISODate(action.createdDate)), 'p') }
            </span>

        </article>
    )
}