import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { colorWandOutline } from "ionicons/icons";
import { handleCardColor } from "../../../common/utils/icons/icons";

interface IdealForTagProps {
  text: string;
  realTime?: boolean;
  small?: boolean
}

export const IdealForTag: React.FC<IdealForTagProps> = ({
  text,
  realTime = false,
  small = false
}) => {
  return (
    <article
      className={`px-3 rounded-xl
        ${
          realTime
            ? "bg-white border-[1px] border-solid border-coffi-purple"
            : "bg-coffi-purple/10 shadow-coffi-purple-400"
        }
          `}
    >
      <span className={`${small ? 'text-xs' : 'text-sm'} font-normal ${realTime ? 'text-coffi-purple' : 'text-coffi-purple'}`}>
        {text}
      </span>
    </article>
  );
};
