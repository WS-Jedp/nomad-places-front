import { useIsMobile } from '../../../../../common/hooks/useIsMobile'
import { PlaceCardListItemMobile } from '../../mobile/cardListItem'
import { PlaceCardListItemDesktop } from '../../desktop/cardListItem'

export const HandlePlaceCardListItem:React.FC = () => {

    const [ isMobile ] = useIsMobile()

    if(isMobile) {
        return <PlaceCardListItemMobile />
    }

    return <PlaceCardListItemDesktop />
}