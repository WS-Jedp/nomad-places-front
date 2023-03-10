import { PLACE_STATUS } from "../../../models/placeStatus";
import { PlaceClosedStatus } from "./closeStatus";
import { PlaceOpenStatus } from "./openStatus";

interface HandlePlaceStatusProps {
    status: PLACE_STATUS
}

export const HandlePlaceStatus: React.FC<HandlePlaceStatusProps> = ({ status }) => {
    switch (status) {
        case PLACE_STATUS.OPEN:
            return ( <PlaceOpenStatus /> )
        case PLACE_STATUS.CLOSED:
            return ( <PlaceClosedStatus /> )
    }

    return (
        <PlaceClosedStatus />
    )
}