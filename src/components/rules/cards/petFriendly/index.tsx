import { MdPets } from "react-icons/md"
import { RuleCard } from "../../card"
import { RuleCardState } from "../../cardState"

interface RuleCardProps {
    state: boolean | null
}

export const PetFriendlyRuleCard: React.FC<RuleCardProps> = ({ state }) => {

    return (
        <RuleCardState 
            state={state}
            positiveState={
                <RuleCard 
                    Icon={MdPets}
                    rule="Pet Friendly"
                    description="Pets Allowed"
                />
            }
            negativeState={
                <RuleCard 
                    Icon={MdPets}
                    rule="Not Pet Friendly"
                    description="Pets Not Allowed"
                />
            }
        />
    )
}