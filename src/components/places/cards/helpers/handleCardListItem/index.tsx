import { useIsMobile } from '../../../../../common/hooks/useIsMobile'
import { PlaceCardListItemMobile } from '../../mobile/cardListItem'
import { PlaceCardListItemDesktop } from '../../desktop/cardListItem'
import { Place } from '../../../../../models/places'


interface PlaceCardListItemProps {
    place: Place
    action: Function
}

export const HandlePlaceCardListItem:React.FC<PlaceCardListItemProps> = ({ place, action }) => {

    const [ isMobile ] = useIsMobile()

    if(isMobile) {
        return <PlaceCardListItemMobile place={place} action={action} />
    }

    return <PlaceCardListItemDesktop place={place} action={action} />
}