import { MdPets } from "react-icons/md"
import { useTranslation } from 'react-i18next'
import { RuleCard } from "../../card"
import { RuleCardState } from "../../cardState"

interface RuleCardProps {
    state: boolean | null
}

export const PetFriendlyRuleCard: React.FC<RuleCardProps> = ({ state }) => {
    const { t } = useTranslation();
    return (
        <RuleCardState 
            state={state}
            positiveState={
                <RuleCard 
                    Icon={MdPets}
                    rule={t('filters.rules.petFriendly')}
                    description={t('spots.messages.rules.petFriendly')}
                />
            }
            negativeState={
                <RuleCard 
                    Icon={MdPets}
                    rule={t('filters.rules.noPetFriendly')}
                    description={t('spots.messages.rules.noPetFriendly')}
                />
            }
        />
    )
}