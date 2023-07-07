import { useEffect, useState } from "react"
import { useAppSelector } from "../../../common/hooks/useTypedSelectors"
import { UPDATE_ACTIONS } from "../../../models/session"
import { PlaceSessionAction } from "../../../models/session/actions"
import { AmountOfPeopleCircleCard } from "../cards/circleCard"

interface AmountOfPeopleActionsAmountProps {
    callback: (actionType: UPDATE_ACTIONS, value: string) => void
}

export const AmountOfPeopleActionsAmount: React.FC<AmountOfPeopleActionsAmountProps> = ({ callback }) => {

    const [ amountOfPeopleOpts, setAmountOfPeopleOpts ] = useState<{ amount: string, actions: PlaceSessionAction[] }[]>([])
    const { cachedSession, currentSessionActions } = useAppSelector(state => state.spotSession)

    function getAmountOfPeopleUpdateActionsSortered() {
        if(!cachedSession || !cachedSession.amountOfPeople) return []
        setAmountOfPeopleOpts(new Array(...cachedSession?.amountOfPeople).sort((a,b) => a.actions.length < b.actions.length ? 1 : -1))
    }

    useEffect(() => {
        getAmountOfPeopleUpdateActionsSortered()
    }, [currentSessionActions])

    return (
        <div className="relative flex w-full overflow-x-auto items-start justify-start py-3">
            {
                amountOfPeopleOpts.map((option, index) => (
                    <div
                        className="mr-2"
                        key={index}
                    >

                        <AmountOfPeopleCircleCard 
                            amount={option.amount}
                            actionsAmount={option.actions.length}
                            callback={() => callback(UPDATE_ACTIONS.PLACE_AMOUNT_OF_PEOPLE, option.amount)}
                        />

                    </div>
                ))
            }
        </div>
    )
}