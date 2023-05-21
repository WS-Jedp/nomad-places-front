import { PLACE_SESSION_ACTION_TYPE_ENUM } from "../../../../../models/session/actions";
import { BestMindsetForm } from "../bestMindset";
import { CurrentStatusForm } from "../currentStatus";
import { PeopleAmountActionForm } from "../peopleAmount";
import { AddRecentActivityForm } from "../recentActivity";

type HandleActionFormProps = {
    action: PLACE_SESSION_ACTION_TYPE_ENUM
    onSave: () => void
} 
export const HandleActionForm: React.FC<HandleActionFormProps> = ({ action, onSave}) => {

    switch (action) {
        case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_AMOUNT_OF_PEOPLE:
            return <PeopleAmountActionForm onSave={onSave} />
        case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_MINDSET:
            return <BestMindsetForm onSave={onSave} />
        case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_STATUS:
            return <CurrentStatusForm onSave={onSave} />
        case PLACE_SESSION_ACTION_TYPE_ENUM.PLACE_RECENT_ACTIVITY:
            return <AddRecentActivityForm onSave={onSave} />

    }

    return null
}