import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { MINDSETS } from "../../../models/mindsets"
import { PlaceState, PLACE_STATUS } from "../../../models/placeStatus"
import { PlaceSessionActionDataPayload, UPDATE_ACTIONS } from "../../../models/session"

export const UpdateActionType: React.FC<{ payload: PlaceSessionActionDataPayload['UPDATE'] }> = ({ payload }) => {
    const { t } = useTranslation();
    const [ payloadValue, setPayloadValue ] = useState<{ range: [number, number], amount: string } | MINDSETS | any>()

    useEffect(() => {
        setPayloadValue(payload.data.data)
    }, [])

    switch (payload.type) {
        case UPDATE_ACTIONS.PLACE_AMOUNT_OF_PEOPLE:
            return (
                <div>
                    <p className="font-light text-sm">
                        { t('spots.messages.session.updateAmountOfPeople', { firstAmount: payloadValue?.range[0] || 0, lastAmount: payloadValue?.range[1] || 0 }) }
                    </p>
                </div>
            )
        case UPDATE_ACTIONS.PLACE_MINDSET:
            return (
                <div>
                    <p className="font-light text-sm">
                        {t('spots.messages.session.updatePerfectTo')} <span> { payloadValue && t(`filters.mindsets.${String(payloadValue).toLowerCase()}`)  } </span>
                    </p>
                </div>
            )
       
        case UPDATE_ACTIONS.PLACE_STATUS:
            if(!payloadValue) return null
            return (
                <div>
                    <p className="font-light text-sm">
                        {t('spots.messages.session.updateStatus')} <span> { payloadValue.type } </span>
                    </p>
                </div>
            )
    }

   return null
}