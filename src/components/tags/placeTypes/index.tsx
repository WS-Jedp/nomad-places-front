import { useTranslation } from "react-i18next";
import { MINDSETS } from "../../../models/mindsets";
import { PLACE_TYPES } from "../../../models/placeTypes";
import { IonChip, IonLabel } from "@ionic/react";
import { handleSpotTypeIcon } from "../../../common/utils/icons/icons";

interface PlaceTypeTagProps {
  type: PLACE_TYPES;
  isSelected?: boolean;
  action: () => void;
  disabled?: boolean;
}

export const PlaceTypeTag: React.FC<PlaceTypeTagProps> = ({
  action,
  isSelected,
  type,
}) => {
  const { t } = useTranslation();
  const handleClick: React.MouseEventHandler<HTMLIonChipElement> = (ev) => {
    ev.preventDefault();
    action();
  };


  return (
    <IonChip
      outline
      className={`px-3 py-1 relative
            ${
              isSelected
                ? `bg-coffi-blue-50 text-coffi-blue drop-shadow-sm`
                : "bg-gray-100 text-gray-400"
            }
        `}
      onClick={handleClick}
    >
      <IonLabel
        className={`${isSelected ? "text-coffi-purple-400" : "text-gray-400"}`}
      >
        {handleSpotTypeIcon(type, 15)}
      </IonLabel>
      <IonLabel
        className={`ml-1 text-md font-medium capitalize ${
          isSelected ? "text-coffi-purple-400" : "text-gray-400"
        }`}
      >
        {t(`filters.spotTypes.${type.toLowerCase()}`)}
      </IonLabel>
    </IonChip>
  );
};
