import { MdOutlineNoiseAware, MdOutlineNoiseControlOff } from "react-icons/md"
import { useTranslation } from 'react-i18next'
import { RuleCard } from "../../card"
import { RuleCardState } from "../../cardState"
import { NOISE_POLICY_RULE_ENUM } from "../../../../models/places"

interface RuleCardProps {
    state: NOISE_POLICY_RULE_ENUM | null
}

export const NoisePolicyRuleCard: React.FC<RuleCardProps> = ({ state }) => {
    const { t } = useTranslation();
    return (
        <RuleCardState 
            state={state ? true : false}
            positiveState={
                <RuleCard 
                    Icon={MdOutlineNoiseAware}
                    rule={t(`filters.rules.noisePolicy.${state ? state : 'null'}`)}
                />
            }
            negativeState={
                <RuleCard 
                    Icon={MdOutlineNoiseControlOff}
                    rule={t(`filters.rules.noisePolicy.${state ? state : 'null'}`)}
                />
            }
        />
    )
}