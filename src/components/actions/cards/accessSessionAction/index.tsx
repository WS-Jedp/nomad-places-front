import { useEffect, useState } from "react"
import { PlaceSessionActionDataPayload, PLACE_SESSION_ACTIONS_ENUM } from "../../../../models/session"
import { PlaceSessionAction, PLACE_SESSION_ACTIONS_TYPE } from "../../../../models/session/actions"

interface AccessSessionActionProps {
    action: PlaceSessionAction
}

export const AccessSessionAction: React.FC<AccessSessionActionProps> = ({ action }) => {
    
    const [payloadData, setPayloadData] = useState<PlaceSessionActionDataPayload['JOIN' | 'LEAVE']>()


    function getActionType() {
        if(action.type === PLACE_SESSION_ACTIONS_ENUM.JOIN) {
            return 'Join'
        }

        return 'Leave'
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
                    <span className="font-semibold">@{payloadData?.data.username}</span> {getActionType()} the session
                </p>
            </div>

            <span className="font-extralight text-gray-600 text-xs">
                { new Date(action.createdDate).toDateString() }
            </span>

        </article>
    )
}