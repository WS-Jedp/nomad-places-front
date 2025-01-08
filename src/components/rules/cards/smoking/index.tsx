import { useTranslation } from "react-i18next"
import { MdOutlineSmokeFree, MdOutlineSmokingRooms } from "react-icons/md"
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
                        Icon={MdOutlineSmokingRooms}
                        rule={t('filters.rules.smoking')}
                        description={t('spots.messages.rules.smoking')}
                    />
            }
            negativeState={
                <RuleCard 
                    Icon={MdOutlineSmokeFree}
                    rule={t('filters.rules.noSmoking')}
                    description={t('spots.messages.rules.noSmoking')}
                />
            }
        />
    )
}