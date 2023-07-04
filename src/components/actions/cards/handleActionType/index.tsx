import { PLACE_SESSION_ACTIONS_ENUM } from "../../../../models/session"
import { PlaceSessionAction } from "../../../../models/session/actions"
import { AccessSessionAction } from "../accessSessionAction";
import { CommunityCardAction } from "../communityAction";

export const HandleActionCardType: React.FC<{ action: PlaceSessionAction }> = ({ action }) => { 
        
    switch(action.type) {
        case PLACE_SESSION_ACTIONS_ENUM.JOIN:
            return <AccessSessionAction action={action} />

        case PLACE_SESSION_ACTIONS_ENUM.LEAVE:
            return <AccessSessionAction action={action} />

        case PLACE_SESSION_ACTIONS_ENUM.UPDATE:
            return <CommunityCardAction action={action} />

    }

    return null
}