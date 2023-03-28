import { PLACE_RULES_ENUM } from "../../../models/places"
import { PetFriendlyRuleCard } from "../cards/petFriendly"
import { SmokingFriendlyRuleCard } from "../cards/smoking"
import { UnderAgeFriendlyRuleCard } from "../cards/underAge"

interface HandleRuleRenderProps {
    rule: {
        [key: string]: boolean | null
    }
}
export const HandleRuleRender:React.FC<HandleRuleRenderProps> = ({ rule }) => {
    
    const ruleKey = Object.keys(rule)[0] as PLACE_RULES_ENUM

    switch (ruleKey) {
        case PLACE_RULES_ENUM.PET_FRIENDLY:
            return (
                <PetFriendlyRuleCard state={rule[ruleKey]} />
            )
        case PLACE_RULES_ENUM.SMOKING:
            return (
                <UnderAgeFriendlyRuleCard state={rule[ruleKey]} />
            )
        case PLACE_RULES_ENUM.UNDER_ANGE:
            return (
                <SmokingFriendlyRuleCard state={rule[ruleKey]} />
            )
    }

    return null
}