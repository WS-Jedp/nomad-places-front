import { AiFillAlert } from "react-icons/ai"
import { FaBan } from "react-icons/fa"
import { useTranslation } from 'react-i18next'
import { RuleCard } from "../../card"
import { RuleCardState } from "../../cardState"

interface RuleCardProps {
    state: boolean | null
}

export const UnderAgeFriendlyRuleCard: React.FC<RuleCardProps> = ({ state }) => {
    const { t } = useTranslation();
    return (
        <RuleCardState 
            state={state}
            positiveState={
                <RuleCard 
                        Icon={AiFillAlert}
                        rule={t('filters.rules.underAge')}
                        description={t('spots.messages.rules.underAge')}
                    />
            }
            negativeState={
                <RuleCard 
                    Icon={FaBan}
                    rule={t('filters.rules.noUnderAge')}
                    description={t('spots.messages.rules.noUnderAge')}
                />
            }
        />
    )
}