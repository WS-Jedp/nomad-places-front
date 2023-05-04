import { BestMindsetForm } from "../bestMindset";
import { CurrentStatusForm } from "../currentStatus";
import { PeopleAmountActionForm } from "../peopleAmount";

type HandleActionFormProps = {
    action: string
} 
export const HandleActionForm: React.FC<HandleActionFormProps> = ({ action }) => {

    switch (action) {
        case 'people':
            return <PeopleAmountActionForm />
        case 'mindset':
            return <BestMindsetForm />
        case 'status':
            return <CurrentStatusForm />

    }

    return null
}