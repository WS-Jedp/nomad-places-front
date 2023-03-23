import { MINDSETS } from "../../../models/mindsets";
import { AllMindsetTag } from "./all";
import { StudyMindsetTag } from "./study";
import { UnknownMindsetTag } from "./unknown";
import { WorkMindsetTag } from "./work";

interface HandleMindsetsTagsProps {
    mindset: MINDSETS,
    disabled?: boolean,
    action?: Function
}

export const HandleMindsetTags:React.FC<HandleMindsetsTagsProps> = ({ mindset, disabled, action = () => {} }) => {

    switch (mindset) {
        case MINDSETS.STUDY:
            return ( <StudyMindsetTag disabled={disabled} onClick={action} /> )
        case MINDSETS.WORK:
            return ( <WorkMindsetTag disabled={disabled} onClick={action} /> )
        case MINDSETS.ALL:
            return ( <AllMindsetTag disabled={disabled} onClick={action} /> )
        case MINDSETS.UNKNOWN:
            return ( <UnknownMindsetTag /> )
    }

    return (
        <UnknownMindsetTag />
    )
}