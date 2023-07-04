import { useEffect, useState } from "react"
import { MINDSETS } from "../../../models/mindsets"
import { PlaceState, PLACE_STATUS } from "../../../models/placeStatus"
import { PlaceSessionActionDataPayload, UPDATE_ACTIONS } from "../../../models/session"

export const UpdateActionType: React.FC<{ payload: PlaceSessionActionDataPayload['UPDATE'] }> = ({ payload }) => {

    const [ payloadValue, setPayloadValue ] = useState<[number, number] | MINDSETS | any>()

    useEffect(() => {
        setPayloadValue(payload.data.data)
    }, [])

    switch (payload.type) {
        case UPDATE_ACTIONS.PLACE_AMOUNT_OF_PEOPLE:
            return (
                <div>
                    <p className="font-light text-sm">
                        There is between <span> {payloadValue?.[0]} to {payloadValue?.[1]} </span> people in the spot
                    </p>
                </div>
            )
        case UPDATE_ACTIONS.PLACE_MINDSET:
            return (
                <div>
                    <p className="font-light text-sm">
                        The spot it's perfect to <span> { payloadValue } </span>
                    </p>
                </div>
            )
       
        case UPDATE_ACTIONS.PLACE_STATUS:
            if(!payloadValue) return null
            return (
                <div>
                    <p className="font-light text-sm">
                        The spot it's <span> { payloadValue.type } </span>
                    </p>
                </div>
            )
    }

   return null
}