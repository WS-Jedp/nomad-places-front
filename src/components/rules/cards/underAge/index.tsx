import { AiFillAlert } from "react-icons/ai"
import { FaBan } from "react-icons/fa"
import { RuleCard } from "../../card"
import { RuleCardState } from "../../cardState"

interface RuleCardProps {
    state: boolean | null
}

export const UnderAgeFriendlyRuleCard: React.FC<RuleCardProps> = ({ state }) => {

    return (
        <RuleCardState 
            state={state}
            positiveState={
                <RuleCard 
                        Icon={AiFillAlert}
                        rule="Under Age"
                        description="Everybody can go"
                    />
            }
            negativeState={
                <RuleCard 
                    Icon={FaBan}
                    rule="Not Under Age"
                    description="People must be 18+"
                />
            }
        />
    )
}