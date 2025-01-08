import { MdOutlineCelebration } from "react-icons/md"
import { AmenitiesCard } from "../../card"
import { useTranslation } from "react-i18next"

interface EventSpaceCardProps {
    state?: boolean
}

export const EventSpaceAmenitiesCard:React.FC<EventSpaceCardProps> = ({ state }) => {
    const { t } = useTranslation()
    return (
        <AmenitiesCard 
            Icon={MdOutlineCelebration}
            amenities={t('filters.commodities.eventSpace')}
            state={state || false}
        />
    )
}