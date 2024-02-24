import { useTranslation } from "react-i18next"
import { FaSmoking, FaSmokingBan } from "react-icons/fa"
import { RuleCard } from "../../card"
import { RuleCardState } from "../../cardState"

interface RuleCardProps {
    state: boolean | null
}

export const SmokingFriendlyRuleCard: React.FC<RuleCardProps> = ({ state }) => {

    const { t } = useTranslation(); 

    return (
        <RuleCardState 
            state={state}
            positiveState={
                <RuleCard 
                        Icon={FaSmoking}
                        rule={t('filters.rules.smoking')}
                        description={t('spots.messages.rules.smoking')}
                    />
            }
            negativeState={
                <RuleCard 
                    Icon={FaSmokingBan}
                    rule={t('filters.rules.noSmoking')}
                    description={t('spots.messages.rules.noSmoking')}
                />
            }
        />
    )
}