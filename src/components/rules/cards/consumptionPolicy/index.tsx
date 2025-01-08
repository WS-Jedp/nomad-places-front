import { BiPurchaseTagAlt } from "react-icons/bi"
import { useTranslation } from 'react-i18next'
import { RuleCard } from "../../card"
import { RuleCardState } from "../../cardState"
import { CONSUMPTION_POLICY_RULE_ENUM } from "../../../../models/places"

interface RuleCardProps {
    state: CONSUMPTION_POLICY_RULE_ENUM | null
}

export const ConsumptionPolicy: React.FC<RuleCardProps> = ({ state }) => {
    const { t } = useTranslation();
    return (
        <RuleCardState 
            state={state ? true : false}
            positiveState={
                <RuleCard 
                    Icon={BiPurchaseTagAlt}
                    rule={t(`filters.rules.consumptionPolicy.${state ? state : 'null'}`)}
                />
            }
            negativeState={
                <RuleCard 
                    Icon={BiPurchaseTagAlt}
                    rule={t(`filters.rules.consumptionPolicy.${state ? state : 'null'}`)}
                />
            }
        />
    )
}