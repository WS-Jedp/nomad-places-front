import { CONSUMPTION_POLICY_RULE_ENUM, NOISE_POLICY_RULE_ENUM, PLACE_RULES_ENUM, PLACE_TIME_LIMIT_RULE, PRIVACY_POLICY_RULE_ENUM } from "../../../models/places"
import { ConsumptionPolicy } from "../cards/consumptionPolicy"
import { NoisePolicyRuleCard } from "../cards/noisePolicy"
import { PetFriendlyRuleCard } from "../cards/petFriendly"
import { PrivacyPolicy } from "../cards/privacyPolicy"
import { SmokingFriendlyRuleCard } from "../cards/smoking"
import { TimeLimitRule } from "../cards/TimeLimit"
import { UnderAgeFriendlyRuleCard } from "../cards/underAge"

interface HandleRuleRenderProps {
    rule: {
        [key: string]: boolean | string | string[] | null
    }
}
export const HandleRuleRender:React.FC<HandleRuleRenderProps> = ({ rule }) => {
    
    const ruleKey = Object.keys(rule)[0] as PLACE_RULES_ENUM


    switch (ruleKey) {
        case PLACE_RULES_ENUM.PET_FRIENDLY:

            return (
                <PetFriendlyRuleCard state={rule[ruleKey] as boolean | null } />
            )
        case PLACE_RULES_ENUM.UNDER_AGE:
            return (
                <UnderAgeFriendlyRuleCard state={rule[ruleKey] as boolean | null} />
            )
        case PLACE_RULES_ENUM.SMOKING:
            return (
                <SmokingFriendlyRuleCard state={rule[ruleKey] as boolean | null} />
            )
        case PLACE_RULES_ENUM.NOISE_POLICY:
            return (
                <NoisePolicyRuleCard state={rule[ruleKey] as NOISE_POLICY_RULE_ENUM | null} />
            )
        case PLACE_RULES_ENUM.CONSUMPTION_POLICY:
            return (
                <ConsumptionPolicy state={rule[ruleKey] as CONSUMPTION_POLICY_RULE_ENUM | null} />
            )
        case PLACE_RULES_ENUM.PRIVACY_POLICY:
            return (
                <PrivacyPolicy state={rule[ruleKey] as PRIVACY_POLICY_RULE_ENUM[] | null} />
            )
        case PLACE_RULES_ENUM.TIME_LIMIT:
            return (
                <TimeLimitRule state={rule[ruleKey] as PLACE_TIME_LIMIT_RULE | null} />
            )
    }

    return null
}