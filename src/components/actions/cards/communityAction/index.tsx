import { useEffect, useState } from "react"
import { PlaceSessionActionDataPayload } from "../../../../models/session"
import { PlaceSessionAction } from "../../../../models/session/actions"
import { UpdateActionType } from "../../updateActionType"

/**
 * 
 * createdDate
: 
"2023-07-01T17:51:00.258Z"
dayTimeSection
: 
"MIDDAY"
id
: 
"64a067843555ea9fea993d20"
payload
: 
"{\"type\":\"PLACE_AMOUNT_OF_PEOPLE\",\"data\":{\"data\":[5,10]}}"
placeSessionID
: 
"64a0654a3555ea9fea993d1c"
type
: 
"UPDATE"
user
: 
{id: '6477e43a62fa1ca82ace7f99', profilePicture: null, username: 'jedp', email: 'jedp082@gmail.com', password: '$2b$10$z3UlQ3uo8cX/ikJ7mkzZy.gmMFsTNKNis8bibvhKq8ULPxpnrFKRW', …}
userID
: 
"6477e43a62fa1ca82ace7f99"

 */
interface CommunityCardActionProps {
    action: PlaceSessionAction
}

export const CommunityCardAction:React.FC<CommunityCardActionProps> = ({ action }) => {

    const [payloadData, setPayloadData] = useState<PlaceSessionActionDataPayload['UPDATE']>()

    useEffect(() => {
        const payload = JSON.parse(action.payload)
        setPayloadData(payload)
    }, [])

    return (
        <article className="p-3 relative w-full flex flex-row flex-nowrap items-center justify-between">
            <div className="flex flex-col flex-nowrap items-start">
                <div className="flex flex-row flex-nowrap items-center justify-start">
                    <div className="mr-2 w-2 h-2 rounded-full shadow-sm bg-gray-300"></div>
                    <section>
                        <p className="font-bold inline text-sm">
                            @{ action.username }
                        </p>
                    </section>
                </div>
                <div className="ml-4">
                    {
                        payloadData && (
                            <UpdateActionType payload={payloadData} />
                        )
                    }
                </div>
            </div>
            <span className="font-extralight text-gray-600 text-xs">
                { new Date(action.createdDate).toISOString() }
            </span>
        </article>
    )
}