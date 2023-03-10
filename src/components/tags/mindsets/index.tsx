import { MINDSETS } from "../../../models/mindsets";
import { StudyMindsetTag } from "./study";
import { UnknownMindsetTag } from "./unknown";
import { WorkMindsetTag } from "./work";

interface HandleMindsetsTagsProps {
    mindset: MINDSETS,
    disabled?: boolean
}

export const HandleMindsetTags:React.FC<HandleMindsetsTagsProps> = ({ mindset, disabled }) => {

    switch (mindset) {
        case MINDSETS.STUDY:
            return ( <StudyMindsetTag disabled={disabled} /> )
        case MINDSETS.WORK:
            return ( <WorkMindsetTag disabled={disabled} /> )
        case MINDSETS.UNKNOWN:
            return ( <UnknownMindsetTag /> )
    }

    return (
        <UnknownMindsetTag />
    )
}