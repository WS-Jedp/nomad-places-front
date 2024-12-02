import { MINDSETS } from "../../../models/mindsets";
import { AllMindsetTag } from "./all";
import { RomanticMindsetTag } from "./romantic";
import { StudyMindsetTag } from "./study";
import { UnknownMindsetTag } from "./unknown";
import { VibeMindsetTag } from "./vibe";
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
        case MINDSETS.VIBE:
            return ( <VibeMindsetTag disabled={disabled} onClick={action} /> )
        case MINDSETS.ROMANTIC:
            return ( <RomanticMindsetTag disabled={disabled} onClick={action} /> )
        case MINDSETS.ALL:
            return ( <AllMindsetTag onClick={action} /> )
        case MINDSETS.UNKNOWN:
            return ( <UnknownMindsetTag /> )
    }

    return (
        <UnknownMindsetTag />
    )
}