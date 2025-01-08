import { MdOutlineAlarm } from "react-icons/md"
import { useTranslation } from 'react-i18next'
import { RuleCard } from "../../card"
import { RuleCardState } from "../../cardState"
import { PLACE_TIME_LIMIT_RULE } from "../../../../models/places"

interface RuleCardProps {
    state: PLACE_TIME_LIMIT_RULE | null
}

export const TimeLimitRule: React.FC<RuleCardProps> = ({ state }) => {
    const { t } = useTranslation();
    return (
        <RuleCardState 
            state={state ? true : false}
            positiveState={
                <RuleCard 
                    Icon={MdOutlineAlarm}
                    rule={t(`filters.rules.timeLimit.${state ? state : 'null'}`)}
                />
            }
            negativeState={
                <RuleCard 
                    Icon={MdOutlineAlarm}
                    rule={t(`filters.rules.timeLimit.${state ? state : 'null'}`)}
                />
            }
        />
    )
}