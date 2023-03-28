import { FaSmoking, FaSmokingBan } from "react-icons/fa"
import { RuleCard } from "../../card"
import { RuleCardState } from "../../cardState"

interface RuleCardProps {
    state: boolean | null
}

export const SmokingFriendlyRuleCard: React.FC<RuleCardProps> = ({ state }) => {

    return (
        <RuleCardState 
            state={state}
            positiveState={
                <RuleCard 
                        Icon={FaSmoking}
                        rule="Smoking"
                        description="Smoking is allowed"
                    />
            }
            negativeState={
                <RuleCard 
                    Icon={FaSmokingBan}
                    rule="No Smoking"
                    description="Smoking is not allowed"
                />
            }
        />
    )
}