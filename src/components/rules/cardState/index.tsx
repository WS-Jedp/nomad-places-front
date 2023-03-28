
interface RuleCardStateProps {
    state: boolean | null
    positiveState: JSX.Element
    negativeState: JSX.Element
}

export const RuleCardState:React.FC<RuleCardStateProps> = ({ state, negativeState, positiveState }) => {
    if(!state) {
        return (
            <>
                {
                    negativeState
                }
            </>
        )
    }

    return (
        <>
            {
                positiveState
            }
        </>
    )
}
