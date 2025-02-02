import { useEffect, useState } from "react"
import { useAppSelector } from "../../../common/hooks/useTypedSelectors"
import { UPDATE_ACTIONS } from "../../../models/session"
import { PlaceSessionAction } from "../../../models/session/actions"
import { CircleNoiseLevelActions } from "../cards/circleNoiseLevelActions"
import { PLACE_NOISE_LEVEL } from "../../../models/placeNoiseLevel"

interface NoiseLevelActionsAmountProps {
    callback: (actionType: UPDATE_ACTIONS, value: string) => void
}

export const NoiseLevelActionsAmount: React.FC<NoiseLevelActionsAmountProps> = ({ callback }) => {

    const [ nosieLevelOpts, setNoiseLevelOpts ] = useState<{ noiseLevel: PLACE_NOISE_LEVEL, actions: PlaceSessionAction[] }[]>([])
    const { cachedSession, currentSessionActions } = useAppSelector(state => state.spotSession)

    function getAmountOfNoiseLevelUpdateActionsSortered() {
        if(!cachedSession || !cachedSession.noiseLevel) return []
        setNoiseLevelOpts(new Array(...cachedSession?.noiseLevel).sort((a,b) => a.actions.length < b.actions.length ? 1 : -1))
    }

    useEffect(() => {
        getAmountOfNoiseLevelUpdateActionsSortered()
    }, [currentSessionActions])

    return (
        <div className="relative flex w-full overflow-x-auto items-start justify-start py-3">
            {
                nosieLevelOpts.map((option, index) => (
                    <div
                        className="mr-2"
                        key={index}
                    >
                        <CircleNoiseLevelActions 
                            noiseLevel={option.noiseLevel}
                            actionsAmount={option.actions.length}
                            callback={() => callback(UPDATE_ACTIONS.NOISE_LEVEL, option.noiseLevel)}
                        />

                    </div>
                ))
            }
        </div>
    )
}