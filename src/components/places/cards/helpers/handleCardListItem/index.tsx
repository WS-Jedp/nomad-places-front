import { useIsMobile } from '../../../../../common/hooks/useIsMobile'
import { PlaceCardListItemMobile } from '../../mobile/cardListItem'
import { PlaceCardListItemDesktop } from '../../desktop/cardListItem'
import { Place } from '../../../../../models/places'


interface PlaceCardListItemProps {
    place: Place
}

export const HandlePlaceCardListItem:React.FC<PlaceCardListItemProps> = ({ place }) => {

    const [ isMobile ] = useIsMobile()

    if(isMobile) {
        return <PlaceCardListItemMobile place={place} />
    }

    return <PlaceCardListItemDesktop place={place} />
}