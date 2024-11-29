import { useEffect, useState } from "react"
import { useAppSelector } from "../../../../common/hooks/useTypedSelectors"
import { MINDSETS } from "../../../../models/mindsets"
import { UPDATE_ACTIONS } from "../../../../models/session"
import { PlaceSessionAction } from "../../../../models/session/actions"
import { CircleMindsetActions } from "../../cards/circleMindsetActions"

interface AmountMindsetActionsProps {
    mindsetCallback: (actionType: UPDATE_ACTIONS, value: MINDSETS) => void
}

export const AmountMindsetActions:React.FC<AmountMindsetActionsProps> = ({ mindsetCallback }) => { 

    const [ mindsetOptions, setMindsetOptions ] = useState<{mindset: MINDSETS, actions: PlaceSessionAction[]}[]>([])
    const { cachedSession, currentSessionActions } = useAppSelector(state => state.spotSession)


    // function isMindsetActions() {
    //     let isAnyMindsetAction = false
    //     cachedSession?.bestMindsetTo?.forEach(cachedMinsetOption => {
    //         if(isAnyMindsetAction) return

    //         if(cachedMinsetOption.actions.length > 0) {
    //             isAnyMindsetAction = true
    //             return
    //         }
    //     })
    //     return isAnyMindsetAction
    // }

    function getMindsetUpdateActionsSortered() {
        if(!cachedSession || !cachedSession.bestMindsetTo) return []
        setMindsetOptions(new Array(...cachedSession?.bestMindsetTo).sort((a,b) => a.actions.length < b.actions.length ? 1 : -1))
    }

    useEffect(() => {
        getMindsetUpdateActionsSortered()
    }, [currentSessionActions])

    return (
        <div className="mr-1 flex w-full items-start justify-start">
            {
                mindsetOptions.map((mindsetOption, index) => (
                    <div
                        className="mr-2"
                        key={index}
                    >

                        <CircleMindsetActions
                            actionsAmount={mindsetOption.actions.length}
                            mindset={mindsetOption.mindset}
                            callback={() => mindsetCallback(UPDATE_ACTIONS.PLACE_MINDSET, mindsetOption.mindset)}
                        />
                    </div>
                    ))
            }
        </div>

    )
}