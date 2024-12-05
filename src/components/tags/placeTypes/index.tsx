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

  function handleTagColor() {
    switch (type) {
      case PLACE_TYPES.COFFEE:
        return "bg-amber-100 border-amber-600";
      case PLACE_TYPES.LIBRARY:
        return "bg-indigo-100 border-indigo-600";
      case PLACE_TYPES.PARK:
        return "bg-green-100 border-green-600";
      case PLACE_TYPES.LOOKOUT:
        return "bg-yellow-100 border-yellow-600";
      case PLACE_TYPES.RESTAURANT:
        return "bg-red-100 border-red-600";
      case PLACE_TYPES.ROOFTOP:
        return "bg-blue-100 border-blue-600";
      case PLACE_TYPES.COWORK_ZONE:
        return "bg-purple-100 border-purple-600";
      default:
        return "bg-white border-gray-600";
    }
  }

  function handleTextColor() {
    switch (type) {
      case PLACE_TYPES.COFFEE:
        return "text-amber-700";
      case PLACE_TYPES.LIBRARY:
        return "text-indigo-700";
      case PLACE_TYPES.PARK:
        return "text-green-700";
      case PLACE_TYPES.LOOKOUT:
        return "text-yellow-700";
      case PLACE_TYPES.RESTAURANT:
        return "text-red-700";
      case PLACE_TYPES.ROOFTOP:
        return "text-blue-700";
      case PLACE_TYPES.COWORK_ZONE:
        return "text-purple-700";
      default:
        return "text-gray-400";
    }
  }

  return (
    <IonChip
      outline
      className={`px-3 py-1 relative border-[1px] border-solid  
            ${
              isSelected
                ? `${handleTagColor()} ${handleTextColor()}`
                : "bg-white text-gray-400 border-gray-600"
            }
        `}
      onClick={handleClick}
    >
      <IonLabel
        className={`${isSelected ? handleTextColor() : "text-gray-400"}`}
      >
        {handleSpotTypeIcon(type, 15)}
      </IonLabel>
      <IonLabel
        className={`ml-1 text-md font-medium capitalize ${
          isSelected ? handleTextColor() : "text-gray-400"
        }`}
      >
        {t(`filters.spotTypes.${type.toLowerCase()}`)}
      </IonLabel>
    </IonChip>
  );
};
